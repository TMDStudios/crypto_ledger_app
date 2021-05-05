import React from "react";
import { View, StyleSheet, StatusBar, Text } from "react-native";

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  body: {
    backgroundColor: "#222",
    padding: 20,
    paddingBottom: 5,
    paddingTop: 5,
    flex: 1,
  },
  text: {
    color: "cyan",
    margin: 32,
  },
});
