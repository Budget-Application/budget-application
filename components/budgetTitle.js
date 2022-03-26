import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function BudgetTitle({ title, budgetId, users, navigation }) {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: "center",
      }}
      onPress={() =>
        navigation.navigate("Budget_users", { budgetId: budgetId, users: users })
      }
    >
      <Text
        style={{
          flex: 1,
          textAlign: "center",
          textAlignVertical: "center",
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
