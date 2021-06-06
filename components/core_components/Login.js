import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, Input, Switch, Icon } from "react-native-elements";
import { moderateScale } from "react-native-size-matters";
//Animations library lottie
import LottieView from "lottie-react-native";
//importing animation asset
import animation from "../../assets/loginAsset.json";

function LoginComponent({
  email,
  setEmail,
  setPassword,
  password,
  switchValue,
  setSwitchValue,
  handleSubmit,
}) {
  //regex email & pwd
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title} h2>
          Sign In
        </Text>
        <Text style={styles.subTitle}>Welcome Back!</Text>
        <View style={styles.animationView}>
          <LottieView autoPlay loop source={animation} />
        </View>
      </View>
      <View style={styles.inputView}>
        <Input
          textContentType="emailAddress"
          label="Email"
          placeholder="email@email.com"
          leftIcon={<Icon name="email" size={21} color="black" />}
          value={email}
          onChangeText={setEmail}
          errorStyle={{ color: "red" }}
          errorMessage={
            //confusing ternary chaining usage so note to self:
            //checking to see if user has entered any input by looking at the value of the controlling variable
            email !== ""
              ? emailRegex.test(email)
                ? null
                : "Please enter a valid email!"
              : null
          }
        />
        <Input
          label="Password"
          placeholder="Password"
          textContentType="password"
          secureTextEntry
          leftIcon={<Icon name="lock" size={21} color="black" />}
          onChangeText={setPassword}
          value={password}
          errorStyle={{ color: "red" }}
          errorMessage={
            //confusing ternary chaining usage so note to self:
            //checking to see if user has entered any input by looking at the value of the controlling variable
            password !== ""
              ? pwdRegex.test(password)
                ? null
                : "8+ letters and numbers only with at least 1+ number, 1+ upper-case"
              : null
          }
        />
        <View style={styles.switchView}>
          <Switch
            style={styles.switch}
            value={switchValue}
            onValueChange={setSwitchValue}
          />
          <Text style={styles.rememberMe}>Remember me</Text>
          <Text
            onPress={() => console.log("forgot password pressed")}
            style={styles.forgotPwd}
          >
            Forgot Password
          </Text>
        </View>
      </View>
      <View style={styles.buttonView}>
        <Button
          containerStyle={styles.signInButton}
          title="Sign In"
          onPress={handleSubmit}
        />
        <View style={styles.signUpOfferView}>
          <Text style={styles.noAcctTxt}>
            Don't have an account?
            <Text style={styles.signUpTxt}> Sign Up</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: "5%",
  },
  titleView: {
    flex: 2.2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  inputView: {
    flex: 2,
  },
  switchView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  buttonView: {
    flex: 2,
  },
  title: {},
  subTitle: {
    color: "#86939e",
    marginVertical: 6,
  },
  switch: {
    transform: [
      { scaleX: moderateScale(0.6, 0.2) },
      { scaleY: moderateScale(0.6, 0.2) },
    ],
  },
  rememberMe: {
    textAlignVertical: "top",
    paddingVertical: 7,
    paddingHorizontal: 3,
    color: "#86939e",
  },
  forgotPwd: {
    color: "#86939e",
    textDecorationLine: "underline",
    paddingVertical: 7,
    marginHorizontal: 117,
  },
  signInButton: {
    alignSelf: "center",
    width: 160,
  },
  noAcctTxt: {
    color: "#86939e",
  },
  signUpTxt: {
    color: "purple",
  },
  signUpOfferView: {
    alignItems: "center",
    margin: 30,
  },
  animationView: {
    width: 100,
    height: 100,
  },
  animation: {},
});

export default LoginComponent;
