import React from 'react';
import { GoogleLogin } from 'react-google-login';

function SignInButton() {
    const responseGoogle = (response:any) => {
        const idToken = response.tokenId;
        // Send idToken to Flask backend for further processing
        sendTokenToServer(idToken);
    };

    const sendTokenToServer = async (idToken:String) => {
        try {
            const response = await fetch('/api/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idToken }),
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error sending idToken to server:', error);
        }
    };

    return (
        <GoogleLogin
            clientId="YOUR_GOOGLE_CLIENT_ID"
            buttonText="Sign In with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
}

export default SignInButton;