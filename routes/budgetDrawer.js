import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import YearView from "../screens/budgetYearScreen";
import BudgetMonthView from "../screens/budgetMonthScreen";
import DailyBudgetView from "../screens/budgetDailyScreen";
import AddExpenseScreen from "../screens/addExpenseScreen";

const Drawer = createDrawerNavigator();

export default function BudgetDrawer({ route, navigation }) {
  console.log("Budget Drawer");
  console.log(route.params);
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
      <Drawer.Screen name="Budget_month_view" component={BudgetMonthView} initialParams={{budget_id: route.params.budget_id}}/>
      <Drawer.Screen name="Budget_year_view" component={YearView} />
      <Drawer.Screen name="Budget_day_view" component={DailyBudgetView} />
    </Drawer.Navigator>
  );
}
