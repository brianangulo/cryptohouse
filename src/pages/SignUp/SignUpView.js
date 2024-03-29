import React, { useState } from "react";
import SignUpComponent from "./SignUp";

function SignUpView({navigation}) {

  //regex email & pwd & names
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const nameRegex = /[a-zA-Z0-9!@#$&()\\-`.+,/\"\-\_]{2,20}$/;

  //hooks for the form control
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //Sign up logic + fb api
  const handleSignUp = (email, password, username) => {
  };

  //Submit SignUp button handler!
  const handleSubmit = () => {
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
      navigation={navigation}
    />
  );
}

export default SignUpView;
