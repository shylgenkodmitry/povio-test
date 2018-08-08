import * as CONSTANTS from './constants';

export function userListRequest() {
  return {
    type: CONSTANTS.USER_LIST_REQUEST,
  };
}

export function userListSuccess(data) {
  return {
    type: CONSTANTS.USER_LIST_SUCCESS,
    data,
  };
}

export function userListError(data) {
  return {
    type: CONSTANTS.USER_LIST_ERROR,
    data,
  };
}

export function userLoadRequest(id) {
  return {
    type: CONSTANTS.USER_LOAD_REQUEST,
    id,
  };
}

export function userLoadSuccess(data) {
  return {
    type: CONSTANTS.USER_LOAD_SUCCESS,
    data,
  };
}

export function userLoadError(data) {
  return {
    type: CONSTANTS.USER_LOAD_ERROR,
    data,
  };
}

export function userDeleteRequest(id) {
  return {
    type: CONSTANTS.USER_DELETE_REQUEST,
    id,
  };
}

export function userDeleteSuccess(id, data) {
  return {
    type: CONSTANTS.USER_DELETE_SUCCESS,
    id,
    data,
  };
}

export function userDeleteError(data) {
  return {
    type: CONSTANTS.USER_DELETE_ERROR,
    ...data,
  };
}

export function userSaveRequest() {
  return {
    type: CONSTANTS.USER_SAVE_REQUEST,
  };
}

export function userSaveSuccess(data) {
  return {
    type: CONSTANTS.USER_SAVE_SUCCESS,
    data,
  };
}

export function userSaveError(data) {
  return {
    type: CONSTANTS.USER_SAVE_ERROR,
    data,
  };
}

export function loadNewUser() {
  return {
    type: CONSTANTS.LOAD_NEW_USER,
  };
}

export function updateUserField(field, value) {
  return {
    type: CONSTANTS.UPDATE_USER_FIELD,
    field,
    value,
  };
}

export function getMe() {
  return {
    type: CONSTANTS.GET_CURRENT_USER_REQUEST
  }
}

export function getMeSuccess(currentUserInfo) {
  return {
    type: CONSTANTS.GET_CURRENT_USER_SUCCESS,
    currentUserInfo,
  };
}

export function getMeError(error) {
  return {
    type: CONSTANTS.GET_CURRENT_USER_ERROR,
    error,
  };
}

export function closeModal(data) {
  return {
    type: CONSTANTS.CLOSE_MODAL,
    data
  };
}

export function updateUserPasswordRequest(newPassword, userName, userEmail) {
  return {
    type: CONSTANTS.UPDATE_CURRENT_USER_PASSWORD_REQUEST,
    newPassword,
    userName,
    userEmail
  };
}

export function updateUserPasswordSuccess(data) {
  return {
    type: CONSTANTS.UPDATE_CURRENT_USER_PASSWORD_SUCCESS,
    data
  };
}

export function updateUserPasswordError(err) {
  return {
    type: CONSTANTS.UPDATE_CURRENT_USER_PASSWORD_ERROR,
    err
  };
}

export function userSaveLikeRequest(likeId) {
  return {
    type: CONSTANTS.SAVE_LIKE_REQUEST,
    likeId
  };
}

export function userSaveLikeSuccess(data) {
  return {
    type: CONSTANTS.SAVE_LIKE_SUCCESS,
    data
  };
}

export function userSaveLikeError(err) {
  return {
    type: CONSTANTS.SAVE_LIKE_ERROR,
    err
  }
}

export function userSaveUnLikeRequest(unLikeId) {
  return {
    type: CONSTANTS.SAVE_UNLIKE_REQUEST,
    unLikeId
  };
}

export function userSaveUnLikeSuccess(data) {
  return {
    type: CONSTANTS.SAVE_UNLIKE_SUCCESS,
    data
  };
}

export function userSaveUnLikeError(err) {
  return {
    type: CONSTANTS.SAVE_UNLIKE_ERROR,
    err
  }
}
