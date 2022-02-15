import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function MyIcon({ name, size = 40, color = "black" }) {
  return <Icon name={name} size={size} color={color} />;
}
