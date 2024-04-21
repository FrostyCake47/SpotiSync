import React from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

function SignInButton(props: any) {
    require('dotenv').config()
    const {playlistInfo} = props;
    const client_ID = process.env.NEXT_PUBLIC_CLIENT_ID

    /*const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        console.log(response);
    };*/

    const responseGoogle = (response:any) => {
        if (response && response.tokenId) {
            console.log(response.tokenId);
        } else {
            console.log();
        }
    };

    
    const sendTokenToServer = async (idToken:String) => {
        try {
            if(playlistInfo){
                
                const response = await fetch('http://localhost:5000/api/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({idToken, playlistInfo}),
                });
                const result = await response.json();
                console.log(result.message);
            }
        } catch (error) {
            console.error('Error sending idToken to server:', error);
        }
    };

    return (
        client_ID && <GoogleLogin
            clientId={client_ID}
            buttonText="Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
}

export default SignInButton;