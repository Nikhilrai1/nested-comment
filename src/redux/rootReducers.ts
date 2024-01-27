import { combineReducers } from "@reduxjs/toolkit";
import { AuthSlice } from "./features/auth/authSlice";
import { rootApi } from "./root.api";
import { postSlice } from "./features/post/postSlice";


export const rootReducer = combineReducers({
    auth: AuthSlice.reducer,
    posts: postSlice.reducer,
    [rootApi.reducerPath]: rootApi.reducer,
  });