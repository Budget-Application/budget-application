import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import GetCompleteDate from "./getCompletDate";

const months = [
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

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const generateMatrix = (state) => {
  var matrix = [];
  var year = state.activeDate.getFullYear();
  var month = state.activeDate.getMonth();
  var firstDay = new Date(year, month, 1).getDay();
  var maxDays = nDays[month];

  matrix[0] = weekDays;

  if (month == 1) {
    // February
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      maxDays += 1;
    }
  }

  var counter = 1;

  for (let row = 1; row < 7; row++) {
    matrix[row] = [];
    for (let col = 0; col < 7; col++) {
      matrix[row][col] = -1;
      if (row == 1 && col >= firstDay) {
        // Fill in rows only after the first day of the month
        matrix[row][col] = counter++;
      } else if (row > 1 && counter <= maxDays) {
        // Fill in rows only if the counter's not greater than
        // the number of days in the month
        matrix[row][col] = counter++;
      }
    }
  }
  return matrix;
};

export default function BudgetCalendar({ state, setState, navigation }) {
  const [amount, setAmount] = useState(100);
  var matrix = generateMatrix(state);

  const _onPress = (item) => {
    let newActiveDate = new Date();
    newActiveDate.setFullYear(state.activeDate.getFullYear());
    newActiveDate.setMonth(state.activeDate.getMonth());
    newActiveDate.setDate(item);

    setState({ activeDate: newActiveDate });

    navigation.navigate("Budget_day_view", {
      date: GetCompleteDate(newActiveDate),
    });
  };

  const changeMonth = (n) => {
    let newActiveDate = new Date();
    newActiveDate.setFullYear(state.activeDate.getFullYear());
    newActiveDate.setMonth(state.activeDate.getMonth() + n);
    newActiveDate.setDate(state.activeDate.getDate());
    setState({ activeDate: newActiveDate });
  };

  var rows = [];
  rows = matrix.map((row, rowIndex) => {
    var rowItems = row.map((item, colIndex) => {
      var itemKey = rowIndex.toString() + colIndex.toString();
      return (
        <Text
          key={itemKey}
          style={{
            flex: 1,
            height: "100%",
            textAlign: "center",
            textAlignVertical: "center",
            // Highlight header
            // backgroundColor: rowIndex == 0 ? "#adad" : "#11c",
            // Highlight Sundays
            color: colIndex == 0 ? "#a00" : "#000",
            // Highlight current date
            fontSize: rowIndex == 0 ? 25 : 25,

            fontWeight:
              item == state.activeDate.getDate() || rowIndex == 0
                ? "bold"
                : "normal",
          }}
          onPress={() => _onPress(item)}
        >
          {item != -1 ? item : ""}
          {"\n"}
          {rowIndex != 0 && item != -1 ? amount : ""}
        </Text>
      );
    });
    return (
      <View key={rowIndex} style={Styles.calendarRow}>
        {rowItems}
      </View>
    );
  });
  return (
    <View style={Styles.container}>
      <View style={Styles.calendarHeader}>
        <Pressable onPress={() => changeMonth(-1)}>
          <Image
            style={Styles.buttonIcon}
            source={require("../assets/icons/navigate_before.png")}
          />
        </Pressable>

        <Text style={Styles.headerText}>
          {months[state.activeDate.getMonth()]} &nbsp;
          {state.activeDate.getFullYear()} &ensp;
          <Text
            style={{
              color: "#ff0000",
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            {" "}
            - &ensp;
            {amount}{" "}
          </Text>
        </Text>

        <Pressable onPress={() => changeMonth(1)}>
          <Image
            style={Styles.buttonIcon}
            source={require("../assets/icons/navigate_next.png")}
          />
        </Pressable>
      </View>
      {rows}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    // backgroundColor: '#789000',
  },
  calendarRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  calendarHeader: {
    flex: 0.6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  buttonIcon: {
    width: 30,
    height: 30,
  },
});
