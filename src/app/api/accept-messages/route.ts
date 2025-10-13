import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { User } from "next-auth";
import { success } from "zod";
import { jsonRes } from "@/lib/JSONresponse";

export async function POST(req: Request) {

    await dbConnect();

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User
    
    if (!session?.user) {
        return jsonRes(false, "User is not authenticated", 400)
    }
    if (!session || !session.user) {
        return jsonRes(false, "User not logged in", 400);
    }

    const userId = user?._id
    const { acceptMessages } = await req.json()

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, { isAcceptingMessages: acceptMessages }, { new: true }) //new: true for getting new updated values.

        if (!updatedUser)
            return jsonRes(false, "Failed to update user status", 500)
        else
            return jsonRes(true, "Message acceptance status updated successfully", 202, updatedUser)


    } catch (error) {
        console.log("Failed to update status to accept messages");
        return jsonRes(false, "Not Authenticated", 400)

    }

}

export async function GET(req: Request) {
    try {
        await dbConnect();

        const session = await getServerSession(authOptions)
        const user: User = session?.user as User

        if (!session?.user) {
            return jsonRes(false, "User is not authenticated", 400)
        }
        if (!session || !session.user) {
            return jsonRes(false, "User not logged in", 400);
        }

        const userId = user?._id

        const foundUser = await UserModel.findById(userId)

        if (!foundUser)
            return jsonRes(false, "Failed to update user status", 500)

        return jsonRes(true, "Fetched user message status", 200, { isAcceptingMessages: foundUser?.isAcceptingMessages })

    } catch (error) {
        console.log("Failed to update user status to accept messages");
        
        return jsonRes(false,"Failed to update user status to accept messages",500)
    }

}