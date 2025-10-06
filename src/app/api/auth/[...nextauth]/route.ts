import NextAuth from "next-auth";
import { authOptions } from "./options";

const handler = NextAuth(authOptions)

export {handler as GET , handler as POST}

//NextAuth will handle NextAuthOptions like here. and the handling should be exported as GEt and POST for http requests.