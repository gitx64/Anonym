import {z} from "zod";

export const signInVerification = z.object({
    identifier: z.string(),
    password: z.string(),
})

