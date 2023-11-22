import NextAuth, { AuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import prisma from "@/libs/prismaClientGlobal"


 const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId:"1161980821679378492",
      clientSecret:"UMOO6lhWDg0C3wLD2YZBuqhUCT9Q54dY",
    }),
  ],
} as AuthOptions

const handler = NextAuth(authOptions)
export {handler as GET  , handler as POST};