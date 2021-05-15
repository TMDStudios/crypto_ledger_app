import React, { useState } from "react";
import {
  Text,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Coin from "../components/coin";
import priceData from "../data/priceData";
import { globalStyles } from "../styles/global";

export default function AllPrices({ navigation }) {
  const clickHandler = () => {
    fetch("https://crypto-ledger.herokuapp.com/view-prices/");
    return fetch("https://crypto-ledger.herokuapp.com/api/get-prices/")
      .then((response) => response.json())
      .then((responseJson) => {
        setCoin([]);
        for (var i = 0; i < responseJson.length; i++) {
          setCoin((prevCoins) => {
            return [
              {
                symbol: responseJson[i].symbol,
                name: responseJson[i].name,
                price: responseJson[i].price,
                price_1h: responseJson[i].price_1h,
                price_24h: responseJson[i].price_24h,
                price_btc: responseJson[i].price_btc,
                price_eth: responseJson[i].price_eth,
                id: responseJson[i].id,
                // color: price_1h > 0 ? "green" : "red",
              },
              ...prevCoins,
            ];
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [coin, setCoin] = useState(priceData.Prices);
  const pressHandler = (item) => {
    navigation.navigate("CoinDetails", item);
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <Header /> */}
      <View style={styles.body}>
        <FlatList
          // numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          data={coin}
          renderItem={({ item }) => <Coin item={item} pressHandler={pressHandler} />}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={globalStyles.button} onPress={clickHandler}>
          <Text style={globalStyles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    padding: 5,
    paddingBottom: 5,
    paddingTop: 5,
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: "blue",
    padding: 8,
  },
});
