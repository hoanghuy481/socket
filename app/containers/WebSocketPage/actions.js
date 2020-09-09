/*
 *
 * WebSocketPage actions
 *
 */

import { LOGIN, IS_TYPING, STOP_TYPING } from './constants';

export function actLogin(username) {
  return {
    type: LOGIN,
    username,
  };
}

export function actIsTyping(status) {
  return {
    type: IS_TYPING,
    status,
  };
}
export function actStopTyping(status) {
  return {
    type: STOP_TYPING,
    status,
  };
}
