import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home";
import BudgetDrawer from "./budgetDrawer";
import AddExpenseScreen from "../screens/addExpenseScreen";
import ProfileScreen from "../screens/profileScreen";
import LoginScreen from "../screens/userAuthScreens/LoginScreen";
import UserDetails from "../screens/userAuthScreens/UserDetails";
import CreateBudgetScreen from "../screens/createBudgetScreen";
import AddUsersScreen from "../screens/addUsersScreen";
import * as user from "../db/apis/user.js";
import { auth } from "../db/setup";

const Stack = createStackNavigator();

export default function CreateNavigationContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#d5f2ea",
          },
          headerTintColor: "#000",
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          // initialParams={{
          //   userDetails: userDetails,
          // }}
          options={{
            title: "Home",
            headerLeft: null,
            headerTitleAlign: "left",
            headerRightContainerStyle: { paddingRight: 10 },
          }}
        />
        <Stack.Screen
          name="BudgetDrawer"
          component={BudgetDrawer}
          // initialParams={{
          //   userDetails: userDetails,
          // }}
          options={({ route }) => ({
            title: route.params.budget_name,
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="AddExpense"
          component={AddExpenseScreen}
          // initialParams={{
          //   userDetails: userDetails,
          // }}
          options={{
            headerRightContainerStyle: { paddingRight: 20 },
            headerLeftContainerStyle: { paddingLeft: 5 },
          }}
        />
        <Stack.Screen
          name="CreateBudget"
          component={CreateBudgetScreen}
          // initialParams={{
          //   userDetails: userDetails,
          // }}
          options={{
            title: "New Budget",
            headerRightContainerStyle: { paddingRight: 20 },
            headerLeftContainerStyle: { paddingLeft: 20 },
          }}
        />
        <Stack.Screen
          name="AddUsers"
          component={AddUsersScreen}
          // initialParams={{
          //   userDetails: userDetails,
          // }}
          options={{
            title: "New Budget",
            headerRightContainerStyle: { paddingRight: 20 },
            headerLeftContainerStyle: { paddingLeft: 5 },
          }}
        />

        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Profile",
          }}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetails}
          options={{
            title: "Details",
          }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
