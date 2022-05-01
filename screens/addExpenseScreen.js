import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Alert,
  Text,
  Modal,
} from "react-native";
import LoadingView from "../components/loadingView";
import {
  addNewExpenseItem,
  getExpenseNames,
  addExpenseName,
} from "../db/apis/budget";
import { useIsFocused } from "@react-navigation/native";
import { sendNotificationToUsers } from "../components/resuableFunctions";
import CustomButton from "../components/customButton";
import { Picker } from "@react-native-picker/picker";

export default function AddExpenseScreen({ route, navigation }) {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmt, setExpenseAmt] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const isFocused = useIsFocused();
  const [expenseNamesData, setExpenseNamesData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newExpenseName, setNewExpenseName] = useState("");

  useEffect(async () => {
    setExpenseNamesData(await getExpenseNames(route.params.budgetId));
    setExpenseName(expenseNamesData[0]);
  }, [isFocused]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          title="Cancel"
          color={"#00f2aa"}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => (
        <Button
          onPress={async () => {
            if (!expenseName.trim()) {
              Alert.alert("Empty Expense Name", "Please enter Expense Name", [
                { text: "OK" },
              ]);
            } else if (isNaN(expenseAmt) || isNaN(parseFloat(expenseAmt))) {
              Alert.alert(
                "Invalid Expense Amount",
                "Please enter valid Amount",
                [{ text: "OK" }]
              );
            } else {
              setIsSaving(true);
              const saveResponse = await addNewExpenseItem(
                route.params.budgetId,
                route.params.date,
                { expenseName: expenseName, amount: parseFloat(expenseAmt) }
              );
              setIsSaving(false);
              if (saveResponse) {
                Alert.alert(
                  "Request Successful",
                  "Updated daily expense details.",
                  [
                    {
                      text: "OK",
                      onPress: () => navigation.goBack(),
                    },
                  ]
                );
                let title = route.params.budget_name;
                let messageBody =
                  route.params.userDetails.name +
                  " create expense: " +
                  expenseName +
                  " with Amount \u20B9" +
                  expenseAmt;
                sendNotificationToUsers(route.params.users, title, messageBody);
              } else {
                {
                  Alert.alert(
                    "Network Error",
                    "Failed to save details.\nPlease try again later.",
                    [
                      {
                        text: "OK",
                        onPress: () => navigation.goBack(),
                      },
                    ]
                  );
                }
              }
            }
          }}
          title="Save"
          color="#00f2aa"
        />
      ),
    });
  }, [navigation, expenseName, expenseAmt]);

  return (
    <View style={Styles.container}>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={Styles.centered_view}>
          <View style={Styles.modal}>
            <Text style={Styles.expenseLabel}>Expense Name</Text>
            <TextInput
              style={Styles.modelExpenseText}
              value={newExpenseName}
              onChangeText={(value) => setNewExpenseName(value)}
            />
            <View style={Styles.expenseModalButtonView}>
              <CustomButton
                title={"Cancel"}
                onPress={() => {
                  setModalVisible(false);
                  setNewExpenseName("");
                }}
              />
              <CustomButton
                title={"Save"}
                onPress={async () => {
                  if (!newExpenseName.trim()) {
                    Alert.alert(
                      "Invalid Expense Name",
                      "Please enter valid Name",
                      [{ text: "OK" }]
                    );
                  } else {
                    setIsSaving(true);
                    const saveResponse = await addExpenseName(
                      route.params.budgetId,
                      newExpenseName.toLowerCase().trim()
                    );
                    setExpenseNamesData(
                      await getExpenseNames(route.params.budgetId)
                    );
                    setModalVisible(false);
                    setIsSaving(false);
                  }
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Picker
        // mode="dropdown"
        style={{ width: "75%", alignSelf: "center" }}
        selectedValue={expenseName}
        onValueChange={(itemValue, itemIndex) => setExpenseName(itemValue)}
      >
        {expenseNamesData?.map((item, index) => {
          return (
            <Picker.Item
              label={item}
              value={item}
              key={index}
              style={{ fontSize: 25, color: "#808080" }}
            />
          );
        })}
      </Picker>
      <TextInput
        style={Styles.expenseAmt}
        placeholder="Enter Amount"
        value={expenseAmt}
        keyboardType={"number-pad"}
        onChangeText={(value) => setExpenseAmt(value)}
      />
      <Text
        style={{
          color: "white",
          textAlign: "center",
          textAlignVertical: "center",
          marginTop: "10%",
          fontSize: 20,
          backgroundColor: "#00f2aa",
          height: "8%",
          width: "50%",
          alignSelf: "center",
          borderRadius: 100,
        }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        Expense not found?
      </Text>
      {isSaving && <LoadingView> </LoadingView>}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  expenseName: {
    height: 60,
    fontSize: 30,
    fontWeight: "normal",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#c0c0c0",
    borderBottomWidth: 1,
  },
  expenseAmt: {
    height: 60,
    fontSize: 25,
    fontWeight: "normal",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#c0c0c0",
    borderTopWidth: 1,
    borderBottomWidth: 1,
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
    paddingHorizontal: "5%",
  },
  expenseLabel: {
    flex: 1,
    color: "#808080",
    fontSize: 20,
    marginBottom: "1%",
    marginLeft: "5%",
  },
  modelExpenseText: {
    flex: 1,
    height: "100%",
    textAlignVertical: "center",
    fontSize: 25,
    borderWidth: 1,
    borderColor: "#808080",
    borderRadius: 100,
    paddingHorizontal: "3%",
    color: "#808080",
  },
  expenseModalButtonView: {
    flex: 1,
    marginVertical: "5%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
