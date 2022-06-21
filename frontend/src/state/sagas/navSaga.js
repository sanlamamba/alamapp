import { useSelector, useDispatch } from "react-redux";
import { call, put, takeEvery, takeLatest, select } from "redux-saga/effects";
import { toast } from "react-toastify";
import {} from "../redux/features/nav/navSlice";

// function* navPage(action) {
//   try {
//     yield put(setCurrentPage(action.payload.page));
//   } catch (error) {
//     toast.error(error);
//   }
// }

function* navPath(action) {
  yield call(console.log, action.payload.path);
}

export default function* authSaga() {
  // yield takeLatest("LINK_CLICKED", navPage);
  yield takeLatest("CHANGE_PAGE", navPath);
}
