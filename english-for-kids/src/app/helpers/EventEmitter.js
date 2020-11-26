// const { extends } = require('../../.eslintrc');

// import { CARD_CLICK } from './constants';
import * as events from './constants';

events.CARD_CLICK
class EventEmitter {
  constructor() {
    this._events = {};
  }

  on(evt, listener) {
    (this._events[evt] || (this._events[evt] = [])).push(listener);
    return this;
  }

  emit(evt, arg) {
    (this._events[evt] || []).forEach((lsn) => lsn(arg));
  }
}

const ev = new EventEmitter();

ev.on(CARD_CLICK, () => );
ev.on(CARD_CLICK, () => console.log('sdfsd222'));
ev.emit('asd');

class View extends EventEmitter {}

class Controller extends EventEmitter {}
