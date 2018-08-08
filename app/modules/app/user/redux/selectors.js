import { createSelector } from 'reselect';

const selectUser = (state) => state.get('app').get('user');
const currentUser = (state) => state.get('auth').get('currentUser');

const makeSelectCurrentUserId = () => createSelector(
  currentUser,
  (userState) => userState.get('_id'),
);

const makeSelectUserList = () => createSelector(
  selectUser,
  (userState) => userState.getIn(['users', 'list']),
);

const makeSelectUserListLoading = () => createSelector(
  selectUser,
  (userState) => userState.getIn(['users', 'loading']),
);

const makeSelectUser = () => createSelector(
  selectUser,
  (userState) => userState.getIn(['user', 'data']),
);

const makeSelectUserLoading = () => createSelector(
  selectUser,
  (userState) => userState.getIn(['user', 'loading']),
);

const makeSelectCurreuntUserName = () => createSelector(
  selectUser,
  (userState) => userState.getIn(['me', 'userName']),
);

const makeSelectCurreuntUserEmail = () => createSelector(
  selectUser,
  (userState) => userState.getIn(['me', 'email']),
);

const makeSelectMeLoading = () => createSelector(
  selectUser,
  (userState) => userState.getIn(['me', 'loading']),
);

const makeSelectMeOpenModal = () => createSelector(
  selectUser,
  (userState) => userState.getIn(['me', 'open']),
);

const makeSelectLiker = () => createSelector(
  selectUser,
  (userState) => userState.getIn(['like, likerId'])
);

const makeSelectLiking = () => createSelector(
  selectUser,
  (userState) => userState.getIn(['like, likingId'])
);

export {
  selectUser,
  currentUser,
  makeSelectCurrentUserId,
  makeSelectUserList,
  makeSelectUserListLoading,
  makeSelectUser,
  makeSelectUserLoading,
  makeSelectCurreuntUserName,
  makeSelectCurreuntUserEmail,
  makeSelectMeOpenModal,
  makeSelectMeLoading,
  makeSelectLiker,
  makeSelectLiking,
};
