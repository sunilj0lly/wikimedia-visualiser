import _ from 'lodash';
import * as Actions from './Actions';

class Store {

  constructor(Middleware) {
    //TODO: Use array of middlewares
    this.middleware = new Middleware(this.action.bind(this));
    this.data = {
      isStreaming: false,
    };
  }

  connect(callback) {
    //TODO: Use array of callbacks
    this.callback = callback;
    this.callback(this._handleAction());
  }

  action(type, payload) {
    this.middleware.action(type, payload);
    this.callback(this._handleAction(type, payload));
  }

  _handleAction(type, payload) {
    this.data = _.cloneDeep(this.data);

    switch (type) {
      case Actions.START_STREAM:
        this.data.isStreaming = true;
        return this.data;

      case Actions.STOP_STREAM:
        this.data.isStreaming = false;
        return this.data;

      case Actions.NEW_WIKIMEDIA_EVENT:
        if (!this.data.events) {
          this.data.events = [];
        }
        this.data.events.push({
          bot: payload.bot,
          user: payload.user,
          uri: payload.meta.uri,
        });
        return this.data;

      default:
        return this.data;
    }
  }

}

export default Store;
