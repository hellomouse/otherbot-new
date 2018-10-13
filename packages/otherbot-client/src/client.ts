import EventEmitter from 'events';
import net from 'net';
import tls from 'tls';
import Parser from 'irc-stream-parser';
import { IRCMessage } from 'irc-stream-parser/lib/parser';
import { stripFormatting } from './utils';

/** Represents an IRC client */
class Client extends EventEmitter {
  public config: {
    [key: string]: any
  };
  public socket: net.Socket | tls.TLSSocket;
  public parser!: Parser;

  /**
  * @param {Object<string, any>} config The config object
  */
  constructor(config: { [s: string]: any; }) {
    super();
    this.config = config;
    let opts: net.SocketConnectOpts | tls.ConnectionOptions = {
      port: this.config.irc.port,
      host: this.config.irc.host,
      localAddress: this.config.bindhost
    };
    if (this.config.ssl) {
      if (this.config.sasl && this.config.sasl.type === 'certfp') { // type could be a Symbol
        Object.assign<typeof opts, tls.ConnectionOptions>(opts, {
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
  public connect() {
    this.parser = new Parser();
    this.socket.pipe(this.parser).once('connect', () => {
      log.debug('Connected');

      // TODO: modularize
      this.socket.write('CAP LS 302');
      this.socket.write(`NICK ${this.config.nickname}`);
      this.socket.write(`USER ${this.config.ident} * * :${this.config.realname}`);
    }).on('data', (event: IRCMessage) => {
      log.debug('[RECV] %s', stripFormatting(event.raw));

      try {
        this.emit(event.command.toString(), this, event);
      } catch (e) {
        this.emit('error', e);
      }
    }).on('error', (err: any) => {
      this.emit('error', err);
      this.socket.end();
    });
  }
}

export default Client;
