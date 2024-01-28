import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./utils/protected/protectedRoutes";
import MainLayout from "./components/ui/layout/MainLayout";
import ErrorPage from "./pages/error/ErrorPage";
import HomePage from "./pages/home/HomePage";
import { postRoutes } from "./routes/post/postRoutes";
import LoginPage from "./pages/auth/LoginPage";
import NotFound404 from "./pages/error/NotFound404";
import SignupPage from "./pages/auth/SignupPage";
import { useEffect } from "react";
import { getAuth, verifyUser } from "./redux/features/auth/authSlice";
import { AuthUser } from "./redux/features/auth/auth";
import { useAppDispatch } from "./redux/store";


// routes
const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      postRoutes
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/sign-up",
    element: <SignupPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <NotFound404 />,
  },
]);


// const replies = [
//   {
//     _id: 'commen1',
//     author: {
//       _id: 'nikhilrai'
//     },
//     replies: [
//       {
//         _id: 'commen2',
//         author: {
//           _id: 'manoj'
//         },
//         replies: [
//           {
//             _id: 'commen3',
//             author: {
//               _id: 'nikhilrai'
//             },
//             replies: [],
//             text: 'reply to hello from manoj'
//           }
//         ],
//         text: 'hello from manoj'
//       }
//     ],
//     text: 'hello from nikhil'
//   }
// ]

const App = () => {
  const pathname = window.location.pathname;
  const dispatch = useAppDispatch();
  // const [verifyToken] = useVerifyTokenMutation();

  useEffect(() => {
    const auth: { authUser: AuthUser } = JSON.parse(getAuth());

    if (pathname !== "/login" && auth?.authUser && auth?.authUser?._id) {
      // verifyUserToken();
      dispatch(verifyUser(auth.authUser))
    }
  }, [pathname]);
  return <RouterProvider router={routes} />;


  // useEffect(() => {

    // const comments = [
    //   {
    //     _id: "commen1",
    //     author: {
    //       _id: "nikhilrai"
    //     },
    //     replies: [
    //       {
    //         _id: "commen2",
    //         author: {
    //           _id: "manoj"
    //         },
    //         replies: [],
    //         text: "hello from manoj"
    //       }
    //     ],
    //     text: "hello from nikhil"
    //   }
    // ];

  //   const comments = [
  //     {
  //       _id: 'commen1',
  //       author: {
  //         _id: 'nikhilrai'
  //       },
  //       replies: [
  //         {
  //           _id: 'commen2',
  //           author: {
  //             _id: 'manoj'
  //           },
  //           replies: [
  //             {
  //               _id: 'commen3',
  //               author: {
  //                 _id: 'nikhilrai'
  //               },
  //               replies: [],
  //               text: 'reply to hello from manoj'
  //             }
  //           ],
  //           text: 'hello from manoj'
  //         }
  //       ],
  //       text: 'hello from nikhil'
  //     }
  //   ]

  //   const reply = {
  //     _id: "commen4",
  //     author: {
  //       _id: "manoj"
  //     },
  //     replies: [],
  //     text: "reply to hello from manoj from nikhil"
  //   }

  //   function addReply(commentId: any, reply: any, comments: any) {
  //     for (let comment of comments) {
  //       if (comment._id === commentId) {
  //         comment.replies.push(reply);
  //         return true;
  //       } else if (comment.replies.length > 0) {
  //         if (addReply(commentId, reply, comment.replies)) {
  //           return true;
  //         }
  //       }
  //     }
  //     return false;
  //   }
  //   // Example usage:
  //   addReply("commen3", reply, comments);
  //   console.log(comments);
  // }, [])


  // return (
  //   <h1>hello</h1>
  // )
}

export default App