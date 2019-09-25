/**
 * index.js - Logger class for Elyza
 * Colorful logging util designed for IRC
 * By Bowserinator
 *
 * (c) Hellomouse 2019
 */

// Terminal color printing
require('colors');

/** A logger class */
class Logger {
  /**
   * Construct a new Logger
   * @param {string} [level='all'] Log level, 'error', 'warn', 'info', 'none'
   */
  constructor(level = 'all') {
    if (!['error', 'warn', 'info', 'none', 'all'].includes(level)) {
      throw new TypeError('Invalid log level, log level must be in (all|error|warn|info|none)');
    }
    this.logLevel = level;
  }

  /**
   * Display an error message
   * @param {string} text Text to display
   */
  error(text) {
    if (this.logLevel === 'none') return;
    console.log(Logger._formatTimeStamp(text).bold.red);
  }

  /**
   * Display a warning message
   * @param {string} text Text to display
   */
  warn(text) {
    if (this.logLevel === 'none' || this.logLevel === 'error') return;
    console.log(Logger._formatTimeStamp(text).yellow);
  }

  /**
   * Display a normal message (No formatting)
   * @param {string} text Text to display
   */
  log(text) {
    if (this.logLevel === 'none') return;
    console.log(Logger._formatTimeStamp(text));
  }

  /**
   * Display a normal message (No formatting, alias)
   * @param {string} text Text to display
   */
  debug(text) {
    this.log(text);
  }

  /**
   * Display an info message (alias)
   * @param {string} text Text to display
   */
  info(text) {
    if (this.logLevel !== 'info' && this.logLevel !== 'all') return;
    console.log(Logger._formatTimeStamp(text).blue);
  }

  /**
   * Adds a time stamp to the text
   * @param {string} text Text to log
   * @return {string}     Formatted text
   */
  static _formatTimeStamp(text) {
    return `[${new Date().toLocaleTimeString()}]: ${text}`;
  }
}

module.exports = Logger;
