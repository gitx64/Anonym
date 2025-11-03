import {z} from "zod";

export const userNameValidation = z.string()
    .min(3,"must be atleast 3 characters")
    .max(20, "No more than 20 characters")
    .regex(/^[a-zA-Z0-9]+$/, "UserName must not contain special characters")


export const signUpSchema = z.object({
    username: userNameValidation,
    email: z.email({message: "invalid Email Address"}),
    password: z.string().min(6,{message: "must be atleast 6 characters"})
})