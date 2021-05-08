import { createStackNavigator } from "react-navigation-stack";
import AllPrices from "../screens/allPrices";
import { StatusBar } from "react-native";
import Header from "../shared/header";
import React from "react";

const screens = {
  AllPrices: {
    screen: AllPrices,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} title="View Prices" />,
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
