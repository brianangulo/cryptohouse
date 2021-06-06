import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import LoginComponent from "./core_components/Login";
//fb auth
import { auth } from "../firebase/firebase";

function LoginView() {
  //regex email & pwd
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  //state hook for the switch component
  const [switchValue, setSwitchValue] = useState(false);
  //hooks for the form control
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //useEffect for testing purposes only
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(`User: ${user.email} is signed in`);
      } else {
        console.log("No user is signed in at this time");
      }
    });
  }, []);

  //Sign in logic + fb api
  const handleSignIn = (email, password) => {
    //sign in login
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(` errCode: ${errorCode} & errMess: ${errorMessage}`);
    });
  };

  //Submit login button handler!
  const handleSubmit = () => {
     //checking to make sure all of the right information is being entered before submitting
     //else alerting user
     if (auth.currentUser !== null) {
        Alert.alert("You are already signed in!");
        return
     } else if (
      emailRegex.test(email) &&
      pwdRegex.test(password) &&
      email !== "" &&
      password !== ""
    ) {
      handleSignIn(email, password);
      setEmail("");
      setPassword("");
    } else {
      Alert.alert("Missing Login Information");
    }
  };

  return (
    <LoginComponent
      email={email}
      setEmail={setEmail}
      setPassword={setPassword}
      password={password}
      switchValue={switchValue}
      setSwitchValue={setSwitchValue}
      handleSubmit={handleSubmit}
    />
  );
}

export default LoginView;
