export enum SupportedOutGoingMessage {
    AddChat = "ADD_CHAT",
    UpdateChat = "UPDATE_CHAT",
    LeaveUser = "LEAVE_USER",
}

type MessagePayload = {
    roomId: String;
    message: String;
    name: String;
    upvote: number;
    chatId: String;
}

export type OutgoingMessageType = {
    type: SupportedOutGoingMessage.AddChat,
    payload: MessagePayload
} | {
    type: SupportedOutGoingMessage.UpdateChat,
    payload: Partial<MessagePayload>
} | {
    type: SupportedOutGoingMessage.LeaveUser,
    payload: {
        userId: String,
        name: String
    }
}