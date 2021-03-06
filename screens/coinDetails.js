import React from "react";
import { View, StyleSheet, Text, TextInput, Button, Alert } from "react-native";
import { useState, useEffect } from "react/cjs/react.development";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CoinDetails({ navigation }) {
  const [amt, setAmt] = useState(0);
  const [apiToken, setApiToken] = useState("");

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("apiToken");
      if (value !== null) {
        setApiToken(value);
      }
    } catch (e) {
      console.log("getData Issue: " + e);
    }
  };
  function buyCoin() {
    if (amt > 0.00000001) {
      if (navigation.getParam("current_price")) {
        fetch("https://crypto-ledger.herokuapp.com/api/buy-coin-api/" + apiToken, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: navigation.getParam("name"),
            amount: amt,
            custom_price: 0,
          }),
        });
      } else {
        fetch("https://crypto-ledger.herokuapp.com/api/buy-coin-api/" + apiToken, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: navigation.getParam("name") + " (" + navigation.getParam("symbol") + ")",
            amount: amt,
            custom_price: 0,
          }),
        });
      }
      Alert.alert("Coin added to ledger");
      fetch("https://crypto-ledger.herokuapp.com/view-prices/");
      setTimeout(() => {
        navigation.navigate("Home", { refreshVal: Math.random() });
      }, 500);
    } else {
      Alert.alert("Please enter a valid amount");
    }
  }
  function sellCoin() {
    console.log("COIN ID: " + navigation.getParam("id"));
    if (amt > 0.00000001 && amt <= parseFloat(navigation.getParam("total_amount"))) {
      fetch("https://crypto-ledger.herokuapp.com/api/sell-coin-api/" + apiToken, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coin_id: navigation.getParam("id"),
          amount: amt,
        }),
      });
      Alert.alert("Coin sold");
      setTimeout(() => {
        navigation.navigate("Home", { refreshVal: Math.random() });
      }, 500);
    } else {
      Alert.alert("Please enter a valid amount");
    }
  }

  useEffect(() => {
    getData();
    console.log(apiToken);
  }, [apiToken]);

  if (navigation.getParam("current_price")) {
    return (
      <View style={styles.container}>
        <View style={styles.viewBox}>
          <View style={styles.viewContent}>
            <Text style={styles.text}>Coin Details:</Text>
            <Text style={styles.text}>Coin: {navigation.getParam("name")}</Text>
            <Text style={styles.text}>Price: ${navigation.getParam("current_price")}</Text>
            <Text style={styles.text}>Amount: {navigation.getParam("total_amount")}</Text>
            <Text style={styles.text}>VAL: {amt}</Text>
          </View>
        </View>
        <View style={styles.viewContent}>
          <TextInput
            style={styles.input}
            placeholder="Amount"
            onChangeText={(val) => setAmt(val)}
          />
        </View>
        <View style={styles.viewContent}>
          <Button title="Buy" onPress={buyCoin} />
        </View>
        <View style={styles.viewContent}>
          <Button title="Sell" onPress={sellCoin} />
        </View>
      </View>
    );
  } else {
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
          <TextInput
            style={styles.input}
            placeholder="Amount"
            onChangeText={(val) => setAmt(val)}
          />
        </View>
        <View style={styles.viewContent}>
          <Button title="Buy" onPress={buyCoin} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
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
    margin: 10,
  },
  input: {
    margin: 10,
    color: "white",
    backgroundColor: "silver",
    borderWidth: 2,
    borderColor: "white",
    paddingLeft: 10,
    borderRadius: 8,
  },
});
