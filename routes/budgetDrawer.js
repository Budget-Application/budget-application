import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import YearView from "../screens/budgetYearScreen";
import BudgetMonthView from "../screens/budgetMonthScreen";
import DailyBudgetView from "../screens/budgetDailyScreen";
import GetCompleteDate from "../components/getCompletDate";
import CustomeDrawer from "../components/customDrawer";
import MyAntIcon, { MyFontAwesomeIcon } from "../components/addFabIcon";
import MyIcon from "../components/addFabIcon";
import BudgetTitle from "../components/budgetTitle";
import BudgetUsersView from "../screens/budgetUsersScreen";

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
  const currentDate = new Date();
  return (
    <Drawer.Navigator
      initialRouteName="Budget_month_view"
      drawerContent={(props) => (
        <CustomeDrawer
          userDetails={route.params.userDetails}
          props={props}
          navigation={navigation}
        />
      )}
      drawerType="front"
      overlayColor="#00000090"
      swipeEdgeWidth="300"
      drawerStyle={{
        backgroundColor: "#e6e6e6",
      }}
      screenOptions={{
        headerTitleAlign: "center",
        headerTitle: () => {
          return (
            <BudgetTitle
              title={route.params.budget_name}
              budgetId={route.params.id}
              key={route.params.id}
              users={route.params.users}
              navigation={navigation}
            />
          );
        },
        headerStyle: { backgroundColor: "#d5f2ea" },
        headerBackgroundContainerStyle: { backgroundColor: "#d5f2ea" },
        drawerActiveBackgroundColor: "#00f2aa",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          marginLeft: -25,
          fontWeight: "normal",
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="Budget_month_view"
        component={BudgetMonthView}
        initialParams={{
          budget_id: route.params.id,
          selectedYear: parseInt(currentDate.getFullYear()),
          selectedMonth: monthNames[currentDate.getMonth()],
          users: route.params.users,
          budget_name: route.params.budget_name,
          userDetails: route.params.userDetails,
        }}
        options={{
          title: "Monthly Expense",
          drawerIcon: ({ color }) => (
            <MyAntIcon name={"calendar"} size={20} color={color} />
          ),
          headerRightContainerStyle: { paddingRight: 20 },
        }}
      />
      <Drawer.Screen
        name="Budget_year_view"
        component={YearView}
        initialParams={{
          budget_id: route.params.id,
          selectedYear: parseInt(currentDate.getFullYear()),
          users: route.params.users,
          budget_name: route.params.budget_name,
          userDetails: route.params.userDetails,
        }}
        options={{
          title: "Yearly Expense",
          drawerIcon: ({ color }) => (
            <MyIcon name={"align-justify"} size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Budget_day_view"
        component={DailyBudgetView}
        initialParams={{
          budget_id: route.params.id,
          selectedDate: GetCompleteDate(currentDate),
          users: route.params.users,
          budget_name: route.params.budget_name,
          userDetails: route.params.userDetails,
        }}
        options={{
          title: "Daily Expense",
          drawerIcon: ({ color }) => (
            <MyIcon name={"columns"} size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Budget_users"
        component={BudgetUsersView}
        initialParams={{
          budgetId: route.params.id,
          users: route.params.users,
          budget_name: route.params.budget_name,
          userDetails: route.params.userDetails,
        }}
        options={{
          title: "Budget Users",
          drawerIcon: ({ color }) => (
            <MyFontAwesomeIcon name={"users"} size={20} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
