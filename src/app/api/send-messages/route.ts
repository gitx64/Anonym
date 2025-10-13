import dbConnect from "@/lib/dbConnect";
import UserModel, { Message } from "@/models/User";
import { jsonRes } from "@/lib/JSONresponse";

export async function POST(req: Request){
    await dbConnect();
    const {username,content} = await req.json();
    try {
        const user = await UserModel.findOne({username})

        if(!user)
            return jsonRes(false, "User not found while sending message",404);
        if(!user?.isAcceptingMessages)
            return jsonRes(false, "User not accepting messages",403);
        
        const newMessage = {content, createdAt: new Date()} as Message

        user.messages.push(newMessage)

        await user.save()

        return jsonRes(true, "Message sent successfully",200)

        
    } catch (error) {
        console.log("Error sending messages ",error);
        return jsonRes(false, "Error sending message for internal server error", 500);
    }
}