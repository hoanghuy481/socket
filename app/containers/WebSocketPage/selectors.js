import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the webSocketPage state domain
 */

const selectWebSocketPageDomain = state => state.webSocketPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by WebSocketPage
 */

const makeSelectUser = () =>
  createSelector(
    selectWebSocketPageDomain,
    substate => substate.user,
  );

const makeSelectUsersIsTyping = () =>
  createSelector(
    selectWebSocketPageDomain,
    substate => substate.usersIsTyping,
  );

export { makeSelectUser, makeSelectUsersIsTyping };
