import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import MainDrawer from './src/navigators/Navigator';
import store from './src/redux/store';
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainDrawer />
      </NavigationContainer>
    </Provider>
  );
}