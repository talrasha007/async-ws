const { EventEmitter } = require('events');

const WebSocket = global.WebSocket || require('ws');
const addListenerFn = global.WebSocket ? 'addEventListener' : 'addListener';
const removeListenerFn = global.WebSocket ? 'removeEventListener' : 'removeListener';

module.exports = class extends EventEmitter {
  constructor(url, opt  = {}) {
    super();

    const onopen = () => {
      this._ready = true;
      this.emit('open');
    };

    const onclose = () => {
      this._ready = false;
      reconnect();
    };

    const onerror = (error) => {
      this._ready = false;
      reconnect();
      this.emit('error', error);
    };

    const onmessage = (msg) => {
      this.emit('message', msg);
    };

    const reconnect = () => {
      if (this._ws) {
        this._ws[removeListenerFn]('open', onopen);
        this._ws[removeListenerFn]('close', onclose);
        this._ws[removeListenerFn]('error', onerror);
        this._ws[removeListenerFn]('message', onmessage);
      }

      this._ws = new WebSocket(url, opt.options);
      this._ws[addListenerFn]('open', onopen);
      this._ws[addListenerFn]('close', onclose);
      this._ws[addListenerFn]('error', onerror);
      this._ws[addListenerFn]('message', onmessage);

      if (opt.binaryType) {
        this._ws.binaryType = opt.binaryType;
      }
    };

    reconnect();
  }

  async send(data) {
    await this.ready();
    this._ws.send(data);
  }

  async reconnect() {
    if (this._ready) {
      this._ready = false;
      this._ws.close();
    }
  }

  async ready() {
    if (!this._ready) {
      await new Promise(resolve => this.once('open', resolve));
    }
  }
};