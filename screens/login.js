import React, { useState } from "react";
import {
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { globalStyles } from "../styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [apiToken, setApiToken] = useState("");
  const pressHandler = () => {
    getToken(apiToken);
  };

  const getToken = async (myKey) => {
    try {
      let response = await fetch(
        "https://crypto-ledger.herokuapp.com/api/get-user-ledger/" + myKey
      );
      let json = await response.json();
      console.log(json[0].owner);
      storeData();
      navigation.navigate("Home");
    } catch (e) {
      console.log("GetToken Issue: " + e);
      Alert.alert("Unable to load data");
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("apiToken");
      if (value !== null) {
        setApiToken(value);
      }
    } catch (e) {
      console.log("Issue: " + e);
    }
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("apiToken", apiToken);
    } catch (e) {
      console.log("Save Issue: " + e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header /> */}
      <View style={styles.body}>
        <View style={styles.viewContent}>
          <Text style={globalStyles.buttonText}>Log in to continue</Text>
          <Text style={globalStyles.buttonText}>API Key: {apiToken}</Text>
          <TextInput
            style={styles.input}
            placeholder="API Token"
            onChangeText={(val) => setApiToken(val)}
          />
        </View>
      </View>
      <View>
        <Button title="Get KEY" onPress={getData} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={globalStyles.button} onPress={pressHandler}>
          <Text style={globalStyles.buttonText}>Refresh</Text>
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
