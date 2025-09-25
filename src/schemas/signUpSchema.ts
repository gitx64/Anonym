import {z} from "zod";

export const userNameValidation = z.string()
    .min(3,"First name must be 3 characters")
    .max(20, "No more than 20 characters")
    .regex(/[a-zA-Z][a-zA-Z0-9-_]{3,32}/gi, "UserName must not contain special characters")


export const signUpSchema = z.object({
    username: userNameValidation,
    email: z.email({message: "Invalid Email Address"}),
    password: z.string().min(6,{message: "Should be minimum 6 characters"})
})