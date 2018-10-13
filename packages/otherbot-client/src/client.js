const EventEmitter = require('events');
const net = require('net');
const tls = require('tls');
const Parser = require('irc-stream-parser');
const { stripFormatting } = require('./utils');

/** Represents an IRC client */
class Client extends EventEmitter {
  /**
   * @param {Object<string, any>} config The config object
  */
  constructor(config) {
    super();
    this.config = config;
    let opts = {
      port: this.config.irc.port,
      host: this.config.irc.host,
      localaddress: this.config.bindhost
    };
    if (this.config.ssl) {
      if (this.config.sasl && this.config.sasl.type === 'certfp') { // type could be a Symbol
        Object.assign(opts, {
          cert: this.config.sasl.cert,
          key: this.config.sasl.key,
          passphrase: this.config.sasl.password
        });
      }
      this.socket = tls.connect(opts);
    } else {
      this.socket = net.connect(opts);
    }
  }

  /** */
  connect() {
    this.parser = new Parser();
    this.socket.pipe(this.parser).once('connect', () => {
      log.info('Connected');

      // TODO: modularize
      this.send('CAP LS 302');
      this.send(`NICK ${this.config.nickname}`);
      this.send(`USER ${this.config.ident} * * :${this.config.realname}`);
    }).on('data', event => {
      log.debug('[RECV] %s', stripFormatting(event.raw));

      try {
        this.emit(event.command, this, event);
        this.emit('all', this, event);
      } catch (e) {
        log.error(e.stack);
      }
    }).on('error', err => {
      log.error(err.stack);
      this.socket.close();
    });
  }
}

module.exports = Client;
