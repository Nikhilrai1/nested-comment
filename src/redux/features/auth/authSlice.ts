import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginPayload } from "./auth";

interface InitialStateI {
  noAuth: boolean;
  authenticated: boolean;
  authUser: any;
  token: string | null;
}

export const initialState: InitialStateI = {
  noAuth: true,
  authenticated: false,
  authUser: null,
  token: null,
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    initAuthUser: (state, { payload }: PayloadAction<LoginPayload>) => {
      state.noAuth = false;
      state.authenticated = true;
      state.authUser = payload.user;
      state.token = payload.token.access;

      localStorage.setItem("comment_sys", payload.token.access);
    },

    logout: (state) => {
      state.authUser = null;
      state.authenticated = false;
      state.noAuth = false;
      localStorage.removeItem("comment_sys");
    },
  },
});

export const { initAuthUser, logout } = AuthSlice.actions;
