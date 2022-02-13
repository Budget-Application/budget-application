import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, StatusBar } from "react-native";
import BudgetItem from "../components/budgetItem";

const renderHeader = () => {
  return (
    <View style={style.headerView}>
      <Text style={style.headerText}>Header</Text>
    </View>
  );
};

export default function Home({ navigation }) {
  const budgetData = [
    { budget_name: "Budget_1", budget_total: "1" },
    { budget_name: "Budget_2", budget_total: "2" },
    { budget_name: "Budget_3", budget_total: "3" },
    { budget_name: "Budget_4", budget_total: "4" },
    { budget_name: "Budget_5", budget_total: "5" },
    { budget_name: "Budget_6", budget_total: "6" },
    { budget_name: "Budget_7", budget_total: "7" },
    { budget_name: "Budget_8", budget_total: "8" },
    { budget_name: "Budget_9", budget_total: "9" },
    { budget_name: "Budget_11", budget_total: "11" },
    { budget_name: "Budget_12", budget_total: "12" },
    { budget_name: "Budget_13", budget_total: "13" },
    { budget_name: "Budget_14", budget_total: "14" },
    { budget_name: "Budget_15", budget_total: "15" },
    { budget_name: "Budget_16", budget_total: "16" },
    { budget_name: "Budget_17", budget_total: "17" },
    { budget_name: "Budget_18", budget_total: "18" },
    { budget_name: "Budget_19", budget_total: "19" },
  ];

  return (
    <View style={style.container}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={budgetData}
        renderItem={({ item }) => (
          <BudgetItem item={item} navigation={navigation} />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 10,
              backgroundColor: "#000",
            }}
          />
        )}
        // ListHeaderComponent={renderHeader}
        // ListHeaderComponentStyle
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight,
    backgroundColor: "green",
  },
  headerView: {
    flexDirection: "row",
    backgroundColor: "pink",
    justifyContent: "center",
    alignContent: "center",
  },
  headerText: {
    fontSize: 50,
    // backgroundColor: 'purple',
    justifyContent: "center",
  },
});
