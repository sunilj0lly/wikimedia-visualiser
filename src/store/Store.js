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

      case Actions.NEW_WIKIMEDIA_EVENT: // eslint-disable-line no-case-declarations
        this._handleNewWikimediaEvent(payload);
        return this.data;

      default:
        return this.data;
    }
  }

  _handleNewWikimediaEvent(payload) {
    if (!this.data.users) {
      this.data.users = [];
    }
    if (!this.data.uris) {
      this.data.uris = [];
    }
    let wikiUser = _.find(this.data.users, user => user.name === payload.user);
    if (!wikiUser) {
      wikiUser = {
        name: payload.user,
        numberOfContributions: 0,
      };
      this.data.users.push(wikiUser);
    }
    wikiUser.numberOfContributions += 1;
    const uri = payload.meta.uri;
    this.data.uris.push({
      uri,
      uriShort: uri.slice(uri.lastIndexOf('/') + 1),
      user: payload.user,
    });
  }

}

export default Store;
