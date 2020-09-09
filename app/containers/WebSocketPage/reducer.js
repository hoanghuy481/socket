/*
 *
 * WebSocketPage reducer
 *
 */
import produce from 'immer';
import {
  LOGIN,
  CHECK_IS_TYPING,
  CHECK_STOP_TYPING,
  GET_USER_IS_TYPING,
} from './constants';

export const initialState = {
  user: {
    username: '',
    status: null,
    isLogin: false,
  },
  usersIsTyping: [],
};

/* eslint-disable default-case, no-param-reassign */
const webSocketPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN:
        draft.user.username = action.username;
        draft.user.isLogin = true;
        break;
      case CHECK_IS_TYPING:
        draft.user.status = 1;
        break;
      case CHECK_STOP_TYPING:
        draft.user.status = 0;
        break;
      case GET_USER_IS_TYPING:
        if (
          action.users.status === 1 &&
          draft.user.username !== action.users.name
        ) {
          draft.usersIsTyping.push(action.users.name);
        } else if (
          action.users.status === 0 &&
          draft.user.username !== action.users.name
        ) {
          draft.usersIsTyping.splice(
            draft.usersIsTyping.indexOf(action.users.name),
            1,
          );
        }
        break;
    }
  });

export default webSocketPageReducer;
