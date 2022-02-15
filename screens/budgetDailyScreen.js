import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Icon,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MyIcon from "../components/addFabIcon";

export default function DailyBudgetView({ route, navigation }) {
  const amount = 100;
  console.log("Daily View", route.params);
  const [dailyExpense, setDailyExpense] = useState([
    { expenseName: "Rent", amount: 10 },
    { expenseName: "Rent1", amount: 10 },
    { expenseName: "Rent2", amount: 10 },
    { expenseName: "Rent3", amount: 10 },
    { expenseName: "Rent4", amount: 10 },
    { expenseName: "Rent5", amount: 10 },
    { expenseName: "Rent6", amount: 10 },
    { expenseName: "Rent7", amount: 10 },
    { expenseName: "Rent8", amount: 10 },
    { expenseName: "Rent9", amount: 10 },
    { expenseName: "Rent0", amount: 10 },
    { expenseName: "Rent11", amount: 10 },
    { expenseName: "Rent12", amount: 10 },
    { expenseName: "Rent13", amount: 10 },
  ]);
  // console.log(route.params.homeStackNavigator.navigate);
  return (
    <View style={Styles.container}>
      <View style={Styles.header}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          {route.params.date}
        </Text>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "#ff0000" }}>
          {amount}
        </Text>
      </View>
      <FlatList
        data={dailyExpense}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => {}}>
            <View style={Styles.expenseView}>
              <Text style={Styles.expenseText}>{item.expenseName}</Text>
              <Text style={Styles.expenseAmt}>{item.amount}</Text>
            </View>
          </Pressable>
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: "#000",
            }}
          />
        )}
      />
      <View style={Styles.FabIcon}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate("AddExpense");
          }}
        >
          <MyIcon name={"plus"} size={50} color={"#ffffff"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#61c100",
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  header: {
    // flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#8000ff",
    height: 40,
  },
  expenseView: {
    flex: 1,
    backgroundColor: "#408080",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 70,
  },

  expenseText: {
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
    // alignSelf: 'flex-end',
  },
  expenseAmt: {
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
    // alignSelf: 'flex-end',
  },
  FabIcon: {
    backgroundColor: "red",
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    right: 10,
    borderRadius: 100,
  },
});
