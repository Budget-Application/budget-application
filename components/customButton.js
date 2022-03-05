import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={Styles.button}>
      <Text style={Styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  button: {
    backgroundColor: "#00f2aa",
    justifyContent: "center",
    width: "30%",
    elevation: 10,
  },
  buttonText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
  },
});
