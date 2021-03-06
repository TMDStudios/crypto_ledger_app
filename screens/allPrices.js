import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Coin from "../components/coin";
import { globalStyles } from "../styles/global";

export default function AllPrices({ navigation }) {
  const [loaded, setLoaded] = useState(false);
  const clickHandler = () => {
    if (searchEntry.length > 0) {
      setLoaded(false);
    }
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
              },
              ...prevCoins,
            ];
          });
        }
        if (responseJson.length > 0) {
          setLoaded(true);
        }
        console.log("Search Entry: " + searchEntry);
        if (searchEntry.length > 0) {
          coinFilter(searchEntry);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [coin, setCoin] = useState();
  const pressHandler = (item) => {
    navigation.navigate("CoinDetails", item);
  };
  const clearHandler = () => {
    setLoaded(false);
    setSearchEntry("");
  };
  useEffect(() => {
    if (searchEntry.length == 0 && !loaded) {
      clickHandler();
      setLoadingText("Loading prices...");
    }
  }, [loaded]);
  useEffect(() => {
    if (!loaded) {
      setTimeout(() => {
        setLoadingText(loadingText + ".");
      }, 100);
    }
  });
  const [searchEntry, setSearchEntry] = useState("");
  const coinFilter = (searchVal) => {
    setCoin((prevCoins) => {
      return prevCoins.filter(
        (coin) => coin.name.toLowerCase().indexOf(searchVal.toLowerCase()) > -1
      );
    });
  };
  const [loadingText, setLoadingText] = useState("Loading prices...");
  if (loaded) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            onChangeText={(val) => setSearchEntry(val)}
            value={searchEntry}
          />
          <View style={styles.searchButtonContainer}>
            <TouchableOpacity style={styles.clearButton} onPress={clearHandler}>
              <Text style={styles.searchButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.searchButtonContainer}>
            <TouchableOpacity style={styles.searchButton} onPress={clickHandler}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>
          <FlatList
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
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.body}>
          <Text style={globalStyles.buttonText}>{loadingText}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={globalStyles.button} onPress={clickHandler}>
            <Text style={globalStyles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
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
  searchContainer: {
    backgroundColor: "#111",
    padding: 1,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    color: "white",
    backgroundColor: "#555",
    borderWidth: 2,
    borderColor: "white",
    marginLeft: 24,
    paddingLeft: 24,
    borderRadius: 8,
    flex: 3,
    height: 32,
  },
  searchButtonContainer: {
    backgroundColor: "#111",
    padding: 1,
  },
  clearButton: {
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "#111",
    borderRadius: 8,
    height: 32,
    width: 64,
  },
  searchButton: {
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "#111",
    borderRadius: 8,
    height: 32,
    marginRight: 24,
    width: 64,
  },
  searchButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    margin: 4,
  },
});
