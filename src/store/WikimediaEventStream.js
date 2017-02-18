import * as Actions from './Actions';

const WIKIMEDIA_STREAM_URL = 'https://stream.wikimedia.org/v2/stream/recentchange';

class WikimediaEventStream {

  constructor(callback) {
    this.callback = callback;
  }

  action(type) {
    if (type === Actions.START_STREAM) {
      this._listenForEvents();
    } else if (type === Actions.STOP_STREAM) {
      this._stopListeningForEvents();
    }
  }

  _listenForEvents() {
    if (this.events) {
      throw new Error('Already listening for events');
    }
    this.eventSource = new EventSource(WIKIMEDIA_STREAM_URL);
    this.eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data);
      this.callback(Actions.NEW_WIKIMEDIA_EVENT, data);
    };
  }

  _stopListeningForEvents() {
    this.eventSource.close();
  }

}

export default WikimediaEventStream;
