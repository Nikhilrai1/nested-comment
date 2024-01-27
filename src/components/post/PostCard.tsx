import { Box, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import CommentList from "./comment/CommentList";
import { Comment, Post } from "../../redux/features/post/post";
import { useEffect, useState } from "react";
import AddComment from "./comment/AddComment";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addPostComment } from "../../redux/features/post/postSlice";
import { toast } from "react-toastify";

// interface Author {
//     _id: string;
//     fullname: string;
//     photo: string;
// }
// export interface Comment {
//     author: Author;
//     text: string;
//     replies: Comment[];
// }

// const comments: Array<Comment> = [
//     {
//         author: {
//             _id: uuidv4(),
//             fullname: "Jorge Parker",
//             photo: "/profile/profile1.webp"
//         },
//         replies: [
//             {
//                 author: {
//                     _id: uuidv4(),
//                     fullname: "Raghav",
//                     photo: "/profile/profile3.JPG"
//                 },
//                 replies: [],
//                 text: "Where is the celebration party jorge? "
//             },
//             {
//                 author: {
//                     _id: uuidv4(),
//                     fullname: "Kristina Smith",
//                     photo: "/profile/profile4.webp"
//                 },
//                 replies: [
//                     {
//                         author: {
//                             _id: uuidv4(),
//                             fullname: "Jacob Parker",
//                             photo: "/profile/profile2.jpg"
//                         },
//                         replies: [],
//                         text: "Party is not possible without me."
//                     }
//                 ],
//                 text: "Don't forgot to invite me"
//             }
//         ],
//         text: "Wish you a very happy new year Brother"
//     },
//     {
//         author: {
//             _id: uuidv4(),
//             fullname: "Andrew",
//             photo: "/profile/profile5.jpg"
//         },
//         replies: [],
//         text: "Happy new year"
//     },
// ]

interface PostCardProps {
    postItem: Post
}

const PostCard = ({ postItem }: PostCardProps) => {
    const [post, setPost] = useState<Post>(postItem);
    const [addComment, setAddComment] = useState<boolean>(false);
    const { authUser } = useAppSelector(state => state.auth);
    const { postSuccess } = useAppSelector(state => state.posts);
    const dispatch = useAppDispatch();

    const onAddNewComment = (reply: string) => {
        console.log("reply", reply);

        if (authUser) {
            dispatch(addPostComment({
                author: {
                    _id: authUser?._id,
                    fullname: authUser?.fullname,
                    photo: authUser?.photo
                },
                postId: post?._id,
                text: reply
            }))
        }
        setAddComment(false);
    }

    useEffect(() => {
        if (postSuccess) {
            toast.success("Comment Added Successfully.")
        }
    }, [postSuccess])
    return (
        <Box sx={{ display: 'flex', flexDirection: "column", maxWidth: "790px", boxShadow: "0px 4px 34px 0px rgba(0, 0, 0, 0.15)" }}>

            {/* upper feed profile */}
            <Box sx={{
                display: 'flex',
                alignItems: "start",
                py: "15px",
                px: '34px',
                gap: "15px",
                borderBottom: "1px solid #F3E9E9"
            }}>
                <Box component={"div"} sx={{ height: "40px", width: "40px", objectFit: "contain" }}>
                    <img src={(post?.author && post?.author?.photo) || ""} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: "center",
                }}>
                    <Typography sx={{ fontWeight: 600, color: "#000" }}>{(post?.author && post?.author?.fullname) || ""}</Typography>
                    <Typography component={"p"} sx={{ color: "#8F8F8F" }}>2d</Typography>
                </Box>
            </Box>


            {/* post feed */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                py: "17px",
                px: '34px',
                gap: "8px",

            }}>
                <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>{post?.title || ""}</Typography>
                <Typography component={"p"} sx={{ color: "#000", fontSize: "14px", fontWeight: "400" }}>
                    {post?.description || ""}
                </Typography>
            </Box>

            {/* comments */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                py: "17px",
                px: '34px',
                gap: "10px",
                borderTop: "1px solid #F3E9E9",
                borderBottom: "1px solid #F3E9E9"
            }}>
                <Typography onClick={() => setAddComment(prev => !prev)} component={"p"} sx={{ color: "#727272", fontSize: "14px", fontWeight: "600px", cursor: "pointer" }}>
                    Comments
                </Typography>
            </Box>

            {addComment && (
                <AddComment
                    onReply={(reply) => onAddNewComment(reply)}
                />
            )}

            <CommentList postId={post?._id} comments={post?.comments} />
        </Box>
    )
}

export default PostCard
