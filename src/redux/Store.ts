import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./actions/UserInfo";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
