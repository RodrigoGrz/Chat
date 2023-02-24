import mongoose, { Document, Schema } from "mongoose";
import { User } from "./User";
import { randomUUID } from "node:crypto";

type ChatRoom = Document & {
    idUsers: User[];
    idChatRoom: string;
}

const ChatRoomSchema = new Schema({
    idUsers: [
        {
            type: Schema.Types.ObjectId,
            ref: "Users"
        }
    ],
    idChatRoom: {
        type: String,
        default: randomUUID()
    }
});

const ChatRoom = mongoose.model<ChatRoom>("ChatRoom", ChatRoomSchema);

export { ChatRoom };