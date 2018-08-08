import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import history from 'browserHistory';
import * as CONSTANTS from './constants';
import { loginSuccess, loginError, signupSuccess, signupError, userListSuccess, userListError } from './actions';

export function* loginRequest(action) {
  try {
    const data = yield call(request, 'login', 'POST', {
      email: action.email,
      password: action.password,
    });
    yield put(loginSuccess(data));
  } catch (err) {
    yield put(loginError(err));
  }
}

export function* signupRequest(action) {
  try {
    const data = yield call(request, 'signup', 'POST', action.data);
    yield put(signupSuccess(data));
    notify.success('Your account has been created');
    history.push('/login');
  } catch (err) {
    yield put(signupError(err));
  }
}

export function* userListRequest(action) {
  try {
    const data = yield call(request, 'most-liked', 'GET', null, false, true);
    yield put(userListSuccess(data));
  } catch (err) {
    yield put(userListError(err));
  }
}

export default function* authSaga() {
  yield takeLatest(CONSTANTS.LOGIN_REQUEST, loginRequest);
  yield takeLatest(CONSTANTS.SIGNUP_REQUEST, signupRequest);
  yield takeLatest(CONSTANTS.MOST_LIKED_USER_REQUEST, userListRequest);
}
