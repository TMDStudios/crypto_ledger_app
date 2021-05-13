import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { globalStyles } from "../styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings({ navigation }) {
  const pressHandler = () => {
    storeData();
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("apiToken", "");
      navigation.navigate("Login", { apiToken: "" });
    } catch (e) {
      console.log("Save Issue: " + e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={globalStyles.button} onPress={pressHandler}>
          <Text style={globalStyles.buttonText}>Logout</Text>
        </TouchableOpacity>
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
    backgroundColor: "#222",
    padding: 20,
    paddingBottom: 5,
    paddingTop: 5,
    flex: 1,
  },
  text: {
    color: "cyan",
    margin: 32,
  },
  buttonContainer: {
    backgroundColor: "blue",
    padding: 8,
  },
});
