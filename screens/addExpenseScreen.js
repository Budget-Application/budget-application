import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

export default function AddExpenseScreen({ route, navigation }) {
  const [expenseName, setExpenseName] = useState(null);
  const [expenseAmt, setExpenseAmt] = useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() =>
            // navigation.setParams()
            navigation.goBack({ expenseName, expenseAmt })
          }
          title="Save"
          color="#00cc00"
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={Styles.container}>
      <TextInput
        style={Styles.expenseName}
        placeholder="Expense Name"
        // placeholderTextColor={}
        value={expenseName}
        onChangeText={setExpenseName}
        keyboardType={"default"}
      />
      <TextInput
        style={Styles.expenseAmt}
        placeholder="Enter Amount"
        value={expenseAmt}
        keyboardType={"number-pad"}
        onChangeText={setExpenseAmt}
      />
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
