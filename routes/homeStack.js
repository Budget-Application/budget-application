import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home";
import BudgetScreen from "../screens/budgetScreen";

const Stack = createNativeStackNavigator();

export default function CreateNavigationContainer() {
  console.log("Call Navigator");
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "grey",
          },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="BudgetScreen"
          component={BudgetScreen}
          options={({ route }) => ({ title: route.params.nameb })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
