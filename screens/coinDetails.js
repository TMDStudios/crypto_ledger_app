import React from "react";
import { View, StyleSheet, StatusBar, Text } from "react-native";

export default function CoinDetails({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text>Coin Details:</Text>
        <Text>Coin: {navigation.getParam("name")}</Text>
        <Text>Price: ${navigation.getParam("price")}</Text>
        <Text>Price change 1h: ${navigation.getParam("price_1h")}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  body: {
    padding: 20,
    paddingBottom: 5,
    paddingTop: 5,
    flex: 1,
  },
});
