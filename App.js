import React, { useState } from "react";
import {
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Header from "./components/header";
import Coin from "./components/coin";

export default function App() {
  const [name, setName] = useState("Bob");
  const [person, setPerson] = useState({ name: "Fred", age: 25 });
  const clickHandler = () => {
    setPerson({ name: "Tim", age: 42 });

    return fetch("https://crypto-ledger.herokuapp.com/api/get-prices/")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [coin, setCoin] = useState([
    {
      symbol: "btc",
      name: "Bitcoin",
      price: 56000,
      price1h: 10,
      price24h: 89,
      priceBTC: 1,
      priceETH: 20000,
      id: "1",
    },
    {
      symbol: "eth",
      name: "Ethereum",
      price: 2800,
      price1h: 6,
      price24h: 214,
      priceBTC: 0.002,
      priceETH: 1,
      id: "2",
    },
    {
      symbol: "xmr",
      name: "Monero",
      price: 420,
      price1h: 15,
      price24h: 71,
      priceBTC: 0.0001,
      priceETH: 0.01,
      id: "3",
    },
    {
      symbol: "xmr",
      name: "Monero4",
      price: 420,
      price1h: 15,
      price24h: 71,
      priceBTC: 0.0001,
      priceETH: 0.01,
      id: "4",
    },
    {
      symbol: "xmr",
      name: "Monero5",
      price: 420,
      price1h: 15,
      price24h: 71,
      priceBTC: 0.0001,
      priceETH: 0.01,
      id: "5",
    },
    {
      symbol: "xmr",
      name: "Monero6",
      price: 420,
      price1h: 15,
      price24h: 71,
      priceBTC: 0.0001,
      priceETH: 0.01,
      id: "6",
    },
    {
      symbol: "xmr",
      name: "Monero7",
      price: 420,
      price1h: 15,
      price24h: 71,
      priceBTC: 0.0001,
      priceETH: 0.01,
      id: "7",
    },
  ]);
  const pressHandler = (id) => {
    setCoin((prevCoin) => {
      return prevCoin.filter((coin) => coin.id != id);
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.body}>
        <Text>This is {name}</Text>
        <Text>
          His name is {person.name} and he is {person.age}
        </Text>
        <Text style={styles.header_text}>Enter name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type your name"
          onChangeText={(val) => setName(val)}
        />
        <Text>The status bar is: {StatusBar.currentHeight}</Text>

        <FlatList
          // numColumns={2}
          keyExtractor={(item) => item.id}
          data={coin}
          renderItem={({ item }) => <Coin item={item} pressHandler={pressHandler} />}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={clickHandler} title="Update" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  body: {
    backgroundColor: "gold",
    padding: 20,
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: "blue",
    padding: 20,
  },
  input: {
    backgroundColor: "silver",
    color: "white",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#777",
    paddingLeft: 8,
  },
});
