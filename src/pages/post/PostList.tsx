import {  Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/store";
import PostCard from "../../components/post/PostCard";
import { useEffect } from "react";
import { getAllPosts } from "../../redux/features/post/postSlice";

const PostList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector(state => state.posts);


  useEffect(() => {
    dispatch(getAllPosts())
  }, [])



  return (
    <div>
      <Button onClick={() => navigate("/post/add")}>Create Post</Button>
      {posts?.map(post => (
        <PostCard key={post._id} postItem={post} />
      ))}
    </div>
  )
}

export default PostList