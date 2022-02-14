import React, { useState } from "react";
import { Text, View } from "react-native";

export default function DailyBudgetView({ route, navigation }) {
  console.log(route.params);
  return (
    <View>
      <Text>{route.params}</Text>
    </View>
  );
}
