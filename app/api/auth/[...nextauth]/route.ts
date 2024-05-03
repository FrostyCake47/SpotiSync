import axios from "axios";
import { Account, Profile, Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import Spotify from "next-auth/providers/spotify";


const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? "id",
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET ?? "secret"
            
        }),

        Spotify({
            clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?? '',
            clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_SECRET ?? "",
            authorization: {params: {scope: "playlist-read-private"}},
            
        },)
    ],

    callbacks: {
      async jwt({token, account}) {
        if (account) {
          token = Object.assign({}, token, { access_token: account.access_token });
        }
        return token
      },
      async session({session, token}) {
        if(session) {
          session = Object.assign({}, session, {access_token: token.access_token})
          console.log(session);
        }
        return session
      }
    },

    secret: process.env.NEXT_PUBLIC_JWT_SECRET
      
});

export {handler as GET, handler as POST};

async function fetchUserPlaylists(accessToken:string) {
    try {
      const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const playlists = response.data.items.map((playlist:any) => playlist.external_urls.spotify);
      return playlists;
    } catch (error) {
      console.error('Error fetching playlists:', error);
      return [];
    }
  }