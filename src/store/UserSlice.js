import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    userLoggedAction: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    restoreUserAction: (state, action) => {
      state.user = JSON.parse(action.payload);
    },
    logoutUserAction: (state, action) => {
      state.user = {};
      localStorage.removeItem("user");
    },
  },
});

export const { userLoggedAction, restoreUserAction, logoutUserAction } =
  UserSlice.actions;
export default UserSlice.reducer;
