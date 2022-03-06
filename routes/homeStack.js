import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home";
import BudgetDrawer from "./budgetDrawer";
import AddExpenseScreen from "../screens/addExpenseScreen";
import ProfileScreen from "../screens/profileScreen";

const Stack = createStackNavigator();

export default function CreateNavigationContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
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
          options={{
            title: "Home",
            headerTitleAlign: "left",
            headerRightContainerStyle: { paddingRight: 10 },
          }}
        />
        <Stack.Screen
          name="BudgetDrawer"
          component={BudgetDrawer}
          options={({ route }) => ({
            title: route.params.budget_name,
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="AddExpense"
          component={AddExpenseScreen}
          options={{
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
