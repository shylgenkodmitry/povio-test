import { fork, call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';

import * as CONSTANTS from './constants';
import {
  userListSuccess,
  userListError,
  userLoadSuccess,
  userLoadError,
  userSaveSuccess,
  userSaveError,
  userDeleteSuccess,
  userDeleteError,
  getMeSuccess,
  getMeError,
  updateUserPasswordSuccess,
  updateUserPasswordError,
  userSaveLikeSuccess,
  userSaveLikeError,
  userSaveUnLikeSuccess,
  userSaveUnLikeError,
} from './actions';
import { selectUser } from './selectors';

export function* userListRequest() {
  try {
    const data = yield call(request, 'users/most-liked', 'GET', null, true);
    yield put(userListSuccess(data));
  } catch (err) {
    yield put(userListError(err));
  }
}

export function* userLoadRequest(action) {
  try {
    const data = yield call(request, `users/${action.id}`, 'GET', null, true);
    yield put(userLoadSuccess(data));
  } catch (err) {
    yield put(userLoadError(err));
  }
}

export function* userDeleteRequest(action) {
  try {
    const data = yield call(request, `users/${action.id}`, 'DELETE', null, true);
    yield put(userDeleteSuccess(action.id, data));
  } catch (err) {
    yield put(userDeleteError(err));
  }
}

export function* userSaveRequest() {
  try {
    const state = yield select();
    const user = selectUser(state);
    const requestData = user.get('user').get('data').toJS();
    const id = user.get('user').get('id');
    let responseData = null;

    if (id === 'new') {
      responseData = yield call(request, 'users', 'POST', { ...requestData }, true);
    } else {
      responseData = yield call(request, `users/${id}`, 'PUT', { ...requestData }, true);
    }

    yield put(userSaveSuccess(responseData));
    notify.success('User saved');
  } catch (err) {
    yield put(userSaveError(err));
  }
}

export function* getMeRequest() {
  try {
    const currentUserInfo = yield call(request, 'profile/me', 'GET', null, true);
    yield put(getMeSuccess(currentUserInfo));
  } catch (err) {
    yield put(getMeError(err));
  }
}

export function* updateMyPassword(data) {
  const requestData = {
    password: data.newPassword,
    userName: data.userName,
    email: data.userEmail
  };
  try {
    const response = yield call(request, 'profile/me/update-password', 'POST', requestData, true);
    yield put(updateUserPasswordSuccess(response));
  } catch (err) {
    yield put(updateUserPasswordError(err));
  }
}

export function* userSaveLikeRequest(data) {
  try {
    const response = yield call(request, `users/${data.likeId}/like`, 'PUT', null, true);
    yield put(userSaveLikeSuccess(response));
  } catch (err) {
    yield put(userSaveLikeError(err));
  }
}

export function* userSaveUnLikeRequest(data) {
  try {
    const response = yield call(request, `users/${data.unLikeId}/unlike`, 'PUT', null, true);
    yield put(userSaveUnLikeSuccess(response));
  } catch (err) {
    yield put(userSaveUnLikeError(err));
  }
}

export default [
  fork(takeLatest, CONSTANTS.USER_LIST_REQUEST, userListRequest),
  fork(takeLatest, CONSTANTS.USER_LOAD_REQUEST, userLoadRequest),
  fork(takeLatest, CONSTANTS.USER_SAVE_REQUEST, userSaveRequest),
  fork(takeLatest, CONSTANTS.USER_DELETE_REQUEST, userDeleteRequest),
  fork(takeLatest, CONSTANTS.GET_CURRENT_USER_REQUEST, getMeRequest),
  fork(takeLatest, CONSTANTS.UPDATE_CURRENT_USER_PASSWORD_REQUEST, updateMyPassword),
  fork(takeLatest, CONSTANTS.SAVE_LIKE_REQUEST, userSaveLikeRequest),
  fork(takeLatest, CONSTANTS.SAVE_UNLIKE_REQUEST, userSaveUnLikeRequest),
];
