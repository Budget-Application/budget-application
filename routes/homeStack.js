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
            backgroundColor: "grey",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="BudgetDrawer"
          component={BudgetDrawer}
          options={({ route }) => ({ title: route.params.budget_name })}
        />
        <Stack.Screen
          name="AddExpense"
          component={AddExpenseScreen}
          options={{
            headerRight: () => (
              <Button
                onPress={() => alert("This is a button!")}
                title="Info"
                color="#00cc00"
              />
            ),
            headerRightContainerStyle: { paddingRight: 20 },
            headerBackImage: () => <MyIcon name={"x"} />,
            headerLeftContainerStyle: { paddingLeft: 5 },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
