import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const newUser = {
  userName: '',
  email: '',
};

const initalState = fromJS({
  users: {
    list: [],
    loading: false,
    like: false
  },
  user: {
    id: '',
    data: {},
    error: [],
    loading: false,
  },
  me: {
    userName: '',
    email: '',
    id: '',
    loading: false,
    error: [],
    open: true,
  }
});

function userReducer(state = initalState, action) {
  const userList = state.getIn(['users', 'list']);

  switch (action.type) {
    case CONSTANTS.LOAD_NEW_USER:
      return state.set('user', fromJS({
        data: newUser,
        id: 'new',
        error: [],
        loading: false,
      }));


    case CONSTANTS.USER_LIST_REQUEST:
      return state.setIn(['users', 'loading'], true);


    case CONSTANTS.USER_LIST_SUCCESS:
      return state.setIn(['users', 'list'], fromJS(action.data))
        .setIn(['users', 'loading'], false);


    case CONSTANTS.USER_LIST_ERROR:
      return state.setIn(['users', 'loading'], false);


    case CONSTANTS.USER_DELETE_REQUEST:
      return state.setIn(['users', 'loading'], true)
        .setIn(['user', 'loading'], true);


    case CONSTANTS.USER_DELETE_SUCCESS:
      const filteredList = userList.filter((user) => user.get('_id') !== action.id);
      return state.setIn(['users', 'list'], fromJS(filteredList))
        .setIn(['users', 'loading'], false)
        .setIn(['user', 'loading'], false);


    case CONSTANTS.USER_DELETE_ERROR:
      return state.setIn(['users', 'loading'], false)
        .setIn(['user', 'loading'], false);


    case CONSTANTS.USER_LOAD_REQUEST:
      return state.setIn(['user', 'loading'], true);


    case CONSTANTS.USER_LOAD_SUCCESS:
      return state.setIn(['user', 'data'], fromJS(action.data))
        .setIn(['user', 'id'], action.data._id)
        .setIn(['user', 'loading'], false);


    case CONSTANTS.USER_LOAD_ERROR:
      return state.setIn(['user', 'loading'], false);


    case CONSTANTS.USER_SAVE_REQUEST:
      return state.setIn(['user', 'loading'], true)
        .setIn(['user', 'error'], fromJS([]));


    case CONSTANTS.USER_SAVE_SUCCESS:
      return state
        .setIn(['user', 'id'], action.data._id)
        .setIn(['user', 'data', 'id'], action.data._id)
        .setIn(['user', 'loading'], false);


    case CONSTANTS.USER_SAVE_ERROR:
      return state.setIn(['user', 'loading'], false)
        .setIn(['user', 'error'], fromJS(action.data.error));


    case CONSTANTS.UPDATE_USER_FIELD:
      return state.setIn(['user', 'data', action.field], action.value);


    case CONSTANTS.GET_CURRENT_USER_REQUEST:
      return state.setIn(['me', 'loading'], true)
        .setIn(['me', 'open'], false);


    case CONSTANTS.GET_CURRENT_USER_SUCCESS:
      return state.setIn(['me', 'userName'], fromJS(action.currentUserInfo.userName))
        .setIn(['me', 'email'], fromJS(action.currentUserInfo.email))
        .setIn(['me', 'id'], fromJS(action.currentUserInfo.id))
        .setIn(['me', 'loading'], false)
        .setIn(['me', 'open'], true);


    case CONSTANTS.GET_CURRENT_USER_ERROR:
      return state.setIn(['me', 'loading'], false)
        .setIn(['me', 'open'], false)
        .setIn(['me', 'error'], fromJS(action.error));


    case CONSTANTS.CLOSE_MODAL:
      return state.setIn(['me', 'open'], action.data);


    case CONSTANTS.SAVE_LIKE_SUCCESS:
      const transformedList = userList.map((user) => {
        if (user.get('_id') === action.data.likedUserId) {
          return  user.set('likers', user.get('likers').concat(action.data.likingUserId));
        }

        return user;
      });
      return state.setIn(['users', 'list'], fromJS(transformedList))
        .setIn(['users', 'loading'], false)


    case CONSTANTS.SAVE_LIKE_ERROR:
      return state.setIn(['users', 'loading'], false);

    case CONSTANTS.SAVE_UNLIKE_ERROR:
      return state.setIn(['users', 'loading'], false);


    case CONSTANTS.SAVE_UNLIKE_SUCCESS:
      const unlikedNewList = userList.map((user) => {
        if (user.get('_id') === action.data.likedUserId) {
          const likers = user.get('likers').toJS();
          let index = likers.indexOf(action.data.likingUserId);
          return user.set('likers', user.get('likers').delete(index));
        }
        return user;
      });
      return state.setIn(['users', 'list'], fromJS(unlikedNewList))
        .setIn(['users', 'loading'], false)
    default:
  }

  return state;
}

export default userReducer;
