interface Author {
  _id: string;
  fullname: string;
  photo: string;
}
export interface Comment {
  _id: string;
  author: Author;
  text: string;
  replies: Comment[];
}

export interface Post {
  _id: string;
  author: Author;
  title: string;
  description: string;
  comments: Comment[];
}

interface CreatePost {
  author: Author;
  title: string;
  description: string;
}

interface createComment {
  postId: string;
  author: Author;
  text: string;
}

