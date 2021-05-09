import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import OwnedCoin from "../components/ownedCoin";
import { globalStyles } from "../styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation }) {
  const [apiToken, setApiToken] = useState("");

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("apiToken");
      if (value !== null) {
        setApiToken(value);
        getLedger(value);
      }
    } catch (e) {
      console.log("getData Issue: " + e);
    }
  };

  const getLedger = async (myToken) => {
    try {
      fetch("https://crypto-ledger.herokuapp.com/view-prices/");
      const data = await fetch(
        "https://crypto-ledger.herokuapp.com/api/get-user-ledger/" + myToken
      );
      const dataJSON = await data.json();
      await updateLedger(dataJSON);
    } catch (e) {
      console.log("updateLedger Issue: " + e);
    }
  };

  const updateLedger = async (dataJSON) => {
    setCoin([]);
    console.log("ledger UPDATED!");
    for (var i = 0; i < dataJSON.length; i++) {
      setCoin((prevCoins) => {
        return [
          {
            name: dataJSON[i].name,
            total_amount: dataJSON[i].total_amount,
            current_price: dataJSON[i].current_price,
            price_difference: dataJSON[i].price_difference,
            total_profit: dataJSON[i].total_profit,
            total_value: dataJSON[i].total_value,
            id: dataJSON[i].id,
          },
          ...prevCoins,
        ];
      });
    }
  };

  const clickHandler = () => {
    getLedger(apiToken);
  };
  const [ownedCoin, setCoin] = useState();
  const pressHandler = (item) => {
    navigation.navigate("CoinDetails", item);
  };

  useEffect(() => {
    getData();
    console.log(apiToken);
  }, [apiToken]);

  useEffect(() => {
    getLedger(apiToken);
  }, []);

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
