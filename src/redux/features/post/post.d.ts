export interface Author {
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

export interface PostInfo {
  postAuthor: Author;
  postId: string;
}

interface CreatePost {
  author: Author;
  title: string;
  description: string;
}

interface createComment {
  postId: string;
  postAuthor: Author;
  commentor: Author;
  text: string;
}

interface ReplyComment {
  postId: string;
  postAuthor: Author;
  commentor: Author;
  commentId: string;
  text: string;
}
