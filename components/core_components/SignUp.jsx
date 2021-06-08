import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Text, Button, Input, Switch, Icon } from "react-native-elements";
import { moderateScale } from "react-native-size-matters";
//Animations library lottie
import LottieView from "lottie-react-native";
//importing animation asset
import animation from "../../assets/loginAsset.json";

function SignUpComponent({
  email,
  setEmail,
  setPassword,
  password,
  handleSubmit,
  emailRegex,
  pwdRegex,
  name,
  setName,
  nameRegex,
  confirmPassword,
  setConfirmPassword,
}) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title} h2>
            Sign Up
          </Text>
          <Text style={styles.subTitle}>Excited to have you join us!</Text>
          <View style={styles.animationView}>
            <LottieView autoPlay loop source={animation} />
          </View>
        </View>
        <View style={styles.inputView}>
          <Input
            textContentType="username"
            label="Username"
            placeholder="e.g johnnyDoe"
            leftIcon={<Icon name="person" size={21} color="black" />}
            value={name}
            onChangeText={setName}
            errorStyle={{ color: "red" }}
            errorMessage={
              //confusing ternary chaining usage so note to self:
              //checking to see if user has entered any input by looking at the value of the controlling variable
              name !== ""
                ? nameRegex.test(name)
                  ? null
                  : "Please enter a valid name!"
                : null
            
            }
          />
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
          <Input
            label="Confirm Password"
            placeholder="Confirm Password"
            textContentType="password"
            secureTextEntry
            leftIcon={<Icon name="lock" size={21} color="black" />}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            errorStyle={{ color: "red" }}
            errorMessage={
              //confusing ternary chaining usage so note to self:
              //Checks forst to see if confirmpassowrd is not empty then it checks to see if password is not empty
              //then it goes ahead to check if password is regex compliant if it is then it will check to see if confirmpassword equals password
              //if it doesnt then it will display password must match error
              confirmPassword !== ""
                ? password !== ""
                  ? pwdRegex.test(password)
                    ? confirmPassword === password
                      ? null
                      : "Passwords must match"
                    : null
                  : null
                : null
            }
          />
        </View>
        <View style={styles.buttonView}>
          <Button
            containerStyle={styles.signInButton}
            title="Sign Up"
            onPress={handleSubmit}
          />
          <View style={styles.signUpOfferView}>
            <Text style={styles.noAcctTxt}>
              Already have an account?
              <Text style={styles.signUpTxt}> Sign In</Text>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
    flex: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 25,
  },
  inputView: {
    flex: 4,
    marginVertical: 20,
  },
  buttonView: {
    flex: 1.5,
    marginVertical: 30,
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

export default SignUpComponent;
