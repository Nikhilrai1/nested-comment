import { Box, Typography } from "@mui/material";
import CommentList from "./comment/CommentList";
import { Post } from "../../redux/features/post/post";
import { useEffect, useState } from "react";
import AddComment from "./comment/AddComment";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addPostComment } from "../../redux/features/post/postSlice";


interface PostCardProps {
    postItem: Post
}

const PostCard = ({ postItem }: PostCardProps) => {
    const [post, setPost] = useState<Post>(postItem);
    const [addComment, setAddComment] = useState<boolean>(false);
    const { authUser } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const onAddNewComment = (reply: string) => {
        if (authUser && postItem?.author) {
            dispatch(addPostComment({
                commentor: {
                    _id: authUser?._id,
                    fullname: authUser?.fullname,
                    photo: authUser?.photo
                },
                postAuthor: {
                    _id: postItem?.author?._id || "",
                    fullname: postItem?.author?.fullname || "",
                    photo: postItem?.author?.photo
                },
                postId: post?._id,
                text: reply
            }))
        }
        setAddComment(false);
    }

    useEffect(() => {
        if (postItem) {
            setPost(postItem);
        }
    }, [postItem])

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
                <Box sx={{ px: "34px" }}>
                    <AddComment
                        onReply={(reply) => onAddNewComment(reply)}
                    />
                </Box>
            )}

            <CommentList postId={post?._id} comments={post?.comments} />
        </Box>
    )
}

export default PostCard
