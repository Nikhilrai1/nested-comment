import { Post } from "../post/post";

export interface AuthUser {
  _id: string;
  username: string;
  fullname: string;
  password?: string;
  photo: string;
  posts: Post[]
}

interface CreateUserParams {
  fullname: string;
  username: string;
  password?: string;
  photo: string;
}

interface LoginUserParams {
  username: string;
  password: string;
}


export interface LoginPayload {
  token: {
    refresh: string;
    access: string;
  };
  user: AuthUserI;
  isLoading: boolean;
}


// db
interface DB {
  users: AuthUser[]
}

