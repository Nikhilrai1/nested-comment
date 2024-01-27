import { Box, Button, TextareaAutosize } from '@mui/material'
import { useState } from 'react'

interface AddCommentProps {
    onReply: (reply: string) => void;
}
const AddComment = ({ onReply }: AddCommentProps) => {
    const [text, setText] = useState<string>("");

    const handleAddComment = (newComment: string) => {
        onReply(newComment);
        setText("");
    }
    return (
        <Box sx={{ mb: "5px", width: "100%" }}>
            <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="What are your thoughts?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ width: "100%", padding: "5px" }}
            />
            <Box sx={{ mr: "auto" }}>
                <Button
                    variant="contained"
                    disabled={text === "" || !text}
                    onClick={() => handleAddComment(text)}
                    sx={{
                        minWidth: "fit-content",
                        textTransform: "capitalize",
                        py: "1px",
                        px: "10px",
                        fontSize: "12px",
                        mt: "10px"
                    }}>
                    Reply
                </Button>
            </Box>
        </Box>
    )
}

export default AddComment
