import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt: Date;
}

export interface User extends Document{
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean,
    isAcceptingMessages: boolean,
    messages: Message[],
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    }
})

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "User Name is required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        match: [/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
    },
    verifyCode: {
        type: String,
        minLength: 5,
    },
    verifyCodeExpiry: {
        type: Date,
        required: true,
        default: Date.now(),

    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema);

export default UserModel;