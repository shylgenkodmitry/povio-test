import userSaga from '../user/redux/saga';

export default function* appSaga() {
  yield []
    .concat(userSaga);
}
