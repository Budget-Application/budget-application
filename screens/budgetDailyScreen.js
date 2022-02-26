import React, { useState, useEffect } from "react";
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
import GetCompleteDate from "../components/getCompletDate";
import { getDailyExpense } from "../db/apis/budget";
import LoadingView from "../components/loadingView";

export default function DailyBudgetView({ route, navigation }) {
  const [expenseDetails, setExpenseDetails] = useState({
    selectedDate: GetCompleteDate(new Date()),
    budgetId: null,
    dayExpenses: [],
    dayTotal: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    setIsLoading(true);
    await updateDayExpenseDetails(
      route.params.budget_id,
      route.params.selectedDate
    );
    setIsLoading(false);
  }, [route.params]);

  updateDayExpenseDetails = async (budgetId, selectedDate) => {
    let expense = await getDailyExpense(budgetId, selectedDate);
    let dailyExpenses = [];
    let dayTotal = 0;
    for (const [key, value] of Object.entries(expense)) {
      if (key !== "id") {
        dailyExpenses.push({
          expenseName: key,
          amount: value,
        });
        dayTotal += value;
      }
    }
    setExpenseDetails({
      selectedDate: selectedDate,
      budgetId: budgetId,
      dayExpenses: dailyExpenses,
      dayTotal: dayTotal,
    });
  };

  return (
    <View style={Styles.container}>
      {isLoading ? (
        <LoadingView />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={Styles.header}>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
              {expenseDetails.selectedDate}
            </Text>
            <Text
              style={{ fontSize: 30, fontWeight: "bold", color: "#ff0000" }}
            >
              {expenseDetails.dayTotal}
            </Text>
          </View>
          <FlatList
            data={expenseDetails.dayExpenses}
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
      )}
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
