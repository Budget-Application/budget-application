import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import BudgetCalendar from "../components/calenderView";
import { useIsFocused } from "@react-navigation/native";
import MyIcon from "../components/addFabIcon";

const monthNames = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

export default function BudgetMonthView({ route, navigation }) {
  const currentDate = new Date();
  const [state, setState] = useState({
    activeDate: currentDate,
  });
  const isFocused = useIsFocused();
  var arrowDirection = "";
  if (state.activeDate.getFullYear() > currentDate.getFullYear())
    arrowDirection = "arrow-left";
  else if (state.activeDate.getFullYear() < currentDate.getFullYear())
    arrowDirection = "arrow-right";
  else {
    if (state.activeDate.getMonth() > currentDate.getMonth())
      arrowDirection = "arrow-left";
    else if (state.activeDate.getMonth() < currentDate.getMonth())
      arrowDirection = "arrow-right";
  }
  useEffect(() => {
    if (route.params?.selectedYear) {
      var date = currentDate;
      date.setFullYear(route.params.selectedYear);
      date.setMonth(monthNames[route.params.selectedMonth]);
      setState({ activeDate: date });
    }
    return () => {
      setState();
    };
  }, [isFocused]);

  return (
    <View style={style.container}>
      <BudgetCalendar
        state={state}
        setState={setState}
        navigation={navigation}
        budget_id={route.params.budget_id}
        users={route.params.users}
        budget_name={route.params.budget_name}
        userDetails={route.params.userDetails}
      />
      {arrowDirection.length > 0 ? (
        <TouchableOpacity
          activeOpacity={0.8}
          style={style.FabIcon}
          onPress={() => {
            setState({ activeDate: currentDate });
          }}
        >
          <MyIcon name={arrowDirection} size={30} color={"#fff"} />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
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
