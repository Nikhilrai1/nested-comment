import { RouteObject } from "react-router-dom";
import PostList from "../../pages/post/PostList";
import AddPost from "../../pages/post/AddPost";
import UpdatePost from "../../pages/post/UpdatePost";
import ViewPost from "../../pages/post/ViewPost";


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
        {
            path: "view",
            element: <ViewPost />,
        },
        {
            path: "update/:id",
            element: <UpdatePost />,
        },
    ],
};
