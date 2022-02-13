import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function BudgetItem({ item, navigation }) {
  const budgetPressHandler = () => {
    navigation.navigate("BudgetDrawer", item);
  };

  return (
    <TouchableOpacity onPress={budgetPressHandler}>
      <View style={Styles.budgetItemView}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={Styles.budgetText}> {item.budget_name} </Text>
        <Text style={Styles.budgetAmount}> {item.budget_total} </Text>
      </View>
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  budgetItemView: {
    padding: 10,
    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  budgetText: {
    paddingVertical: 10,
    flex: 0.7,
    backgroundColor: "yellow",
    fontSize: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  budgetAmount: {
    padding: 10,
    flex: 0.3,
    backgroundColor: "yellow",
    fontSize: 30,
    justifyContent: "center",
    alignContent: "center",
  },
});
