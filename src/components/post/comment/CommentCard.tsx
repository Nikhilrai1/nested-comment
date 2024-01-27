import { Box, Button, Typography } from "@mui/material"
import CommentList from "./CommentList";
import { useEffect, useRef, useState } from "react";
import AddComment from "./AddComment";
import { Comment } from "../../../redux/features/post/post";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { addPostComment } from "../../../redux/features/post/postSlice";
import { toast } from "react-toastify";

interface CommentCardProps {
  postId: string;
  comment: Comment;
  isNested?: boolean;
  index: number;
  hasParent?: boolean;
  parentPosition?: {
    x: number;
    y: number;
  }
}
const CommentCard = ({ postId, comment, isNested = false, hasParent = false, parentPosition }: CommentCardProps) => {
  const commentRef = useRef<HTMLDivElement>();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [toggleReply, setToggleReply] = useState<boolean>(false);
  const { authUser } = useAppSelector(state => state.auth);
  const { postSuccess } = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const updatePosition = () => {
      if (commentRef.current) {
        const rect = commentRef.current.getBoundingClientRect();
        setPosition({ x: rect.left, y: rect.top });
      }
    };

    // Call updatePosition initially and on resize
    updatePosition();
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [toggleReply]);

  const onAddNewComment = (reply: string) => {
    console.log("reply", reply);

    if (authUser) {
      dispatch(addPostComment({
        author: {
          _id: authUser?._id,
          fullname: authUser?.fullname,
          photo: authUser?.photo
        },
        postId,
        text: reply
      }))
    }
    setToggleReply(false);
  }

  useEffect(() => {
    if (postSuccess) {
      toast.success("Comment Added Successfully.")
    }
  }, [postSuccess])

  return (
    <Box sx={{
      display: 'flex',
      alignItems: "start",
      gap: "15px",
      mt: !isNested ? "0px" : "10px",
      position: "relative"
    }}>
      <Box ref={commentRef} component={"div"} sx={{ height: "29px", width: "29px", objectFit: "cover" }}>
        <img src={comment?.author?.photo || ""} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />

        {(hasParent && parentPosition) && <Box sx={{
          position: "absolute",
          // calculate height by subtrating half of height of profile image div 
          height: `${position?.y - parentPosition?.y - 14}px`,
          // calculate width by subtrating half of width  of profile image div  + 6 px extra for gap
          width: `${position?.x - parentPosition?.x - 20}px`,
          bottom: "calc(100% - 14px)",
          left: "-54.5px",
          borderLeft: "1px solid #DAE8ED",
          borderBottom: "1px solid #DAE8ED",
          // backgroundColor: "red",
          borderBottomLeftRadius: "8px",
        }}
        />}
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        px: "12px",
        width: "100%",
      }}>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: "center",
          px: "12px",
          py: "10px",
          borderRadius: "0px 16px 16px 16px",
          backgroundColor: !isNested ? "#EDF5F8" : "#E9FAFF",
          width: "fit-content"
        }}>
          <Typography sx={{ fontWeight: 600, color: "#000", fontSize: "14px" }}>{comment?.author?.fullname || ""}</Typography>
          <Typography component={"p"} sx={{ color: "#000", fontWeight: "400", fontSize: "14px" }}>{comment?.text || ""}</Typography>
        </Box>
        <Box sx={{ py: "7px", px: "11px" }}>
          <Button onClick={() => setToggleReply(prev => !prev)} variant="text" style={{ minWidth: "" }} sx={{ px: "0px", py: "0px", minWidth: "fit-content", textTransform: "capitalize" }}>
            Reply
          </Button>
        </Box>
        {toggleReply && (
          <AddComment
            onReply={(reply) => onAddNewComment(reply)}
          />
        )}

        {/* recursively call comment replies */}
        {(comment?.replies && comment?.replies?.length > 0) && (
          <CommentList
            postId={postId}
            comments={comment.replies}
            isNested={true}
            hasParent={true}
            parentPosition={position}
          />
        )}
      </Box>
    </Box>
  )
}

export default CommentCard
