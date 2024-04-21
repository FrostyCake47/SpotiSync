'use client';
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import jwt from 'jsonwebtoken'

const SignInButton = () => {
    const {data:session} = useSession();

    const getUserIdFromToken = (token: string) => {
        const decodedToken = jwt.decode(token);
        return decodedToken ? (decodedToken as { sub: string }).sub : null;
      };

    if(session && session.user){
        return (
            <div>
                <p>{session.user.name}</p>
                <p>{session.user.}</p>
                <button onClick={() => signOut()}>Sign Out</button>
            </div>
        )
    }

    return (
        <button onClick={() => signIn()}>Google</button>
    )

}
    
    

export default SignInButton