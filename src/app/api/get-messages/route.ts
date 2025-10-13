import { jsonRes } from "@/lib/JSONresponse";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/models/User";
import mongoose from "mongoose";

export async function GET(req: Request) {
    await dbConnect();
        
        const session = await getServerSession(authOptions)
        const user: User = session?.user as User

        if (!session?.user) {
            return jsonRes(false, "User is not authenticated", 400)
        }
        if (!session || !session.user) {
            return jsonRes(false, "User not logged in", 400);
        }

        const userId = new mongoose.Types.ObjectId(user._id);

        try {
            const user = await UserModel.aggregate([
                { $match: { id: userId } },
                { $unwind: "$messages" },
                { $sort: { 'messages.createdAt': -1 } },
                {
                    $group: {
                        _id: "$_id",
                        userId: { $first: "$userId" },
                        messages: { $push: "$messages" } // Rebuild messages array sorted
                    }
                }

            ]).exec()

            if(!user || user.length === 0){
                return jsonRes(false, "No aggregated user found",404);
            }

            return jsonRes(true, "messages retrieved successfully", 200, {messages: user[0].messages})



        } catch (error) {
            console.log("Error sending messages ",error)
            return jsonRes(false, "Error Getting messages from server", 500)
        }
}