import { connection } from "websocket";
import { OutgoingMessageType } from "../message/OutgoingMessage";
import { v4 as uuidV4 } from "uuid";

interface User {
    name: String;
    id?: String;
    conn: connection;
}

interface Room {
    users: User[];
}

interface AddUserParams {
    user: User;
    roomId: String;
}

interface RemoveUserParams {
    roomId: String,
    userId: String
}

interface GetUserParams {
    roomId: String,
    userId: String
}

interface BroadCastParams {
    roomId: String;
    userId: String;
    message: OutgoingMessageType;
}


export class UserManager {
    private rooms: Map<String, Room>;
    constructor() {
        this.rooms = new Map<String, Room>();
    }

    addUser({ user, roomId }: AddUserParams) {
        let newRoomId = roomId;
        if (!this.rooms.get(roomId)) {
            newRoomId = uuidV4();
            this.rooms.set(newRoomId, {
                users: [],
            });
        }

       

        if (user?.id) {
            console.log("JOIN EXISTING ROOM");
        }
        else {
            console.log("JOIN EXISTING ROOM");
        }

      
        const userId = user?.id ? user?.id : uuidV4();
        this.rooms.get(roomId)?.users.push({
            ...user,
            id: userId,
        });

        user.conn.on("close", () => {
            this.removeUser({ roomId, userId });
            return;
        })

        return { roomId, userId: userId || null };
    }

    removeUser({ roomId, userId }: RemoveUserParams) {
        console.log("remove user")
        const users = this.rooms.get(roomId)?.users;
        if (users) {
            users.filter(({ id }) => id !== userId);
        }
    }

    getUser({ roomId, userId }: GetUserParams): User | null {
        const user = this.rooms.get(roomId)?.users.find(user => user.id === userId);
        return user ?? null;
    }

    broadCast({ message, roomId, userId }: BroadCastParams) {
        const user = this.getUser({ roomId, userId });
        if (!user) {
            console.error("User not found");
            return;
        }

        const room = this.rooms.get(roomId);
        if (!room) {
            console.error("Room not found");
            return;
        }

        room.users.forEach(({ conn, id }) => {
            if (id === userId) {
                return;
            }
            conn.sendUTF(JSON.stringify(message))
        })
    }
}