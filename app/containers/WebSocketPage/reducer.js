/*
 *
 * WebSocketPage reducer
 *
 */
import produce from 'immer';
import { LOGIN, CHECK_IS_TYPING, CHECK_STOP_TYPING } from './constants';

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
      case CHECK_IS_TYPING:
        draft.user.status = 1;
        break;
      case CHECK_STOP_TYPING:
        draft.user.status = 0;
        break;
    }
  });

export default webSocketPageReducer;
