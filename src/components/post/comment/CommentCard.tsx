import { Box, Button, Typography } from "@mui/material"
import CommentList from "./CommentList";
import { useEffect, useRef, useState } from "react";
import AddComment from "./AddComment";
import { Comment, PostInfo } from "../../../redux/features/post/post";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { deleteComment, editComment, replyComment } from "../../../redux/features/post/postSlice";


interface CommentCardProps {
  postId: string;
  comment: Comment;
  isNested?: boolean;
  index: number;
  hasParent?: boolean;
  parentPosition?: {
    x: number;
    y: number;
  },
  postInfo: PostInfo
}
const CommentCard = ({ postId, postInfo, comment, isNested = false, hasParent = false, parentPosition }: CommentCardProps) => {
  const commentRef = useRef<HTMLDivElement>();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [toggleReply, setToggleReply] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const { authUser } = useAppSelector(state => state.auth);
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


  // on add reply to comment
  const onAddNewComment = (reply: string) => {
    if (authUser && postInfo?.postAuthor) {
      if (editMode) {
        dispatch(editComment({
          postAuthor: postInfo?.postAuthor,
          postId: postInfo?.postId,
          newEditText: reply,
          commentId: comment?._id,
        }))
      }
      else {
        dispatch(replyComment({
          commentor: {
            _id: authUser?._id,
            fullname: authUser?.fullname,
            photo: authUser?.photo
          },
          postAuthor: postInfo?.postAuthor,
          postId: postInfo?.postId,
          text: reply,
          commentId: comment?._id
        }))
      }
    }
    setToggleReply(false);
    setEditMode(false);
  }


  // handle on edit click
  const onEditClick = () => {
    setEditMode(true);
    setToggleReply(prev => !prev)
  }

  // handle delete comment
  const handleDeleteComment = () => {
    if (authUser && postInfo?.postAuthor) {
      dispatch(deleteComment({
        commentId: comment?._id,
        postAuthor: postInfo?.postAuthor,
        postId: postInfo?.postId
      }))
    }
  }


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
        <Box sx={{ py: "7px", px: "11px", display: "flex", alignItems: "center", gap: "20px" }}>

          {/* cannot reply own replied comment */}
          {/* {(authUser?._id !== comment?.author?._id) && ( */}
            <Button onClick={() => setToggleReply(prev => !prev)} variant="text" style={{ minWidth: "" }} sx={{ px: "0px", py: "0px", minWidth: "fit-content", textTransform: "capitalize" }}>
              Reply
            </Button>
          {/* )} */}

          {/* only authorized user who created the comment can edit or delete the comment */}
          {(authUser?._id === comment?.author?._id) && (
            <>
              <Button onClick={onEditClick} variant="text" style={{ minWidth: "" }} sx={{ px: "0px", py: "0px", minWidth: "fit-content", textTransform: "capitalize" }}>
                Edit
              </Button>
              <Button onClick={handleDeleteComment} variant="text" style={{ minWidth: "" }} sx={{ px: "0px", py: "0px", minWidth: "fit-content", textTransform: "capitalize" }}>
                Delete
              </Button>
            </>
          )}

        </Box>
        {toggleReply && (
          <AddComment
            defaultText={editMode ? comment?.text : undefined}
            submitBtnName={editMode ? "Edit" : undefined}
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
            postInfo={postInfo}
          />
        )}
      </Box>
    </Box>
  )
}

export default CommentCard
