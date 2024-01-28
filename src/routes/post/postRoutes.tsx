import { RouteObject } from "react-router-dom";
import PostList from "../../pages/post/PostList";
import AddPost from "../../pages/post/AddPost";


export const postRoutes: RouteObject = {
    path: "post",
    children: [
        {
            index: true,
            element: <PostList />,
        },
        {
            path: "add",
            element: <AddPost />,
        },
    ],
};
