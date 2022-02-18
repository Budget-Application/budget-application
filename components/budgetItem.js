import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function BudgetItem({ item, navigation }) {
  const budgetPressHandler = () => {
    navigation.navigate("BudgetDrawer", item);
  };

  return (
    <TouchableOpacity onPress={budgetPressHandler}>
      <View style={Styles.budgetItemView}>
        <View style={Styles.budgetIconView}>
          <Text style={Styles.budgetIconText}>{item.budget_name[0]}</Text>
        </View>
        <View style={Styles.budgetTextView}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={Styles.budgetText}
          >
            {item.budget_name}
          </Text>
          <Text style={Styles.budgetAmount}>
            Expense Amount: {item.budget_total}{" "}
          </Text>
        </View>
        <View style={Styles.lastTimeView}>
          <Text style={Styles.lastTimeText}>
            {new Date().toLocaleTimeString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  budgetItemView: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  budgetIconView: {
    flex: 0.6,
    height: "100%",
    backgroundColor: "#a7a7a7",
    borderRadius: 100,
  },
  budgetIconText: {
    textAlign: "center",
    color: "#f0f0f0",
    fontSize: 30,
  },

  budgetTextView: {
    marginLeft: 15,
    flex: 3.4,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  budgetText: {
    backgroundColor: "#f0f0f0",
    fontSize: 20,
  },
  budgetAmount: {
    backgroundColor: "#f0f0f0",
    color: "#808080",
    // alignSelf: "flex-end", //to Shift amount to right side
    fontSize: 12,
  },

  lastTimeView: {
    flex: 1,
    alignSelf: "flex-start", // to bottom "flex-end" - to top "flex-start"
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  lastTimeText: {
    color: "#808080",
  },
});
