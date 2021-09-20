import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Icon, Avatar } from "react-native-elements";
import { auth } from "../firebase/firebase";
import Contact from "../pages/Contact/ContactView";
import Feed from "../pages/Feed/FeedView";
import LoginView from "../pages/Login/LoginView";
import TickersView from "../pages/Tickers/TickersView";
import SignUpView from "../pages/SignUp/SignUpView";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView style={styles.container}>
        <View style={styles.drawerHeader}>
          <View style={{ flex: 1 }}>
            <Avatar rounded icon={{ name: "computer", size: 30 }} />
          </View>
          <View style={{ flex: 2 }}>
            {/* below text component will use ternary to check if the signed user has a name and return it otherwise will return cryptohouse */}
            <Text style={styles.headerName}>{auth.currentUser.displayName !== null ? auth.currentUser.displayName : "CryptoHouse"}</Text>
          </View>
        </View>
      </SafeAreaView>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sign Out"
        onPress={() => {
          if (auth.currentUser !== null) {
            auth
              .signOut()
              .then(() => {
                console.log("user signed out");
              })
              .catch((err) => {
                console.log(`Found Error ${err}`);
              });
          } else {
            console.log("unable to sign out: no user signed in");
          }
        }}
      />
    </DrawerContentScrollView>
  );
}
//login stack contains both login and sign up ones
const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginView}
        options={{
          headerTitleStyle: {
            color: "#ffffff",
          },
          headerStyle: {
            backgroundColor: "#2459E0",
          },
          headerTintColor: "#ffffff",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUpView}
        options={{
          headerTitleStyle: {
            color: "#ffffff",
          },
          headerTintColor: "#ffffff",
          headerStyle: {
            backgroundColor: "#2459E0",
          },
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

const ContactStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Message Us"
        component={Contact}
        options={{
          headerTitleStyle: {
            color: "#ffffff",
          },
          headerStyle: {
            backgroundColor: "#2459E0",
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <Icon
              name="bars"
              type="font-awesome-5"
              color="#ffffff"
              iconStyle={{ padding: 15 }}
              onPress={() => {
                navigation.openDrawer();
                console.log("Drawer menu icon was clicked");
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const FeedStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NewsFeed"
        component={Feed}
        options={{
          headerTitleStyle: {
            color: "#ffffff",
          },
          headerStyle: {
            backgroundColor: "#2459E0",
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <Icon
              name="bars"
              type="font-awesome-5"
              color="#ffffff"
              iconStyle={{ padding: 15 }}
              onPress={() => {
                navigation.openDrawer();
                console.log("Drawer menu icon was clicked");
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const TickersStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Crypto's Feed"
        component={TickersView}
        options={{
          headerTitleStyle: {
            color: "#ffffff",
          },
          headerStyle: {
            backgroundColor: "#2459E0",
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <Icon
              name="bars"
              type="font-awesome-5"
              color="#ffffff"
              iconStyle={{ padding: 15 }}
              onPress={() => {
                navigation.openDrawer();
                console.log("Drawer menu icon was clicked");
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const MainDrawer = () => {
  const isSignedIn = useSelector((state) => state.app.isSignedIn);
   if(!isSignedIn) {
     console.log("if fired");
    return (
      <LoginStack />
    );

   } else {
     console.log("else fired");
     return (
       <Drawer.Navigator
         drawerContent={(props) => <CustomDrawerContent {...props} />}
       >
         <Drawer.Screen name="Tickers" component={TickersStack} />
         <Drawer.Screen name="NewsFeed" component={FeedStack} />
         <Drawer.Screen name="Message Us" component={ContactStack} />
       </Drawer.Navigator>
     );
   } 
};

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: "#2459E0",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  container: {
    flex: 1,
  },
  headerName: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#ffffff",
  },
});

export default MainDrawer;
