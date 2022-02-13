import React from "react";
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
    { nameb: "Budget_1", amount: "1" },
    { nameb: "Budget_2", amount: "2" },
    { nameb: "Budget_3", amount: "3" },
    { nameb: "Budget_4", amount: "4" },
    { nameb: "Budget_5", amount: "5" },
    { nameb: "Budget_6", amount: "6" },
    { nameb: "Budget_7", amount: "7" },
    { nameb: "Budget_8", amount: "8" },
    { nameb: "Budget_9", amount: "9" },
    { nameb: "Budget_11", amount: "11" },
    { nameb: "Budget_12", amount: "12" },
    { nameb: "Budget_13", amount: "13" },
    { nameb: "Budget_14", amount: "14" },
    { nameb: "Budget_15", amount: "15" },
    { nameb: "Budget_16", amount: "16" },
    { nameb: "Budget_17", amount: "17" },
    { nameb: "Budget_18", amount: "18" },
    { nameb: "Budget_19", amount: "19" },
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
