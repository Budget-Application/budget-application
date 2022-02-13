import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, StatusBar } from "react-native";
import BudgetItem from "../components/budgetItem";
import * as user from "../db/apis/user.js";

const renderHeader = () => {
  return (
    <View style={style.headerView}>
      <Text style={style.headerText}>Header</Text>
    </View>
  );
};

export default function Home({ navigation }) {
  const [budgetData, setBudgetData] = useState([]);
  useEffect(async () => {
    const budgetList = await user.getUserBudgetList("testUser");
    setBudgetData(budgetList);
  }, []);
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
