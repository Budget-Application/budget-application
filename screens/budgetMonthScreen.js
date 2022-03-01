import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import BudgetCalendar from "../components/calenderView";
import { useIsFocused } from "@react-navigation/native";

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
  const [state, setState] = useState({
    activeDate: new Date(),
  });
  const isFocused = useIsFocused();
  useEffect(() => {
    if (route.params?.selectedYear) {
      var date = new Date();
      date.setFullYear(route.params.selectedYear);
      date.setMonth(monthNames[route.params.selectedMonth]);
      setState({ activeDate: date });
    }
  }, [isFocused]);

  return (
    <View style={style.container}>
      <BudgetCalendar
        state={state}
        setState={setState}
        navigation={navigation}
        budget_id={route.params.budget_id}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
