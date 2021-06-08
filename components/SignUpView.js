import React, { useState, useEffect } from "react";
import { Alert, Platform, ToastAndroid } from "react-native";
import SignUp from "./core_components/SignUp";
//fb auth
import { auth } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { setIsSignedIn } from "../redux/appSlice";
import SignUpComponent from "./core_components/SignUp";

function SignUpView() {
  //redux
  const dispatch = useDispatch();

  //regex email & pwd & names
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const nameRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;

  //state hook for the switch component
  const [switchValue, setSwitchValue] = useState(false);
  //hooks for the form control
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //useEffect controls auth status
//   useEffect(() => {
//     console.log("auth use effect firing");
//     auth.onAuthStateChanged((user) => {
//       if (user) {
//         console.log(`User: ${user.email} is signed in`);
//         dispatch(setIsSignedIn(true));
//       } else {
//         console.log("No user is signed in at this time");
//         dispatch(setIsSignedIn(false));
//       }
//     });
//   }, []);

  //Sign in logic + fb api
  const handleSignUp = (email, password) => {
    //SIGN UP LOGIC GOES HERE!

    //////
  };

  //Submit SignUp button handler!
  const handleSubmit = () => {
    //SUBMIT LOGIC GOES HERE!
    //////
  };

  return (
    <SignUpComponent
      email={email}
      setEmail={setEmail}
      setPassword={setPassword}
      password={password}
      handleSubmit={handleSubmit}
      emailRegex={emailRegex}
      pwdRegex={pwdRegex}
      name={name}
      setName={setName}
      nameRegex={nameRegex}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
    />
  );
}

export default SignUpView;
