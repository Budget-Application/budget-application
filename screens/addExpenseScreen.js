import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import LoadingView from "../components/loadingView";
import { addNewExpenseItem } from "../db/apis/budget";

export default function AddExpenseScreen({ route, navigation }) {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmt, setExpenseAmt] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={async () => {
            if (!expenseName.trim()) {
              Alert.alert("Empty Expense Name", "Please enter Expense Name", [
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ]);
            } else if (isNaN(expenseAmt) || isNaN(parseFloat(expenseAmt))) {
              Alert.alert(
                "Invalid Expense Amount",
                "Please enter valid Amount",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }]
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
                      onPress: () =>
                        navigation.goBack({ expenseName, expenseAmt }),
                    },
                  ]
                );
              } else {
                {
                  Alert.alert(
                    "Network Error",
                    "Failed to save details.\nPlease try again later.",
                    [
                      {
                        text: "OK",
                        onPress: () =>
                          navigation.goBack({ expenseName, expenseAmt }),
                      },
                    ]
                  );
                }
              }
            }
          }}
          title="Save"
          color="#00cc00"
        />
      ),
    });
  }, [navigation, expenseName, expenseAmt]);

  return (
    <View style={Styles.container}>
      <TextInput
        style={Styles.expenseName}
        placeholder="Expense Name"
        // placeholderTextColor={}
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
    // padding: 24,
    flex: 1,
    // justifyContent: 'space-around',
    // alignItems: 'stretch',
  },
  expenseName: {
    // width: "100%",
    height: 60,
    // backgroundColor: '#8080ff',
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",

    // flex: 1,
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 10,
  },
  expenseAmt: {
    // width: "100%",
    height: 60,
    // backgroundColor: '#8080ff',
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",

    // flex: 1,
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 10,
  },
});
