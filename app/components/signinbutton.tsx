'use client';
import { useGoogleLogin } from '@react-oauth/google';

const SignInButton = (props: {playlistInfo : any}) => {
  const {playlistInfo} = props;

  const login = useGoogleLogin({
    onSuccess: codeResponse => 
      {
        console.log(codeResponse);
        sendTokenToServer(codeResponse.code, playlistInfo);
      },
    flow: 'auth-code',
  });

  

  const sendTokenToServer = async (idToken:String, playlistInfo:any) => {
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

  return <button onClick={() => login()}>Youtube Login</button>

}
    
    

export default SignInButton