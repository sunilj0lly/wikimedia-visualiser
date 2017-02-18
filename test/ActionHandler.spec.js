import actionHandler from './../src/store/ActionHandler';
import * as Actions from './../src/store/Actions';

describe('The store', () => {
  beforeEach(angular.mock.module('app'));

  it('sets a flag when streaming has started', () => {
    const result = actionHandler({}, Actions.START_STREAM);
    expect(result.isStreaming).toBe(true);
  });

  it('sets a flag when streaming has stopped', () => {
    const result = actionHandler({}, Actions.STOP_STREAM);
    expect(result.isStreaming).toBe(false);
  });

  it('creates a new user when receiving a ' +
      'wikimedia event from a new user', () => {
    const result = actionHandler({}, Actions.NEW_WIKIMEDIA_EVENT, {
      user: 'newuser',
      meta: {
        uri: 'myuri.com',
      },
    });
    expect(result.users[0]).toEqual({
      name: 'newuser',
      numberOfContributions: 1,
    });
  });

  it('updates an existing user when receiving a ' +
      'wikimedia event for that user again', () => {
    const data = {
      users: [
        {
          name: 'newuser',
          numberOfContributions: 1,
        },
      ],
    };

    const result = actionHandler(data, Actions.NEW_WIKIMEDIA_EVENT, {
      user: 'newuser',
      meta: {
        uri: 'anotheuri.com',
      },
    });
    expect(result.users[0]).toEqual({
      name: 'newuser',
      numberOfContributions: 2,
    });
  });

  // kludge: Should have tests for:
  // - uri shortening
  // - adding another user after one already exists
  // - storing uris
});
