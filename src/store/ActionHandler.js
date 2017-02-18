import _ from 'lodash';
import * as Actions from './Actions';

function _handleNewWikimediaEvent(data, payload) {
  if (!data.users) {
    data.users = [];
  }
  if (!data.uris) {
    data.uris = [];
  }
  let wikiUser = _.find(data.users, user => user.name === payload.user);
  if (!wikiUser) {
    wikiUser = {
      name: payload.user,
      numberOfContributions: 0,
    };
    data.users.push(wikiUser);
  }
  wikiUser.numberOfContributions += 1;
  const uri = payload.meta.uri;
  data.uris.push({
    uri,
    uriShort: uri.slice(uri.lastIndexOf('/') + 1),
    user: payload.user,
  });
  return data;
}

export default function handleAction(data, type, payload) {
  switch (type) {
    case Actions.START_STREAM:
      data.isStreaming = true;
      return data;

    case Actions.STOP_STREAM:
      data.isStreaming = false;
      return data;

    case Actions.NEW_WIKIMEDIA_EVENT: // eslint-disable-line no-case-declarations
      return _handleNewWikimediaEvent(data, payload);

    default:
      return data;
  }
}
