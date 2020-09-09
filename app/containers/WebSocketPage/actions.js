/*
 *
 * WebSocketPage actions
 *
 */

import {
  LOGIN,
  CHECK_IS_TYPING,
  CHECK_STOP_TYPING,
  USER_TYPING,
} from './constants';

export function actLogin(username) {
  return {
    type: LOGIN,
    username,
  };
}
export function actIsTyping() {
  return {
    type: CHECK_IS_TYPING,
  };
}
export function actStopTyping() {
  return {
    type: CHECK_STOP_TYPING,
  };
}

export function actUserTyping(user) {
  return {
    type: USER_TYPING,
    user,
  };
}
