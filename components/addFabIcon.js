import React from "react";
import Icon from "react-native-vector-icons/Feather";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

export default function MyIcon({ name, size = 40, color = "black" }) {
  return <Icon name={name} size={size} color={color} />;
}

export function MyAntIcon({ name, size = 40, color = "black" }) {
  return <AntDesignIcon name={name} size={size} color={color} />;
}
