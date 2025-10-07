import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import {success, z} from "zod";
import { userNameValidation } from "@/schemas/signUpSchema";
import { url } from "zod/mini";

const usernameQuerySchema = z.object({
    username: userNameValidation,
})

export async function GET(request: Request){
    //TODO: for every request files
    // console.log(`Recieved request with method: ${request.method}`);
    // if(request.method !== "GET"){
    //     return Response.json({
    //         success: false,
    //         message: "Method not allowed"
    //     }, {status: 405})
    // }  for pages router

    await dbConnect()

    try {
        //query checking
        const {searchParams} = new URL(request.url)
        const queryParam = {
            username: searchParams.get("username"),
        }
        const result = usernameQuerySchema.safeParse(queryParam)

        console.log(result) //TODO: remove

        if (!result.success) {
            const usernameError = result.error.format().username?._errors || []
            return Response.json({
                success: false,
                message: usernameError.length > 0 ? usernameError.join(", ") : "Invalid query parameter"
            },{status: 400})
        }

        const {username} = result.data

        const existingVerifiedUser = await UserModel.findOne({username, isVerified: true})

        if (existingVerifiedUser) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            }, {status: 400})
        } // in this code it is possible that lets say the user has taken the username already but not verfied ,but in the mean time another unverfied user is trying to take the same username of the previous one. so as per the code this user CAN take that previous ones username cause he is still unverfied. 

        return Response.json({
                success: true,
                message: "Username is available"
            }, {status: 202})
        
    } catch (error) {
        console.error({message: "Error checking username ", error})
        return Response.json({
            success: false,
            message: "Error Checking Username",
        },
        {status: 500}
    )
    }
}