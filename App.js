import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import MainDrawer from './components/Navigator';
import store from "./redux/store";
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