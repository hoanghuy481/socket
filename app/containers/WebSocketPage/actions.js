/*
 *
 * WebSocketPage actions
 *
 */

import { LOGIN, USER_TYPING, GET_USERS_IS_TYPING } from './constants';

export function actLogin(username) {
  return {
    type: LOGIN,
    username,
  };
}
export function actUserTyping(status) {
  return {
    type: USER_TYPING,
    status,
  };
}

export function actGetUserIsTyping(users) {
  return {
    type: GET_USERS_IS_TYPING,
    users,
  };
}
