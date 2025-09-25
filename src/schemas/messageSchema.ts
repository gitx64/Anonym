import {z} from "zod";

export const messageSchema = z.object({
    id: z.string(),
    content: z.string()
        .min(10, "Content must contain atleast 10 characters")
        .max(300, "Content must not be longer than 300 characters")

})

