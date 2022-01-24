import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginComponent from "./Login";

function LoginView({ navigation }) {
  //regex email & pwd
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  //state hook for the switch component
  const [switchValue, setSwitchValue] = useState(false);
  //hooks for the form control
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Sign in logic + fb api
  const handleSignIn = (email, password) => {
    // handle sign in function
  };

  //checking async storage for a remember me value and setting the state based on it
  useEffect(() => {
    const didYouRememberMe = async () => {
      await AsyncStorage.getItem("email", (err, storedStuff) => {
        const parsedStuff = JSON.parse(storedStuff);
        console.log(parsedStuff);
        if (storedStuff !== null) {
          setEmail(parsedStuff.email);
          setSwitchValue(parsedStuff.switch);
        }
      });
    };
    didYouRememberMe();
  }, []);

  const handleSubmit = () => {};

  /**
   * This function will handle the switch changing on the login screen
   */
  const handleSwitchChange = async (value) => {
    setSwitchValue(value);
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
      emailRegex={emailRegex}
      pwdRegex={pwdRegex}
      navigation={navigation}
      handleSwitchChange={handleSwitchChange}
    />
  );
}

export default LoginView;
