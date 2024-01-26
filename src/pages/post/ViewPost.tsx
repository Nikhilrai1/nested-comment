import { Box } from "@mui/material"
import PostCard from "../../components/post/PostCard"

const ViewPost = () => {
  return (
    <Box sx={{ display: 'flex', boxShadow: "1" }}>
      <PostCard />
    </Box>
  )
}

export default ViewPost