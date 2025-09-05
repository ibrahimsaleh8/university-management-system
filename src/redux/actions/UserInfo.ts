import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type SharedUserInfo = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  image: string;
};
type userInfoInitialStateType = {
  user: SharedUserInfo;
  isLoggedin: boolean;
};
const initialState: userInfoInitialStateType = {
  user: {
    id: 0,
    email: "",
    first_name: "",
    last_name: "",
    role: "",
    image: "",
  },
  isLoggedin: false,
};

export const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    updateUserState: (state, action: PayloadAction<SharedUserInfo>) => {
      state.user = {
        ...action.payload,
      };
    },
    setAuthStatus: (state, action: PayloadAction<{ isLoggedin: boolean }>) => {
      state.isLoggedin = action.payload.isLoggedin;
    },
    LogoutAction: (state) => {
      state.isLoggedin = false;
      state.user = {
        id: 0,
        email: "",
        first_name: "",
        last_name: "",
        role: "",
        image: "",
      };
    },
    updateMainData: (
      state,
      action: PayloadAction<{
        email: string;
        first_name: string;
        last_name: string;
      }>
    ) => {
      state.user.email = action.payload.email;
      state.user.first_name = action.payload.first_name;
      state.user.last_name = action.payload.last_name;
    },
  },
});

export default userSlice.reducer;
export const userSliceActions = userSlice.actions;
