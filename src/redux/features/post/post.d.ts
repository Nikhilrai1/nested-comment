interface Post {
  id: string;
  author: string;
  title: string;
  description: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  author: string;
  text: string;
  replies?: Comment[];
}

