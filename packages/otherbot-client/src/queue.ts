import EventEmitter from 'events';
import LinkedList from './linkedlist';

interface MessageQueueOpts {
  queueNum: number;
  delay: number;
  processFn: () => void; // this might possibly be changed to an event
}

// TODO: per-channel queues
/* main queue fetches items from per-channel queues
 * classes: Queue, FeederQueue
 * Queue#opts.queues takes 2d array of FeederQueues in order of priority
 * writing to queues done by functions
 * only global Queue runs timers, FeederQueues wrap around QueueItems
 * example:
 * QueueItem {
 *   timeout: [Number representing time],
 *   data: [String for data]
 * }
 */
/** Represents a message queue for the client */
class MessageQueue extends EventEmitter {
  opts: MessageQueueOpts;
  delay: number;
  processFn: () => void;
  queues: Array<LinkedList>;
  _lastSend: number;
  _burstCount: number;
  _currentTimer: null;
  queueNum: number;
  /**
   * Constructs a new message queue
   * Priority 0 is highest priority
   * @param {object} opts Options for the message queue
   * @param {number} opts.queueNum Number of queue priorities to create
   * @param {number} opts.delay Delay between sending messages in the queue
   * @param {Function} opts.processFn Function called when output is available
   */
  constructor(opts: MessageQueueOpts) {
    super();
    this.opts = opts;
    this.delay = opts.delay;
    this.processFn = opts.processFn;
    this.queues = [];
    for (let i = 0; i < opts.queueNum; i++) this.queues.push(new LinkedList());
    /** Time of last sent message */
    this._lastSend = 0;
    /** How many messages have been sent as part of the "burst" */
    this._burstCount = 0;
    this._currentTimer = null;
    this.queueNum = 0;
  }
  /**
   * Add an object to the queue
   * @param {any} data Object to push to the queue
   * @param {number} [priority=0] Queue priority to push data in
   * @return {boolean} Promise resolving to true when the data is sent or false
   *                   if the queue was cleared before the data was sent
   */
  push(data: any, priority: number = 0): Promise<boolean> {
    return new Promise(resolve => {
      this.queues[priority].unshift([data, resolve]);
      this._timerStart();
    });
  }
  /**
   * Get the next item from the queue, by priority
   * @return {any} The item taken from the queue
   */
  _next(): any {
    // find next piece of data in queue
    for (let i = 0; i < this.queueNum; i++) {
      if (this.queues[i].length > 0) return this.queues[i].pop();
    }
  }
  /** Process new items in queue */
  _timerStart() {
    // if a timer is already running, return
    if (this._currentTimer) return;
    this._timerNext();
  }
  /** Called by timer to process next item in queue */
  _timerNext() {

  }
  /** Called by timer after there is no more data */
  _timerFinished() {

  }
}

export default MessageQueue;
