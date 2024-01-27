import z from "zod";


export enum SupportedMessage {
    JoinRoom = "JOIN_ROOM",
    SendMessage = "SEND_MESSAGE",
    UpvoteMessage = "UPVOTE_MESSAGE",
    LeaveRoom = "LEAVE_ROOM"
}

export type IncomingMessageType = {
    type: SupportedMessage.JoinRoom,
    payload: InitMessageType
} | {
    type: SupportedMessage.SendMessage,
    payload: UserMessageType
} | {
    type: SupportedMessage.UpvoteMessage,
    payload: UpvoteMessageType
} | {
    type: SupportedMessage.LeaveRoom,
    payload: {
        userId: String,
        name: String
    }
}

// init message
export const InitMessage = z.object({
    name: z.string(),
    userId: z.string(),
    roomId: z.string()
});
export type InitMessageType = z.infer<typeof InitMessage>;



// user message
export const UserMessage = z.object({
    userId: z.string(),
    roomId: z.string(),
    message: z.string(),
})
export type UserMessageType = z.infer<typeof UserMessage>;


// upvote message
export const UpvoteMessage = z.object({
    userId: z.string(),
    roomId: z.string(),
    chatId: z.string(),
})
export type UpvoteMessageType = z.infer<typeof UpvoteMessage>;