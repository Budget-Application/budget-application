import { async } from "@firebase/util";
import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  FlatList,
  Text,
  Dimensions,
} from "react-native";
import {
  VictoryPie,
} from "victory-native";
import { getAllExpense } from "../db/apis/budget";

const colorSheet = [
  "#C62828",
  "#D32F2F",
  "#E53935",
  "#EF5350",
  "#AD1457",
  "#C2185B",
  "#E91E63",
  "#F06292",
  "#6A1B9A",
  "#8E24AA",
  "#AB47BC",
  "#CE93D8",
  "#512DA8",
  "#673AB7",
  "#9575CD",
  "#B39DDB",
  "#1565C0",
  "#1E88E5",
  "#42A5F5",
  "#90CAF9",
  "#00796B",
  "#009688",
  "#4DB6AC",
  "#2E7D32",
  "#43A047",
  "#66BB6A",
  "#A5D6A7",
  "#64DD17",
  "#76FF03",
  "#B2FF59",
  "#827717",
  "#9E9D24",
  "#C0CA33",
  "#D4E157",
  "#F57F17",
  "#F9A825",
  "#FDD835",
  "#FFEE58",
  "#6D4C41",
  "#8D6E63",
  "#37474F",
  "#546E7A",
  "#78909C",
  "#FF9E80",
  "#FFD180",
  "#B2FF59",
  "#69F0AE",
];

const monthNames = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };


export default function MonthlyReportScreen({ route, navigation }) {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const [monthlyData, setMonthlyData] = useState([]);
  const [innerRadius, setInnerRadius] = useState(0);
    console.log(route.params);


  const formatMontlyData = async () => {
    let obj = Object.entries( await fetchData());
    console.log(obj);
    let monthlySortedData = [];
    for (let a in obj) {
      monthlySortedData.push([a, obj[a]]);
    }
    monthlySortedData.sort(function (a, b) {
      return a[1][1] - b[1][1];
    });
    monthlySortedData.reverse();
    monthlySortedData.forEach((data, index) => {
        setMonthlyData(monthlyData => [
        ...monthlyData,
        { x: data[1][0], y: data[1][1], id: index },
      ]);
    });

    console.log("monthlyData\n", monthlyData);
  };
  useEffect(async () => {
    await formatMontlyData();
    let timer1 = setTimeout(() => setInnerRadius(50), 500);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  const fetchData = async () => {
    let monthlyReportData = {};
    let allExpenses = await getAllExpense(route.params.budget_id);
    const regex2 = new RegExp(
      "^([0-2][0-9]|(3)[0-1])(-)(" +
        (route.params.month + 1).toString() +
        ")|(0)" +
        (route.params.month + 1).toString() +
        "(-)(" +
        route.params.year.toString() +
        ")$"
    );
    let monthlyData = allExpenses.filter((item, index) => {
      return regex2.test(item.id);
    });
    monthlyData.forEach((dailyExpense) => {
      for (const [key, value] of Object.entries(dailyExpense)) {
        if (key !== "id") {
          if (key in monthlyReportData) {
            monthlyReportData[key] += value.amount;
          } else {
            monthlyReportData[key] = value.amount;
          }
        }
      }
    });
        return monthlyReportData;
    }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <VictoryPie
          //   theme={VictoryTheme.material}
          colorScale={colorSheet}
          //   style={{border: "white"}}
          animate={{
            easing: "elastic",
            duration: 1000,
            onLoad: { duration: 2000 },
            onEnter: { duration: 5000 },
          }}
          // labels={(datum) => `${datum.x}`}
          radius={screenWidth * 0.4 - 10}
          innerRadius={innerRadius}
          data={monthlyData}
          labelPlacement="parallel"
          labelPosition={"centroid"}
          labelRadius={screenWidth * 0.3 - 50}
        />
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={monthlyData}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                paddingHorizontal: "10%",
                backgroundColor: colorSheet[item.id],
                borderBottomWidth: 2,
                borderColor: "white",
              }}
            >
              <Text
                style={{ flex: 0.7, textAlignVertical: "center", fontSize: 24 }}
              >
                {item.x}
              </Text>
              <Text
                style={{ flex: 0.3, textAlignVertical: "center", fontSize: 24 }}
              >
                {"\u20B9"}{item.y}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
