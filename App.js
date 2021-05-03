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
  ScrollView,
} from "react-native";

export default function App() {
  const [name, setName] = useState("Bob");
  const [person, setPerson] = useState({ name: "Fred", age: 25 });
  const clickHandler = () => {
    setPerson({ name: "Tim", age: 42 });
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
      key: "1",
    },
    {
      symbol: "eth",
      name: "Ethereum",
      price: 2800,
      price1h: 6,
      price24h: 214,
      priceBTC: 0.002,
      priceETH: 1,
      key: "2",
    },
    {
      symbol: "xmr",
      name: "Monero",
      price: 420,
      price1h: 15,
      price24h: 71,
      priceBTC: 0.0001,
      priceETH: 0.01,
      key: "3",
    },
    {
      symbol: "xmr",
      name: "Monero4",
      price: 420,
      price1h: 15,
      price24h: 71,
      priceBTC: 0.0001,
      priceETH: 0.01,
      key: "4",
    },
    {
      symbol: "xmr",
      name: "Monero5",
      price: 420,
      price1h: 15,
      price24h: 71,
      priceBTC: 0.0001,
      priceETH: 0.01,
      key: "5",
    },
    {
      symbol: "xmr",
      name: "Monero6",
      price: 420,
      price1h: 15,
      price24h: 71,
      priceBTC: 0.0001,
      priceETH: 0.01,
      key: "6",
    },
    {
      symbol: "xmr",
      name: "Monero7",
      price: 420,
      price1h: 15,
      price24h: 71,
      priceBTC: 0.0001,
      priceETH: 0.01,
      key: "7",
    },
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_text}>Crypto Ledger App</Text>
      </View>
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
        <ScrollView>
          {coin.map((item) => {
            return (
              <View key={item.key}>
                <Text style={styles.list_head}>
                  {item.name} - {item.price}
                </Text>
                <Text style={styles.list_body}>
                  {item.price1h} - {item.price24h}
                </Text>
                <Text style={styles.list_body}>
                  {item.priceBTC} - {item.priceETH}
                </Text>
              </View>
            );
          })}
        </ScrollView>
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
    borderColor: "#777",
    paddingLeft: 8,
  },
  list_head: {
    paddingTop: 50,
    color: "blue",
    fontWeight: "bold",
  },
  list_body: {
    color: "white",
  },
});
