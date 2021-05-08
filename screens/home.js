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
import OwnedCoin from "../components/ownedCoin";
import priceData from "../data/priceData";
import { globalStyles } from "../styles/global";

export default function Home({ navigation }) {
  const clickHandler = () => {
    fetch("https://crypto-ledger.herokuapp.com/view-prices/");
    return fetch(
      "https://crypto-ledger.herokuapp.com/api/get-user-ledger/b08d0d5bc719b6b027fd2f9c4332d3ece9f868eb"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setCoin([]);
        for (var i = 0; i < responseJson.length; i++) {
          setCoin((prevCoins) => {
            return [
              {
                name: responseJson[i].name,
                total_amount: responseJson[i].total_amount,
                current_price: responseJson[i].current_price,
                price_difference: responseJson[i].price_difference,
                total_profit: responseJson[i].total_profit,
                total_value: responseJson[i].total_value,
                id: responseJson[i].id,
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
  const [ownedCoin, setCoin] = useState();
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
          data={ownedCoin}
          renderItem={({ item }) => <OwnedCoin item={item} pressHandler={pressHandler} />}
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
