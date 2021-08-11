import React, { useState, useEffect } from "react";
import { Alert, Platform, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginComponent from "./core_components/Login";
//fb auth
import { auth } from "../firebase/firebase";

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
    //sign in login
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Platform.OS === "ios"
        ? Alert.alert(errorCode)
        : ToastAndroid.show(errorCode, ToastAndroid.LONG);
      console.log(` errCode: ${errorCode} & errMess: ${errorMessage}`);
    });
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

  //below 3 functions handle remember me logic
  //not being used at the moment
  const forgetMe = async () => {
    await AsyncStorage.clear().catch((err) => console.log(err));
  };
  /**
   *
   * @param {*} key Needed storing key
   * @param {*} valuesObj An object containing the data being saved
   */
  const rememberMe = async (key, valuesObj) => {
    await AsyncStorage.setItem(key, valuesObj, (err) => console.log(err));
  };

  //Submit login button handler!
  const handleSubmit = async () => {
    //checking to make sure all of the right information is being entered before submitting
    //else alerting user
    if (auth.currentUser !== null) {
      Alert.alert("You are already signed in!");
      return;
    } else if (
      emailRegex.test(email) &&
      pwdRegex.test(password) &&
      email !== "" &&
      password !== ""
    ) {
      handleSignIn(email, password);
      if (switchValue) {
        await rememberMe(
          "email",
          JSON.stringify({
            email: email,
            switch: switchValue,
          })
        ).catch((err) => console.log(err));
      } else await AsyncStorage.clear();
      setEmail("");
      setPassword("");
    } else {
      Alert.alert("Missing Login Information");
    }
  };
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
