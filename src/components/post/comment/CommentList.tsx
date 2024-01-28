import { Box, Typography } from '@mui/material'
import CommentCard from './CommentCard'
import { useState } from 'react';
import { Comment, PostInfo } from '../../../redux/features/post/post';

interface CommentListProps {
  postId: string;
  comments: Comment[];
  isNested?: boolean;
  hasParent?: boolean;
  parentPosition?: {
    x: number;
    y: number;
  };
  postInfo: PostInfo;

}
const CommentList = ({ postId, postInfo, comments, isNested = false, hasParent = false, parentPosition }: CommentListProps) => {
  const [showReply, setShowReply] = useState<boolean>(false);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      py: !isNested ? "17px" : "0px",
      px: !isNested ? "34px" : "11px",
      gap: "10px",
    }}>

      {showReply && comments?.map((comment, i) => (
        <CommentCard
          key={i}
          postId={postId}
          comment={comment}
          isNested={isNested}
          index={i}
          hasParent={hasParent}
          parentPosition={parentPosition}
          postInfo={postInfo}
        />
      ))}

      <Box
        sx={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}
        onClick={() => setShowReply(prev => !prev)}
      >
        <img src="/assets/reply.svg" style={{ height: "9px", width: "11.5px" }} />
        <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#000" }} >
          {!showReply ? comments?.length : "Hide"} Replies
        </Typography>
      </Box>
    </Box>
  )
}

export default CommentList
