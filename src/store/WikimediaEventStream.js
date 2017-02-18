import * as Actions from './Actions';

class WikimediaEventStream {

  constructor(callback) {
    this.callback = callback;
    this.worker = null;
  }

  action(type) {
    if (type === Actions.START_STREAM) {
      this._listenForEvents();
    } else if (type === Actions.STOP_STREAM) {
      this._stopListeningForEvents();
    }
  }

  _listenForEvents() {
    if (this.worker) {
      throw new Error('Already listening for events');
    }
    this.worker = new Worker('WikimediaWorker.js');
    this.worker.onmessage = (event) => {
      this.callback(Actions.NEW_WIKIMEDIA_EVENT, event.data);
    };
  }

  _stopListeningForEvents() {
    this.worker.terminate();
    this.worker = null;
  }

}

export default WikimediaEventStream;
