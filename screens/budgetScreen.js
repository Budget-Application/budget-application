import React from "react";
import { StyleSheet, View, Text } from "react-native";
import BudgetCalendar from "../components/calendarView";

export default function BudgetScreen({ route, navigation }) {
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
