'use client';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const SignInButton = (props: {playlistInfo : any}) => {
  const {playlistInfo} = props;

  const login = useGoogleLogin({
    onSuccess: codeResponse => 
      {
        console.log(codeResponse);
        sendLogin(codeResponse.code, playlistInfo);
      },
    flow: 'auth-code',
  });

  const sendLogin = async (idToken:String, playlistInfo:any) => {
    try {
      const response = await axios.post('http://localhost:5000/login', {idToken, playlistInfo});
      console.log('Response:', response.data.message);
      // Handle response data or update UI as needed
    } catch (error) {
      console.error('Error sending idToken to server:', error);
      // Handle error or display error message
    }
  }

  

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