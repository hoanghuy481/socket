// import { take, call, put, select } from 'redux-saga/effects';

import { call, takeLatest } from 'redux-saga/effects';

// TYPE ACTIONS
import { USER_TYPING } from './constants';
import request from '../../utils/request';

// Get Detail App
export function* userTyping(action) {
  try {
    const body = action.user;
    const requestUrl = 'http://10.0.2.237:8080/api/usertyping';
    const repos = yield call(request, requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });
    console.log(repos);
  } catch (err) {
    console.log(err);
  }
}
export default function* webSocketPageSaga() {
  yield takeLatest(USER_TYPING, userTyping);
}
