import { combineReducers } from "@reduxjs/toolkit";
import { AuthSlice } from "./features/auth/authSlice";
import { postSlice } from "./features/post/postSlice";


export const rootReducer = combineReducers({
    auth: AuthSlice.reducer,
    posts: postSlice.reducer,
  });