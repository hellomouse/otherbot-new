/// <reference types="node" />
import { Transform, TransformCallback } from 'stream';
/** Class representing an IRC message */
declare class IRCMessage {
    tags: {
        [key: string]: string;
    };
    raw: string;
    prefix: string;
    numeric: number;
    command: string;
    args: string[];
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
    constructor(message: string);
}
/** Stream-based IRC message parser */
declare class Parser extends Transform {
    static numerics: {
        [key: string]: string;
        "001": string;
        "002": string;
        "003": string;
        "004": string;
        "005": string;
        "200": string;
        "201": string;
        "202": string;
        "203": string;
        "204": string;
        "205": string;
        "206": string; /**
         * Constructor for the class
         * @param {String} message Raw IRC message to parse
         * @property {String} raw Raw IRC message
         * @property {String} prefix
         * @property {Object} tags
         * @property {Number|null} numeric
         * @property {String|null} command
         * @property {String[]} args
         */
        "207": string;
        "208": string;
        "209": string;
        "210": string;
        "211": string;
        "212": string;
        "219": string;
        "221": string;
        "234": string;
        "235": string;
        "242": string;
        "243": string;
        "251": string;
        "252": string;
        "253": string;
        "254": string;
        "255": string;
        "256": string;
        "257": string;
        "258": string;
        "259": string;
        "261": string;
        "262": string;
        "263": string;
        "301": string;
        "302": string;
        "303": string;
        "305": string;
        "306": string;
        "311": string;
        "312": string;
        "313": string;
        "314": string;
        "315": string;
        "317": string;
        "318": string;
        "319": string;
        "321": string;
        "322": string;
        "323": string;
        "324": string;
        "325": string;
        "331": string;
        "332": string;
        "341": string;
        "342": string;
        "346": string;
        "347": string;
        "348": string;
        "349": string;
        "351": string;
        "352": string;
        "353": string;
        "364": string;
        "365": string;
        "366": string;
        "367": string;
        "368": string;
        "369": string;
        "371": string;
        "372": string;
        "374": string;
        "375": string;
        "376": string;
        "381": string;
        "382": string;
        "383": string;
        "391": string;
        "392": string;
        "393": string;
        "394": string;
        "395": string;
        "401": string;
        "402": string;
        "403": string;
        "404": string;
        "405": string;
        "406": string;
        "407": string;
        "408": string;
        "409": string;
        "410": string;
        "411": string;
        "412": string;
        "413": string;
        "414": string;
        "415": string;
        "421": string;
        "422": string;
        "423": string;
        "424": string;
        "431": string;
        "432": string;
        "433": string;
        "436": string;
        /**
         * Constructs a new Parser
         * @param {Object} opts Options for the parser
         * @param {String} opts.encoding The encoding for data coming in
         */
        "437": string;
        "441": string;
        "442": string;
        "443": string;
        "444": string;
        "445": string;
        "446": string;
        "451": string;
        "461": string;
        "462": string;
        "463": string;
        "464": string;
        "465": string;
        "467": string;
        "471": string;
        "472": string;
        "473": string;
        "474": string;
        "475": string;
        "476": string;
        "477": string;
        "478": string;
        "481": string;
        "482": string;
        "483": string;
        "484": string;
        "485": string;
        "491": string;
        "501": string;
        "502": string;
        "670": string;
        "691": string;
        "730": string;
        "731": string;
        "732": string;
        "733": string;
        "734": string;
        "760": string;
        "761": string;
        "762": string;
        "764": string;
        "765": string;
        "766": string;
        "767": string;
        "768": string;
        "769": string;
        "900": string;
        "901": string;
        "902": string;
        "903": string;
        "904": string;
        "905": string;
        "906": string;
        "907": string;
        "908": string;
    };
    opts: {
        encoding?: string;
    };
    encoding: string;
    _partialData: string | string[];
    /**
     * Constructs a new Parser
     * @param {Object} opts Options for the parser
     * @param {String} opts.encoding The encoding for data coming in
     */
    constructor(opts?: {
        encoding?: string;
    });
    /**
     * Push data to the stream to be parsed
     * @param {(Buffer|String)} chunk The data to process
     * @param {String} encoding The encoding of the string
     * @param {Function} callback Called when the chunk is processed
     */
    _transform(chunk: any, encoding: string, callback: TransformCallback): void;
}
export default Parser;
export { IRCMessage };
