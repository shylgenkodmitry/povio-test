import { createSelector } from 'reselect';

const selectUser = (state) => state.get('auth');

const makeSelectUserList = () => createSelector(
  selectUser,
  (userState) => userState.getIn(['users', 'list']),
);

const makeSelectUserListLoading = () => createSelector(
  selectUser,
  (userState) => userState.getIn(['users', 'loading']),
);

export {
  selectUser,
  makeSelectUserList,
  makeSelectUserListLoading,
};
