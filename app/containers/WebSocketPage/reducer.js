/*
 *
 * WebSocketPage reducer
 *
 */
import produce from 'immer';
import { LOGIN, IS_TYPING, STOP_TYPING } from './constants';

export const initialState = {
  user: {
    username: '',
    status: 0,
    isLogin: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const webSocketPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN:
        draft.user.username = action.username;
        draft.user.isLogin = true;
        break;
      case IS_TYPING:
        break;
      case STOP_TYPING:
        break;
    }
  });

export default webSocketPageReducer;
