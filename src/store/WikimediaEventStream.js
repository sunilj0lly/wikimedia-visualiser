import * as Actions from './Actions';

class WikimediaEventStream {

  constructor(callback) {
    this.callback = callback;
  }

  action(type) {
    if (type === Actions.START_STREAM) {
      window.setTimeout(() => {
        this.callback(Actions.NEW_WIKIMEDIA_EVENT, {
          hello: 'world',
        });
      }, 3000);
    }
  }

}

export default WikimediaEventStream;
