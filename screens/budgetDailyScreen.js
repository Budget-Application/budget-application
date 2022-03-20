import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import MyIcon from "../components/addFabIcon";
import GetCompleteDate from "../components/getCompletDate";
import { getDailyExpense } from "../db/apis/budget";
import LoadingView from "../components/loadingView";
import { formatLastUpdatedTime } from "../components/resuableFunctions";
import CustomButton from "../components/customButton";
import { addNewExpenseItem } from "../db/apis/budget";
import { formatDisplayAmount } from "../components/resuableFunctions";

export default function DailyBudgetView({ route, navigation }) {
  const [expenseDetails, setExpenseDetails] = useState({
    selectedDate: GetCompleteDate(new Date()),
    budgetId: null,
    dayExpenses: [],
    dayTotal: 0,
  });
  const [newDayAmt, setNewDayAmt] = useState("0");
  const [updateModalVisible, setUpdateModelVisible] = useState({
    visible: false,
    expenseName: "",
    expenseAmt: 0,
  });

  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(async () => {
    setIsLoading(true);
    await updateDayExpenseDetails(
      route.params.budget_id,
      route.params.selectedDate
    );
    setIsLoading(false);
  }, [isFocused]);

  updateDayExpenseDetails = async (budgetId, selectedDate) => {
    let expense = await getDailyExpense(budgetId, selectedDate);
    let dailyExpenses = [];
    let dayTotal = 0;
    for (const [key, value] of Object.entries(expense)) {
      if (key !== "id") {
        dailyExpenses.push({
          expenseName: key,
          amount: value["amount"],
          lastUpdatedTime: value["last_updated_time"],
        });
        dayTotal += value["amount"];
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
            <Text style={Styles.selectedDate}>
              {expenseDetails.selectedDate}
            </Text>
            <Text style={Styles.dayTotal}>
              Day Total: {"\u20B9"}
              {formatDisplayAmount(expenseDetails.dayTotal, 8)}
            </Text>
          </View>
          <Modal
            animationType="fade"
            transparent
            visible={updateModalVisible.visible}
            onRequestClose={() => {
              setUpdateModelVisible({
                visible: false,
                expenseName: "",
                expenseAmt: 0,
              });
              setNewDayAmt("0");
            }}
          >
            <View style={Styles.centered_view}>
              <View style={Styles.modal}>
                <View style={Styles.expenseNameModal}>
                  <Text style={Styles.expenseLabel}>Name</Text>
                  <Text style={Styles.modelExpenseText}>
                    {updateModalVisible.expenseName}
                  </Text>
                </View>
                <View style={Styles.expenseNameModal}>
                  <Text style={Styles.expenseLabel}>Amount</Text>
                  <Text style={Styles.modelExpenseText}>
                    {"\u20B9"}
                    {formatDisplayAmount(updateModalVisible.expenseAmt, 8)}
                  </Text>
                </View>
                <View style={Styles.expenseNewAmtModal}>
                  <TouchableOpacity
                    disabled={isNaN(newDayAmt) || newDayAmt.length == 0}
                    onPress={() => {
                      setNewDayAmt(
                        isNaN(newDayAmt) || newDayAmt.length == 0
                          ? "0"
                          : String(parseInt(newDayAmt) - 1)
                      );
                    }}
                  >
                    <View style={Styles.expenseModalIcon}>
                      <MyIcon name="minus" color="#ffffff" />
                    </View>
                  </TouchableOpacity>
                  <TextInput
                    style={Styles.expenseNewAmt}
                    keyboardType="decimal-pad"
                    value={newDayAmt}
                    onChangeText={(Amt) => {
                      setNewDayAmt(Amt);
                    }}
                  />
                  <TouchableOpacity
                    disabled={isNaN(newDayAmt) || newDayAmt.length == 0}
                    onPress={() => {
                      setNewDayAmt(String(parseInt(newDayAmt) + 1));
                    }}
                  >
                    <View style={Styles.expenseModalIcon}>
                      <MyIcon name="plus" color="#ffffff" />
                    </View>
                  </TouchableOpacity>
                </View>
                <Text style={{ textAlign: "center", color: "#808080" }}>
                  Total Amount: {"\u20B9"}
                  {(isNaN(newDayAmt) || newDayAmt.length == 0
                    ? 0
                    : parseInt(newDayAmt)) + updateModalVisible.expenseAmt}
                </Text>
                <View style={Styles.expenseModalButtonView}>
                  <CustomButton
                    title={"Cancel"}
                    onPress={() => {
                      setUpdateModelVisible({
                        visible: false,
                        expenseName: "",
                        expenseAmt: 0,
                      });
                      setNewDayAmt("0");
                    }}
                  />
                  <CustomButton
                    title={"Save"}
                    onPress={async () => {
                      if (isNaN(newDayAmt) || isNaN(parseFloat(newDayAmt))) {
                        Alert.alert(
                          "Invalid Expense Amount",
                          "Please enter valid Amount",
                          [{ text: "OK" }]
                        );
                      } else {
                        setIsLoading(true);
                        const saveResponse = await addNewExpenseItem(
                          expenseDetails.budgetId,
                          expenseDetails.selectedDate,
                          {
                            expenseName: updateModalVisible.expenseName,
                            amount: parseFloat(newDayAmt),
                          }
                        );
                        setNewDayAmt("0");
                        setUpdateModelVisible({
                          visible: false,
                          expenseName: "",
                          expenseAmt: 0,
                        });
                        await updateDayExpenseDetails(
                          route.params.budget_id,
                          route.params.selectedDate
                        );
                        setIsLoading(false);
                      }
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
          <FlatList
            data={expenseDetails.dayExpenses}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  setUpdateModelVisible({
                    visible: true,
                    expenseName: item.expenseName,
                    expenseAmt: item.amount,
                  });
                }}
              >
                <View style={Styles.expenseContainer}>
                  <View style={Styles.expenseIcon}>
                    <MyIcon name={"home"} color={"#fff"} size={30} />
                  </View>
                  <View style={Styles.expenseView}>
                    <Text style={Styles.expenseText}>{item.expenseName}</Text>
                    <Text style={Styles.expenseLastUpdatedTime}>
                      {formatLastUpdatedTime(item.lastUpdatedTime.seconds)}
                    </Text>
                  </View>
                  <View style={Styles.expenseAmtView}>
                    <Text style={Styles.expenseAmt}>
                      {"\u20B9"}
                      {formatDisplayAmount(item.amount, 6)}
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  marginLeft: "16%",
                  height: 1,
                  backgroundColor: "#c0c0c0",
                }}
              />
            )}
          />
          <View style={Styles.FabIcon}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate("AddExpense", {
                  budgetId: expenseDetails.budgetId,
                  date: expenseDetails.selectedDate,
                });
              }}
            >
              <MyIcon name={"plus"} size={40} color={"#fff"} />
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
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  header: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#d5f2ea",
  },

  centered_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  modal: {
    position: "absolute",
    justifyContent: "space-evenly",
    backgroundColor: "#f0f0f0",
    borderColor: "#000",
    borderRadius: 20,
    paddingTop: "5%",
  },
  expenseNameModal: {
    height: "16%",
    margin: "5%",
    justifyContent: "center",
  },
  expenseLabel: {
    color: "#808080",
    fontSize: 15,
    marginBottom: "1%",
    marginLeft: "5%",
  },
  modelExpenseText: {
    height: "100%",
    textAlignVertical: "center",
    fontSize: 25,
    borderWidth: 1,
    borderColor: "#808080",
    borderRadius: 100,
    paddingHorizontal: "3%",
    color: "#808080",
  },
  expenseNewAmtModal: {
    height: "15%",
    margin: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  expenseModalIcon: {
    elevation: 5,
    borderRadius: 100,
    backgroundColor: "#aaaaaa",
  },
  expenseNewAmt: {
    borderWidth: 1,
    paddingHorizontal: "3%",
    width: "50%",
    height: "100%",
    borderRadius: 100,
    borderColor: "#808080",
    fontSize: 25,
  },

  expenseModalButtonView: {
    flex: 1,
    marginVertical: "5%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  selectedDate: {
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
  },
  dayTotal: {
    color: "#808080",
    textAlign: "center",
    fontSize: 12,
  },

  expenseContainer: {
    flex: 3,
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },

  expenseIcon: {
    flex: 0.36,
    backgroundColor: "#00f2aa",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  expenseView: {
    flex: 1.64,
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 10,
  },
  expenseText: {
    backgroundColor: "#f0f0f0",
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
  },

  expenseAmtView: {
    flex: 1,
    alignItems: "flex-end",
  },
  expenseAmt: {
    fontSize: 23,
    textAlign: "center",
    textAlignVertical: "center",
  },

  expenseLastUpdatedTime: {
    color: "#808080",
    fontSize: 12,
    textAlign: "center",
    textAlignVertical: "center",
  },

  FabIcon: {
    backgroundColor: "#00f2aa",
    width: "15%",
    height: "7.5%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    right: 20,
    borderRadius: 100,
    elevation: 5,
  },
});
