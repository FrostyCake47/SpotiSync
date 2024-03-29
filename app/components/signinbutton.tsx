import React from 'react';
import { GoogleLogin } from 'react-google-login';

function SignInButton(props: {playlistInfo:any}) {
    require('dotenv').config()
    const {playlistInfo} = props;
    const client_ID = process.env.REACT_APP_CLIENT_ID;

    const responseGoogle = (response:any) => {
        const idToken = response.tokenId;
        // Send idToken to Flask backend for further processing
        sendTokenToServer(idToken);
    };
    console.log("clientID: " + client_ID);

    const sendTokenToServer = async (idToken:String) => {
        try {
            if(playlistInfo){
                console.log("idtoken: " + idToken);
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
            buttonText="Sign In with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
}

export default SignInButton;