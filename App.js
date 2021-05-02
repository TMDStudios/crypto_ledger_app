import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, Platform, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [name, setName] = useState("Bob");
  const [person, setPerson] = useState({ name: "Fred", age: 25 });
  const clickHandler = () => {
    setPerson({ name: "Tim", age: 42 });
  };
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
});
