import React from "react";
import { View, StyleSheet, StatusBar, Text, TextInput, Button } from "react-native";
import { useState } from "react/cjs/react.development";

export default function CoinDetails({ navigation }) {
  const [amt, setAmt] = useState(0);
  function buyCoin() {
    fetch(
      "https://crypto-ledger.herokuapp.com/api/get-user-ledger/b08d0d5bc719b6b027fd2f9c4332d3ece9f868eb",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: navigation.getParam("name") + " (" + navigation.getParam("symbol") + ")",
          amount: amt,
          custom_price: navigation.getParam("price"),
        }),
      }
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.viewBox}>
        <View style={styles.viewContent}>
          <Text style={styles.text}>Coin Details:</Text>
          <Text style={styles.text}>Coin: {navigation.getParam("name")}</Text>
          <Text style={styles.text}>Price: ${navigation.getParam("price")}</Text>
          <Text style={styles.text}>Price change 1h: ${navigation.getParam("price_1h")}</Text>
          <Text style={styles.text}>VAL: {amt}</Text>
        </View>
      </View>
      <View style={styles.viewContent}>
        <TextInput style={styles.input} placeholder="Amount" onChangeText={(val) => setAmt(val)} />
      </View>
      <View style={styles.viewContent}>
        <Button title="Buy" onPress={buyCoin} />
      </View>
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
    padding: 20,
    paddingBottom: 5,
    paddingTop: 5,
    flex: 1,
  },
  text: {
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
  input: {
    margin: 20,
    color: "white",
    backgroundColor: "silver",
    borderWidth: 2,
    borderColor: "white",
    paddingLeft: 10,
    borderRadius: 8,
  },
});
