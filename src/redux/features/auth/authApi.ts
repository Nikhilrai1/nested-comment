import { rootApi } from "../../root.api";
import { initAuthUser, logout } from "./authSlice";

export const authApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: { username: string; password: string }) => ({
        url: "/login/",
        method: "POST",
        body,
      }),
      onQueryStarted(_args, { dispatch, queryFulfilled, }) {
        queryFulfilled.then((data) => {
          dispatch(initAuthUser(data.data));
        }).catch(() => {
          dispatch(logout());
        });;
      },
    }),
    verifyToken: builder.mutation({
      query: (body: { token: string }) => ({
        url: "/verify-token/",
        method: "POST",
        headers: {},
        body,
      }),
      onQueryStarted(__args, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then((data) => {
            dispatch(initAuthUser(data.data));
          })
          .catch(() => {
            dispatch(logout());
          });
      },
    }),
  }),
});

export const { useLoginMutation, useVerifyTokenMutation } = authApi;
