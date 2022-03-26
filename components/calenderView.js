import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import GetCompleteDate from "./getCompletDate";
import { getMonthlyExpense } from "../db/apis/budget";
import LoadingView from "../components/loadingView";
import MyIcon from "./addFabIcon";
import { RFPercentage } from "react-native-responsive-fontsize";
import { formatDisplayAmount } from "./resuableFunctions";

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

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

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
  var matrix = null;
  var monthlyData = {};
  const currentDate = new Date();

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

    matrix = generateMatrix(state);
    setRow(fillRowData(matrix));
    setIsLoading(false);
    return () => {
      setRow();
      setIsLoading();
    };
  }, [state]);

  const fillDayRowData = (matrix) => {
    var rows = [];

    rows = matrix.map((row, rowIndex) => {
      return (
        <View key={rowIndex} style={Styles.calendarDayRow}>
          <Text
            style={{
              color: rowIndex == 0 ? "#a00" : "#000",
              fontWeight: "bold",
              fontSize: RFPercentage(3),
              width: "100%",
              textAlign: "center",
              textAlignVertical: "center",
            }}
          >
            {row}
          </Text>
        </View>
      );
    });
    return rows;
  };

  const fillRowData = (matrix) => {
    var rows = [];
    var daysRow = fillDayRowData(matrix[0]);
    const totalMonthAmount = getTotalMonthAmount(monthlyData);
    matrix = matrix.slice(1);
    rows = matrix.map((row, rowIndex) => {
      var rowItems = row.map((item, colIndex) => {
        var itemKey = rowIndex.toString() + colIndex.toString();
        return (
          <TouchableOpacity
            key={itemKey}
            style={{
              // flex: 1,
              width: "14%",
              height: "100%",
            }}
          >
            <View
              key={itemKey}
              style={{
                flex: 1,
                justifyContent: "center",
                borderRadius: 50,
                backgroundColor:
                  item == currentDate.getDate() &&
                  state.activeDate.getMonth() == currentDate.getMonth() &&
                  state.activeDate.getFullYear() == currentDate.getFullYear()
                    ? "#00f2aa"
                    : "#f0f0f0",
                marginVertical: "20%",
              }}
            >
              <Text
                key={itemKey}
                style={{
                  textAlign: "center",
                  textAlignVertical: "center",
                  color:
                    item == currentDate.getDate() &&
                    state.activeDate.getMonth() == currentDate.getMonth() &&
                    state.activeDate.getFullYear() == currentDate.getFullYear()
                      ? "#ffffff"
                      : colIndex == 0
                      ? "#a00"
                      : "#000",
                  fontSize: 20,
                  // fontWeight:
                  //   item == state.activeDate.getDate() ? "bold" : "normal",
                }}
                onPress={() => _onPress(item)}
              >
                {item}
              </Text>
              <Text
                style={{
                  color:
                    item == currentDate.getDate() &&
                    state.activeDate.getMonth() == currentDate.getMonth() &&
                    state.activeDate.getFullYear() == currentDate.getFullYear()
                      ? "#ffffff"
                      : colIndex == 0
                      ? "#a00"
                      : "#000",
                  textAlign: "center",
                  textAlignVertical: "center",
                  fontSize: 12,
                }}
              >
                {item != ""
                  ? item in monthlyData
                    ? formatDisplayAmount(monthlyData[item], 6)
                    : 0
                  : ""}
              </Text>
            </View>
          </TouchableOpacity>
        );
      });
      return (
        <View key={rowIndex} style={Styles.calendarRow}>
          {rowItems}
        </View>
      );
    });
    return (
      <View style={Styles.innerContainer}>
        <View style={Styles.calendarHeader}>
          <Pressable onPress={() => changeMonth(-1)}>
            <MyIcon name={"arrow-left"} color={"#000000"} size={25} />
          </Pressable>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Budget_year_view", {
                budget_id: budget_id,
                selectedYear: parseInt(state.activeDate.getFullYear()),
              });
            }}
          >
            <Text style={Styles.headerText}>
              {months[state.activeDate.getMonth()]} &nbsp;
              {state.activeDate.getFullYear()} &ensp; - &ensp;
              <Text style={Styles.headerAmount}>
                {"\u20B9"}
                {formatDisplayAmount(totalMonthAmount, 8)}{" "}
              </Text>
            </Text>
          </TouchableOpacity>

          <Pressable onPress={() => changeMonth(1)}>
            <MyIcon name={"arrow-right"} color={"#000000"} size={25} />
          </Pressable>
        </View>
        <View style={Styles.calendarDayRow}>{daysRow}</View>
        <View
          style={{
            flex: 10,
          }}
        >
          {rows}
        </View>
      </View>
    );
  };

  const _onPress = (item) => {
    let newActiveDate = new Date();
    newActiveDate.setFullYear(state.activeDate.getFullYear());
    newActiveDate.setMonth(state.activeDate.getMonth());
    newActiveDate.setDate(item);
    if (item.length > 0) {
      // setState({ activeDate: newActiveDate });
      navigation.navigate("Budget_day_view", {
        budget_id: budget_id,
        selectedDate: GetCompleteDate(newActiveDate),
      });
    }
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
      {isLoading ? <LoadingView /> : <View style={{ flex: 1 }}>{row}</View>}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  calendarDayRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  calendarRow: {
    // flex: 1,
    width: "100%",
    height: "12%",
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    // fontStyle: "italic",
  },
  headerAmount: {
    color: "black",
    fontWeight: "bold",
  },
  calendarHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#d5f2ea",
  },
  buttonIcon: {
    width: 30,
    height: 30,
  },
});
