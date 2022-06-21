import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  path: "",
  title: "",
  icon: "",
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setCurrentPath: (state, action) => {
      state.path = action.payload.path;
    },
    setCurrentTitle: (state, action) => {
      state.title = action.payload.title;
    },
    setCurrentIcon: (state, action) => {
      state.icon = action.payload.icon;
    },
    setCurrentPage: (state, action) => {
      state.path = action.payload.path;
      state.title = action.payload.title;
      state.icon = action.payload.icon;
    },
  },
});

export const {
  setCurrentPath,
  setCurrentTitle,
  setCurrentIcon,
  setCurrentPage,
} = navSlice.actions;

export default navSlice.reducer;
