import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import LoadingView from "../components/loadingView";
import { addNewExpenseItem } from "../db/apis/budget";
import { sendNotificationToUsers } from "../components/resuableFunctions";

export default function AddExpenseScreen({ route, navigation }) {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmt, setExpenseAmt] = useState("");
  const [isSaving, setIsSaving] = useState(false);
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
      <TextInput
        style={[Styles.expenseName]}
        placeholder="Expense Name"
        value={expenseName}
        onChangeText={(value) => setExpenseName(value)}
        keyboardType={"default"}
      />
      <TextInput
        style={Styles.expenseAmt}
        placeholder="Enter Amount"
        value={expenseAmt}
        keyboardType={"number-pad"}
        onChangeText={(value) => setExpenseAmt(value)}
      />
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
    fontSize: 30,
    fontWeight: "normal",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#c0c0c0",
    borderBottomWidth: 1,
  },
});
