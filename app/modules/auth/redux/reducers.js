import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initalState = fromJS({
  currentUser: null,
  users: {
    list: [],
    loading: false,
  },
});

function authReducer(state = initalState, action) {
  switch (action.type) {
    case CONSTANTS.LOGIN_SUCCESS:
      return state.set('currentUser', fromJS(action.data));
    case CONSTANTS.LOGOUT:
      return state.delete('currentUser');
    case CONSTANTS.USER_LIST_REQUEST:
      return state.setIn(['users', 'loading'], true);
    case CONSTANTS.MOST_LIKED_USER_SUCCESS:
      return state.setIn(['users', 'list'], fromJS(action.data))
        .setIn(['users', 'loading'], false);
    case CONSTANTS.MOST_LIKED_USER_ERROR:
      return state.setIn(['users', 'loading'], false);
    default:
  }

  return state;
}

export default authReducer;
