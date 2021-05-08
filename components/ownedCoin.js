import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function OwnedCoin({ item, pressHandler }) {
  return (
    <TouchableOpacity style={styles.viewBox} onPress={() => pressHandler(item)}>
      <View style={styles.viewContent}>
        <Text style={styles.listHead}>{item.name}</Text>
        <Text style={styles.listBody}>Current Price: ${item.current_price.slice(0, -6)}</Text>
        <Text style={styles.listBody}>Amount: {item.total_amount}</Text>
        <Text style={styles.listBody}>Value: ${item.total_value}</Text>
        <Text style={styles.listBody}>
          Trend: %
          {item.price_difference
            .toString()
            .slice(0, item.price_difference.toString().indexOf(".") + 3)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listHead: {
    color: "silver",
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 5,
  },
  listBody: {
    color: "white",
  },
  viewBox: {
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: "#333",
    margin: 15,
    marginTop: 5,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "cyan",
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  viewContent: {
    margin: 15,
  },
});
