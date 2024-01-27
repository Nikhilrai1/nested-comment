import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthUser, CreateUserParams, DB, LoginPayload, LoginUserParams } from "./auth";
import { v4 as uuidV4 } from "uuid";
import { toast } from "react-toastify";
import { comparePassword } from "../../../utils/protected/password";
interface InitialStateI {
  users: AuthUser[];
  successCreate: boolean;
  loginSuccess: boolean;
  authenticated: boolean;
  authUser: AuthUser | null;
  noAuth: boolean;
}

export const initialState: InitialStateI = {
  users: [],
  successCreate: false,
  authUser: null,
  authenticated: false,
  noAuth: true,
  loginSuccess: false
};

// get db
export const getDb = () => {
  let db = JSON.parse(JSON.stringify(localStorage.getItem("db")));
  if (!db) {
    localStorage.setItem("db", JSON.stringify({
      users: []
    }))
  }
  db = JSON.parse(JSON.stringify(localStorage.getItem("db")));
  return db;
};

// get auth
export const getAuth = () => {
  let auth = JSON.parse(JSON.stringify(localStorage.getItem("auth")));
  if (!auth) {
    localStorage.setItem("auth", JSON.stringify({
      authUser: null
    }))
  }
  auth = JSON.parse(JSON.stringify(localStorage.getItem("auth")));
  return auth;
};


// create user
export const createUserInDb = (payload: CreateUserParams) => {
  const newuser: AuthUser = {
    ...payload,
    _id: uuidV4(),
    posts: []
  }

  const db: DB = JSON.parse(getDb());
  db.users?.map(user => {
    if (user?.username === newuser?.username) {
      toast.warning("Username already exists");
      return;
    }
  })

  const updateUsers = [...db.users, newuser];
  localStorage.setItem("db", JSON.stringify({
    users: updateUsers
  }))

  // toast.success("Account created successfully.");
  return newuser;

}

// login user
export const loginUser = async (payload: LoginUserParams) => {
  const db: DB = JSON.parse(getDb());

  const user = db?.users?.find(user => user?.username === payload.username);
  console.log("user", user)
  const isPasswordMatch = await comparePassword(payload?.password || "", user?.password || "");
  console.log("isPasswordMatch", isPasswordMatch)

  if (user && isPasswordMatch) {
    localStorage.setItem("auth", JSON.stringify({
      authUser: user
    }))
    return user;
  }
  toast.error("Invalid username or password.")
  return null;
}

// verify user
export const verifyUserInDb = (payload: LoginUserParams) => {
  const db: DB = JSON.parse(getDb());

  const user = db?.users?.find(user => user?.username === payload.username);
  const isPasswordMatch = user?.password === payload.password;

  if (user && isPasswordMatch) {
    return user;
  }
  toast.error("Please Relogin")
  return null;
}


export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {

    createUser: (state, { payload }: PayloadAction<CreateUserParams>) => {
      const newUser = createUserInDb(payload);
      if (newUser) {
        state.users = [...state.users, newUser];
        state.successCreate = true;
      }
    },

    signInUser: (state, { payload }: PayloadAction<AuthUser>) => {
      state.noAuth = false;
      state.authenticated = true;
      state.authUser = payload;
      state.loginSuccess = true;
    },

    verifyUser: (state, { payload }: PayloadAction<AuthUser>) => {
      const authUser = verifyUserInDb({ username: payload.username, password: payload.password || "" });
      if (authUser) {
        state.noAuth = false;
        state.authenticated = true;
        state.authUser = authUser;
      }
    },

    defaultCreateSuccess: (state) => {
      state.successCreate = false;
    },

    defaultLoginSuccess: (state) => {
      state.loginSuccess = false;
    },

    initAuthUser: (state, { payload }: PayloadAction<LoginPayload>) => {
      state.noAuth = false;
      state.authenticated = true;
      state.authUser = payload.user;
    },

    logout: (state) => {
      state.authUser = null;
      state.authenticated = false;
      state.noAuth = true;
      localStorage.setItem("auth", JSON.stringify({
        authUser: null
      }))
      toast.success("Logout successfully.")
    },
  },
});

export const { createUser, signInUser, verifyUser, defaultCreateSuccess, defaultLoginSuccess, initAuthUser, logout } = AuthSlice.actions;
