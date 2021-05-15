import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Coin({ item, pressHandler }) {
  const getColor = () => {
    if (item.price_1h > 0) {
      return styles.greenBorder;
    } else if (item.price_1h < 0) {
      return styles.redBorder;
    } else {
      return styles.whiteBorder;
    }
  };
  return (
    <TouchableOpacity style={[styles.viewBox, getColor()]} onPress={() => pressHandler(item)}>
      <View style={styles.viewContent}>
        <Text style={styles.listHead}>
          {item.name} ({item.symbol})
        </Text>
        <Text style={styles.listBody}>Current Price: ${item.price.slice(0, -6)}</Text>
        <Text style={styles.listBody}>
          Price change (1 hour): $
          {item.price_1h.toString().slice(0, item.price_1h.toString().indexOf(".") + 3)}
        </Text>
        <Text style={styles.listBody}>
          Price change (24 hours): $
          {item.price_24h.toString().slice(0, item.price_24h.toString().indexOf(".") + 3)}
        </Text>
        <Text style={styles.listBody}>
          {item.price_btc} | {item.price_eth}
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
  redBorder: {
    borderColor: "red",
  },
  greenBorder: {
    borderColor: "green",
  },
  whiteBorder: {
    borderColor: "white",
  },
});
