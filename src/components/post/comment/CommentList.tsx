import { Box, Typography } from '@mui/material'
import CommentCard from './CommentCard'
import { useState } from 'react';
import { Comment, PostInfo } from '../../../redux/features/post/post';
import Pagination from '../../pagination/Pagination';

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
  const [paginationParams, setPaginationParams] = useState({
    currentPage: 1,
    perPage: 5,
  })

  const start = (paginationParams?.currentPage - 1) * paginationParams?.perPage;
  const end = start + paginationParams?.perPage;

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      py: !isNested ? "17px" : "0px",
      px: !isNested ? "34px" : "11px",
      gap: "10px",
    }}>

      {showReply && comments?.slice(start,end).map((comment, i) => (
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

      {!isNested && showReply && <Pagination
        currentPage={paginationParams.currentPage}
        totalPages={Math.ceil(comments.length as number / paginationParams?.perPage)}
        onPageChange={(page) => setPaginationParams({ ...paginationParams, currentPage: page })}
        hasNextPage={comments?.length as number > paginationParams?.perPage * paginationParams?.currentPage}
        hasPrevPage={paginationParams?.currentPage > 1}
      />}

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
