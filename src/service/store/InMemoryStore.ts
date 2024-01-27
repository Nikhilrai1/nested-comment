import { AddChatParams, Chat, Store, UpvoteParams, UserId } from "./Store";
import {v4 as uuidV4} from "uuid";

export interface Room {
    roomId: String;
    chats: Chat[];
}


export class InMemoryStore implements Store {
    private store: Map<String, Room>
    constructor() {
        this.store = new Map<String, Room>();
    }

    initRoom() {
        const roomId = uuidV4();
        this.store.set(roomId, {
            roomId,
            chats: []
        })
    }


    // last 50 chats => limit = 50, offset = 0
    // limit = 50, offset = 50
    // linit = 50, offset = 100
    getChats(roomId: String, limit: number, offset: number) {
        const room = this.store.get(roomId);
        if (!room) {
            return []
        };
        return room.chats.reverse().slice(0, offset).slice(-1 * limit);
    }

    addChat({ name, message, roomId, userId }: AddChatParams) {
        if (!this.store.get(roomId)) {
            this.initRoom();
        };
        const room = this.store.get(roomId);
        if(!room) {
            return;
        }
        const chat = {
            id: uuidV4(),
            userId,
            message,
            name,
            upVotes: [] as UserId[],
        }
        room.chats.push(chat);
        return chat;
    }


    upvote({ chatId, roomId, upVotedUserId }: UpvoteParams) {
        const room = this.store.get(roomId);
        if (!room) {
            return;
        }
        //TODO: Make it faster
        const chat = room.chats.find(({ id }) => id === chatId);
        if (chat) {
            chat.upVotes.push(upVotedUserId)
        }

        return chat;
    }
}