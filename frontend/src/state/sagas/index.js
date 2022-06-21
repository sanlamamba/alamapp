import { call } from "redux-saga/effects";
import authSaga from "./authSaga";

function* rootSaga() {
  yield call(authSaga);
}

export default rootSaga;
