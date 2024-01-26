export interface GeneralInfoI {
  id: string;
  logo: string;
  school_name: string;
  short_abbreviation: string;
  address: string;
  primary_number: string;
  secondary_number: null;
  email: string;
  slogan: string;
  school_reg_number: string;
}

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  fullname: string;
  photo: string;
  posts: Post[]
}

export interface LoginPayload {
  token: {
    refresh: string;
    access: string;
  };
  user: AuthUserI;
  isLoading: boolean;
}


interface Post {
  
}
