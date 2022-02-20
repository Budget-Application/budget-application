import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import YearView from "../screens/budgetYearScreen";
import BudgetMonthView from "../screens/budgetMonthScreen";
import DailyBudgetView from "../screens/budgetDailyScreen";
import AddExpenseScreen from "../screens/addExpenseScreen";

const Drawer = createDrawerNavigator();

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

export default function BudgetDrawer({ route, navigation }) {
  // console.log("Budget Drawer");
  // console.log(route.params);
  const currentDate = new Date();
  return (
    <Drawer.Navigator
      initialRouteName="Budget_month_view"
      drawerType="front"
      overlayColor="#00000090"
      swipeEdgeWidth="300"
      drawerStyle={{
        backgroundColor: "#e6e6e6",
      }}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="Budget_month_view"
        component={BudgetMonthView}
        initialParams={{
          budget_id: route.params.id,
          selectedYear: parseInt(currentDate.getFullYear()),
          selectedMonth: monthNames[currentDate.getMonth()],
        }}
      />
      <Drawer.Screen
        name="Budget_year_view"
        component={YearView}
        initialParams={{
          budget_id: route.params.id,
          selectedYear: parseInt(currentDate.getFullYear()),
        }}
      />
      <Drawer.Screen name="Budget_day_view" component={DailyBudgetView} />
    </Drawer.Navigator>
  );
}
