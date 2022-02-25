import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { getYearlyExpense } from "../db/apis/budget";
import LoadingView from "../components/loadingView";
import { MyAntIcon } from "../components/addFabIcon";

function getYears() {
  var yearList = [];
  currentYear = parseInt(new Date().getFullYear());
  for (let i = 2020; i <= currentYear; i++) {
    yearList.push(i);
  }
  return yearList;
}

export default function YearView({ route, navigation }) {
  const [yearModalVisible, setYearModalVisible] = useState(false);
  const [expenseDetails, setExpenseDetails] = useState({
    selectedYear: null,
    budgetId: null,
    yearExpense: {},
    yearTotal: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(async () => {
    setIsLoading(true);
    await updateYearExpenseData(
      route.params.budget_id,
      route.params.selectedYear
    );
    setIsLoading(false);
  }, [route.params]);

  updateYearExpenseData = async (budgetId, selectedYear) => {
    let expense = await getYearlyExpense(budgetId, selectedYear);
    let yearTotal = 0;
    for (let i = 1; i <= 12; i++) {
      yearTotal += expense[i] ? expense[i] : 0;
    }
    setExpenseDetails({
      budgetId: budgetId,
      selectedYear: selectedYear,
      yearExpense: expense,
      yearTotal: yearTotal,
    });
  };

  const yearList = getYears();

  return (
    <View style={Styles.container}>
      {isLoading ? (
        <LoadingView />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={Styles.header}>
            <Modal
              animationType="fade"
              transparent
              visible={yearModalVisible}
              onRequestClose={() => setYearModalVisible(false)}
            >
              <TouchableWithoutFeedback
                onPress={() => setYearModalVisible(false)}
              >
                <View style={Styles.centered_view}>
                  <TouchableWithoutFeedback
                    onPress={() => setYearModalVisible(false)}
                  >
                    <View style={Styles.modal}>
                      <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={getYears()}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={async () => {
                              setYearModalVisible(false);
                              setIsLoading(true);
                              await updateYearExpenseData(
                                expenseDetails.budgetId,
                                item
                              );
                              setIsLoading(false);
                            }}
                          >
                            <View style={Styles.yearItemView}>
                              <Text style={Styles.yearText}>{item}</Text>
                            </View>
                          </TouchableOpacity>
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
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
            <Pressable
              style={Styles.selectedYearView}
              onPress={() => setYearModalVisible(true)}
            >
              <Text style={Styles.selectedYearText}>
                {expenseDetails.selectedYear} &nbsp;
                <MyAntIcon name={"caretdown"} size={12} />
              </Text>
              <Text style={Styles.selectedYearBudget}>
                Year Total: {"\u20B9"}
                {expenseDetails.yearTotal}
              </Text>
            </Pressable>
          </View>
          <View style={{ flex: 92 }}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={monthNames}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={Styles.monthItemView}
                  onPress={() =>
                    navigation.navigate("Budget_month_view", {
                      selectedYear: expenseDetails.selectedYear,
                      selectedMonth: item,
                      budget_id: route.params.budget_id,
                    })
                  }
                >
                  <Text style={Styles.monthText}>{item}</Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Text style={Styles.monthAmount}>
                      {"\u20B9"}
                      {expenseDetails.yearExpense[index + 1]
                        ? expenseDetails.yearExpense[index + 1]
                        : 0}
                    </Text>
                  </View>
                </TouchableOpacity>
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
          </View>
        </View>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    flex: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#d5f2ea",
  },
  monthItemView: {
    flexDirection: "row",
  },
  monthText: {
    flex: 1,
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
  },
  monthAmount: {
    margin: 10,
    flex: 0.5,
    padding: 10,
    backgroundColor: "#00f2aa",
    color: "#000000",
    fontSize: 20,
    textAlign: "center",
    borderRadius: 100,
  },
  centered_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  modal: {
    width: "50%",
    height: "75%",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
  },
  yearItemView: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  yearText: {
    padding: 10,
    fontSize: 20,
    justifyContent: "center",
    alignContent: "center",
  },
  selectedYearView: {
    flexDirection: "column",
    justifyContent: "center",
  },
  selectedYearText: {
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
  },
  selectedYearBudget: {
    color: "#808080",
    textAlign: "center",
    fontSize: 12,
  },
});
