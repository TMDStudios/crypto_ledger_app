import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/home";
import CoinDetails from "../screens/coinDetails";
import Header from "../shared/header";
import React from "react";

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} title="Home" />,
      };
    },
  },
  CoinDetails: {
    screen: CoinDetails,
    navigationOptions: {
      title: "Coin Details",
    },
  },
};
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: "blue",
      height: 48,
    },
    headerTintColor: "white",
  },
});

export default HomeStack;
