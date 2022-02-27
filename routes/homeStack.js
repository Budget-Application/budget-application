import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native";
import Home from "../screens/home";
import BudgetDrawer from "./budgetDrawer";
import AddExpenseScreen from "../screens/addExpenseScreen";
import MyIcon from "../components/addFabIcon";

const Stack = createStackNavigator();

export default function CreateNavigationContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#00f2aa",
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
          options={({ route }) => ({ title: route.params.budget_name, headerShown: false, })}
        />
        <Stack.Screen
          name="AddExpense"
          component={AddExpenseScreen}
          options={{
            headerRightContainerStyle: { paddingRight: 20 },
            headerBackImage: () => <MyIcon name={"x"} />,
            headerLeftContainerStyle: { paddingLeft: 5 },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
