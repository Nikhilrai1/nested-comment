import { combineReducers } from "@reduxjs/toolkit";
import { AuthSlice } from "./features/auth/authSlice";
import { rootApi } from "./root.api";


export const rootReducer = combineReducers({
    auth: AuthSlice.reducer,
    [rootApi.reducerPath]: rootApi.reducer,
  });