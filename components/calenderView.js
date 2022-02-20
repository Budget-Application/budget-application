import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import GetCompleteDate from "./getCompletDate";
import { getMonthlyExpense } from "../db/apis/budget";
import LoadingView from "../components/loadingView";
import MyIcon from "./addFabIcon";

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
      matrix[row][col] = "";
      if (row == 1 && col >= firstDay) {
        // Fill in rows only after the first day of the month
        matrix[row][col] = counter.toString();
        counter++;
      } else if (row > 1 && counter <= maxDays) {
        // Fill in rows only if the counter's not greater than
        // the number of days in the month
        matrix[row][col] = counter.toString();
        counter++;
      }
    }
  }
  return matrix;
};

const getTotalMonthAmount = (monthlyData) => {
  var totalAmount = 0;
  for (var key in monthlyData) {
    if (key != "id") totalAmount += monthlyData[key];
  }
  return totalAmount;
};

export default function BudgetCalendar({
  state,
  setState,
  navigation,
  budget_id,
}) {
  const [row, setRow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalMonthAmount, setTotalMonthAmount] = useState(0);
  var monthlyData = {};

  useEffect(async () => {
    setIsLoading(true);
    const data = await getMonthlyExpense(
      budget_id,
      (state.activeDate.getMonth() < 9
        ? "0" + (state.activeDate.getMonth() + 1).toString()
        : state.activeDate.getMonth().toString()) +
        "-" +
        state.activeDate.getFullYear().toString()
    );
    monthlyData = data;

    setRow(fillRowData());
    setTotalMonthAmount(getTotalMonthAmount(monthlyData));
    setIsLoading(false);
  }, [state]);

  const fillRowData = () => {
    var rows = [];
    var matrix = generateMatrix(state);

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
            {item}
            {"\n"}
            {rowIndex != 0 && item != ""
              ? item in monthlyData
                ? monthlyData[item]
                : 0
              : ""}
          </Text>
        );
      });
      return (
        <View key={rowIndex} style={Styles.calendarRow}>
          {rowItems}
        </View>
      );
    });
    return rows;
  };

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

  return (
    <View style={Styles.container}>
      {isLoading ? (
        <LoadingView />
      ) : (
        <View style={Styles.container}>
          <View style={Styles.calendarHeader}>
            <Pressable onPress={() => changeMonth(-1)}>
              <MyIcon name={"arrow-left"} color={"#000000"} size={25} />
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
                {totalMonthAmount}{" "}
              </Text>
            </Text>

            <Pressable onPress={() => changeMonth(1)}>
              <MyIcon name={"arrow-right"} color={"#000000"} size={25} />
            </Pressable>
          </View>
          {row}
        </View>
      )}
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
    paddingHorizontal: 20,
  },

  buttonIcon: {
    width: 30,
    height: 30,
  },
});
