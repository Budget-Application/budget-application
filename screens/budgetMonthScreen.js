import React from "react";
import { StyleSheet, View, Text } from "react-native";
import BudgetCalendar from "../components/calenderView";

export default function BudgetMonthView({ route, navigation }) {
  return (
    <View style={style.container}>
      <BudgetCalendar />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 24,
  },
});
