import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { userNameValidation } from "@/schemas/signUpSchema";
import {success, z} from "zod";

const usernameQuerySchema = z.object({
    username: userNameValidation
})

export async function GET(request: Request){
    await dbConnect();
    try {
        const {searchParams} = new URL(request.url);
        const queryParam = {
            username: searchParams.get("username")
        }

        //validate with zod
        const result = usernameQuerySchema.safeParse(queryParam)
        console.log(result); //TODO: remove

        if(!result.success){
            const usernameError = result.error.format().username?._errors || []

            return Response.json({
                success: false,
                message: usernameError.length > 0 ? usernameError.join(", ") : "Invalid Query parameters",
            }, {status: 400})
        }

        const {username} = result.data

       const existingVerifiedUser = await UserModel.findOne({username, isVerified: true})

       if(existingVerifiedUser){
         return Response.json({
            success: false,
            message: "Username is already taken"
         },{status: 500})
       }
       
    } catch (error) {
        console.error("Error Checking username uniqueness ",error);
        return Response.json({
            success: false,
            message: "Error Checking username"
        }, {status: 500})
    }
}