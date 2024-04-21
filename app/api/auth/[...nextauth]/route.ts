import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? "id",
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET ?? "secret"
            
        })
    ]
});

export {handler as GET, handler as POST};