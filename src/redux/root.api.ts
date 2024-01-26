import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { BASE_API_URL } from "../utils/apiConstants";

export const rootApi = createApi({
  reducerPath: "root",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "Subject",
    "StudentCategory",
    "StudentHouse",
    "Student-Info",
    "Guardian",
    "Department",
    "Designation",
    "Staff",
    "Grade",
    "Class",
    "SubjectGroup",
    "Manage-Roll_Number"
  ],
});
