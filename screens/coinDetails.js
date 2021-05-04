import React from "react";
import { View, StyleSheet } from "react-native";

export default function CoinDetails() {
  return (
    <View style={styles.container}>
      <Text>Coin Details</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
