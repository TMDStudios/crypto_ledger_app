import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.header_text}>Crypto Ledger App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "blue",
    padding: 20,
    height: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  header_text: {
    fontWeight: "bold",
    color: "white",
  },
});
