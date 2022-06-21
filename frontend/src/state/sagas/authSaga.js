import { useSelector, useDispatch } from "react-redux";
import { call, put, takeEvery, takeLatest, select } from "redux-saga/effects";
import { toast } from "react-toastify";
import {
  connectUser,
  disconnectUser,
  setJustLoggedOut,
} from "../redux/features/auth/authSlice";
import api from "../../apiConfig/requests";
function* logoutUser() {
  console.log("logout");
  try {
    const apiCall = yield call(api.getData, "/auth/logout");
    console.log(apiCall);
    if (apiCall.ok) {
      yield put(disconnectUser());
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
      toast.success("Logged out successfully");
    } else {
      toast.error(apiCall.data.message);
    }
  } catch (error) {
    console.log(error);
  }
}
function* fetchUser(action) {
  try {
    const apiCall = yield call(api.postData, {
      endpoint: "/auth/login",
      req: action.payload,
    });
    if (!apiCall.ok) {
      const { data } = apiCall;
      toast.error(data.message);
    } else {
      const { data } = apiCall;
      yield put(connectUser(data.user));
      yield call(setTimeout, 500);
      toast(`Welcome ${data.user.name}`);
      window.localStorage.setItem("user", JSON.stringify(data.user));
      window.localStorage.setItem("token", data.token);
      yield call(setTimeout, 500);
      toast.info("Redirecting...");
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
}
function* registerUser(action) {
  try {
    const apiCall = yield call(api.postData, {
      endpoint: "/auth/register",
      req: action.payload,
    });
    const { data } = apiCall;
    console.log(apiCall.ok);
    if (apiCall.ok) {
      toast.success(data.message);
      toast.info("Trying to connect...");
      yield call(fetchUser, {
        payload: {
          email: action.payload.email,
          password: action.payload.password,
        },
      });
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
}
function* loadData() {
  const token = window.localStorage.getItem("token");
  const user = JSON.parse(window.localStorage.getItem("user"));
  if (token && user) {
    const data = {
      token,
      user,
    };
    yield put(connectUser(data));
  }
}
function* setJustLoggedOutFalse() {
  yield put(setJustLoggedOut());
}
function* becomeAnInstructor() {
  try {
    const { token } = yield select((state) => state.auth);
    console.log("token", token);
    const apiCall = yield call(api.postData, {
      endpoint: "/instructor/become-instructor",
      req: {
        token,
      },
    });
    const { data } = apiCall;
    if (apiCall.ok) {
      yield put(connectUser(data));
      toast.success(data.message);
      // reset localstorage
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("user", JSON.stringify(data.user));
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error);
  }
}
export default function* authSaga() {
  yield takeLatest("LOGIN_REQUEST", fetchUser);
  yield takeLatest("LOAD_LOGIN", loadData);
  yield takeLatest("REGISTER_REQUEST", registerUser);
  yield takeLatest("LOGOUT_REQUEST", logoutUser);
  yield takeLatest("JUST_LOGGED_OUT", setJustLoggedOutFalse);
  yield takeLatest("BECOME_INSTRUCTOR_REQUEST", becomeAnInstructor);
}
