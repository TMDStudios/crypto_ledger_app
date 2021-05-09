import { createStackNavigator } from "react-navigation-stack";
import Login from "../screens/login";
import Header from "../shared/header";
import React from "react";

const screens = {
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} title="Account" />,
      };
    },
  },
};
const AllPricesStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: "blue",
      height: 48,
    },
    headerTintColor: "white",
  },
});

export default AllPricesStack;
