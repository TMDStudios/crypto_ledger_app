import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Coin({ item, pressHandler }) {
  return (
    <TouchableOpacity style={styles.viewBox} onPress={() => pressHandler(item.id)}>
      <View style={styles.viewContent}>
        <Text style={styles.list_head}>
          {item.name} | {item.price}
        </Text>
        <Text style={styles.list_body}>
          {item.price_1h} | {item.price_24h}
        </Text>
        <Text style={styles.list_body}>
          {item.price_btc} | {item.price_eth}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  list_head: {
    color: "silver",
    fontWeight: "bold",
  },
  list_body: {
    color: "white",
  },
  viewBox: {
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: "blue",
    marginBottom: 10,
    borderRadius: 10,
  },
  viewContent: {
    margin: 20,
  },
});
