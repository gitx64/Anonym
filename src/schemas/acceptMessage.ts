import {z} from "zod";

export const acceptMessage = z.object({
    isAcceptingMessages: z.boolean()
})

