import { Box, Button, TextField, TextareaAutosize } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form";
import { CreatePost } from "../../redux/features/post/post";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { createPost, defaultPostSuccess } from "../../redux/features/post/postSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AddPost = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<CreatePost, "authorId">>();
  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector(state => state.auth);
  const { postSuccess } = useAppSelector(state => state.posts);


  const onSubmit: SubmitHandler<Omit<CreatePost, "authorId">> = async (data) => {

    if (authUser) {
      dispatch(createPost({
        author: {
          _id: authUser?._id,
          fullname: authUser?.fullname,
          photo: authUser?.photo
        },
        title: data?.title,
        description: data?.description
      }))
    }
    else {
      toast.warn("Unauthorized access")
    }
  };


  useEffect(() => {
    if (postSuccess) {
      toast.success("Post created successfully.")
      reset();
      dispatch(defaultPostSuccess());
    }
  }, [postSuccess])

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box component="form" style={{ maxWidth: "759px" }} noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>

        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          placeholder="Title"
          helperText={errors?.title?.message}
          {...register("title", {
            required: {
              value: true,
              message: "Title is required.",
            },
          })}
        />
        <TextareaAutosize
          aria-label="minimum height"
          minRows={3}
          placeholder="What are your thoughts?"
          {...register("description", {
            required: {
              value: true,
              message: "Description is required.",
            },
          })}
          style={{ width: "100%", padding: "5px" }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, bgcolor: "#120c41" }}
        >
          Create Post
        </Button>
      </Box>
    </Box>
  )
}

export default AddPost