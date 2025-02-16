import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice";

const store = configureStore({
  reducer: {
    userStore: userSlice,
  },
});

export default store;
