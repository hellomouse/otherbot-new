const EventEmitter = require('events');
const LinkedList = require('linkedlist');

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
  /**
   * Constructs a new message queue
   * Priority 0 is highest priority
   * @param {Object} opts Options for the message queue
   * @param {Number} opts.queueNum Number of queue priorities to create
   * @param {Number} opts.delay Delay between sending messages in the queue
   * @param {Function} opts.processFn Function called when output is available
   */
  constructor(opts) {
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
  }
  /**
   * Add an object to the queue
   * @param {any} data Object to push to the queue
   * @param {Number} priority Queue priority to push data in
   * @return {Boolean} Promise resolving to true when the data is sent or false
   *                   if the queue was cleared before the data was sent
   */
  push(data, priority = 0) {
    return new Promise(resolve => {
      this.queues[priority].unshift([data, resolve]);
      this._timerStart();
    });
  }
  /**
   * Get the next item from the queue, by priority
   * @return {any} The item taken from the queue
   */
  _next() {
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

module.exports = MessageQueue;
