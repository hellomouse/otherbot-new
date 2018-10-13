"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const numerics_1 = __importDefault(require("./numerics"));
/** Class representing an IRC message */
class IRCMessage {
    /**
     * Constructor for the class
     * @param {String} message Raw IRC message to parse
     * @property {String} raw Raw IRC message
     * @property {String} prefix
     * @property {Object} tags
     * @property {Number|null} numeric
     * @property {String|null} command
     * @property {String[]} args
     */
    constructor(message) {
        this.raw = message;
        const messageSplit = message.split(' ');
        let rawTags = null;
        this.prefix = '';
        let commandIndex = 0;
        this.tags = {};
        this.numeric = 0;
        this.command = '';
        this.args = [];
        for (let i = 0; i < messageSplit.length; i++) {
            const part = messageSplit[i];
            if (part[0] === '@')
                rawTags = part;
            else if (part[0] === ':')
                this.prefix = part.slice(1);
            else { // end of header
                this.command = part;
                commandIndex = i;
                break;
            }
        }
        // TODO: don't split on backslashes
        if (rawTags) {
            const t = rawTags.split(';');
            for (let tag of t) {
                let [key, value] = tag.split('=');
                this.tags[key] = value;
            }
        }
        this.command = messageSplit[commandIndex];
        const maybeNumeric = +this.command;
        if (!Number.isNaN(maybeNumeric)) {
            this.command = numerics_1.default[this.command];
            this.numeric = maybeNumeric;
        }
        let commandArgs = messageSplit.slice(commandIndex);
        for (let i = 1; i < commandArgs.length; i++) {
            let arg = commandArgs[i];
            if (arg[0] === ':') {
                this.args.push(commandArgs.slice(i).join(' ').slice(1));
                break;
            }
            else
                this.args.push(arg);
        }
    }
}
exports.IRCMessage = IRCMessage;
/** Stream-based IRC message parser */
class Parser extends stream_1.Transform {
    /**
     * Constructs a new Parser
     * @param {Object} opts Options for the parser
     * @param {String} opts.encoding The encoding for data coming in
     */
    constructor(opts) {
        super({ readableObjectMode: true });
        if (!opts)
            opts = {};
        this.opts = opts;
        this.encoding = opts.encoding || 'utf-8';
        this._partialData = '';
    }
    /**
     * Push data to the stream to be parsed
     * @param {(Buffer|String)} chunk The data to process
     * @param {String} encoding The encoding of the string
     * @param {Function} callback Called when the chunk is processed
     */
    _transform(chunk, encoding, callback) {
        let data = this._partialData + chunk.toString(this.encoding);
        let messages = data.split(/[\r\n]+/g);
        this._partialData = messages.splice(-1, 1); // store partial line for later
        messages = messages.filter((m) => m !== '');
        for (let message of messages)
            this.push(new IRCMessage(message));
        callback();
    }
}
Parser.numerics = numerics_1.default;
exports.default = Parser;
