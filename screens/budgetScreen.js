import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function BudgetScreen() {
  return (
    <View style={style.container}>
      <Text>Budget Screen</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 24,
  },
});
