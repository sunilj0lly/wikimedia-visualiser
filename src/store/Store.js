import * as Actions from './Actions';

class Store {

  constructor(Middleware) {
    //TODO: Use array of middlewares
    this.middleware = new Middleware(this.action.bind(this));
    this.data = {};
  }

  connect(callback) {
    //TODO: Use array of callbacks
    this.callback = callback;
  }

  action(type, payload) {
    this.middleware.action(type, payload);
    this.callback(this._handleAction(type, payload));
  }

  _handleAction(type, payload) {
    if (type === Actions.NEW_WIKIMEDIA_EVENT) {
      this.data = {
        events: payload,
      };
    }
    return this.data;
  }

}

export default Store;
