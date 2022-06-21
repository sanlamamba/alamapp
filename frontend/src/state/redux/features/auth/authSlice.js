import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  token: null,
  justLoggedOut: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    connectUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    disconnectUser: (state, action) => {
      state.user = null;
      state.token = null;
      state.justLoggedOut = true;
    },
    setJustLoggedOut: (state, action) => {
      state.justLoggedOut = false;
    },
  },
});

export const { connectUser, disconnectUser, setJustLoggedOut } =
  authSlice.actions;

export default authSlice.reducer;
