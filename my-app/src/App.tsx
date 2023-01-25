// import { useGoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from "react";
import "./App.css";
import { IAuthProvider } from './types/types';
import { GoogleExternalLoginAsync } from './axios/UserController';



const App = () => {

  const handleLoginSuccess = (res: any) => {
    console.log("Login google result", res);
    const { credential } = res;
    console.log("Token Id", credential);
    GoogleExternalLoginAsync(credential, 'Google')
  }
    ;

  useEffect(() => {
    const clientId =
      "1009097235289-i5b2slokukn2qi1thsphkrqvj9d487r4.apps.googleusercontent.com";
    window.google.accounts!.id.initialize({
      client_id: clientId,
      callback: handleLoginSuccess,
    });

    window.google.accounts!.id.renderButton(document.getElementById("loginGoogleBtn"),
      { theme: "outline", size: "Large" });

  }, []);

  return (
    <>
      <h1>Login google</h1>
      <div id="loginGoogleBtn"></div>
    </>
  );
};

export default App;
