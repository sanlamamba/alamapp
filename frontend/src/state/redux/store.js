import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "./features/auth/authSlice";
import navReducer from "./features/nav/navSlice";
import rootSaga from "../sagas";

const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({
    thunk: false,
  }),
  sagaMiddleware,
];
const store = configureStore({
  reducer: {
    auth: authReducer,
    nav: navReducer,
  },
  middleware,
});
sagaMiddleware.run(rootSaga);

export default store;
