import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import PlusIcon from "./PlusIcon";
import feather from "../Images/feather.png";

const styles = StyleSheet.create({
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f5deb3",
    padding: 15,
    borderRadius: 2,
    borderColor: "black",
    borderWidth: 3
  },
  button: {
    position: "absolute",
    top: -8,
    right: 3,
    backgroundColor: "transparent",
    borderWidth: 0
  },
  buttonText: {
    fontSize: 18
  },
  h1: {
    fontSize: 40,
    transform: [{ rotate: "45deg" }]
  },
  portrait: {
    width: 50,
    height: 30,
    marginTop: 20
  },
  image: {
    width: "80%"
  },
  input: {
    maxWidth: 80,
    marginTop: 15,
    backgroundColor: "transparent",
    color: "black",
    textAlign: "center",
    fontFamily: "New Rocker",
    fontSize: 18,
    borderWidth: 0
  }
});

export default function PlayerCard({ player, onChange, onClick }) {
  return (
    <View style={styles.card}>
      <View style={styles.portrait}>
        <Image source={feather} style={styles.image} />
      </View>
      <TextInput
        value={player}
        onChangeText={onChange}
        placeholder="Adicione um nome"
        style={styles.input}
      />
      <TouchableOpacity onPress={onClick} style={styles.button}>
        <PlusIcon />
      </TouchableOpacity>
    </View>
  );
}
