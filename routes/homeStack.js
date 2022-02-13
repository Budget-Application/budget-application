import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home";
import BudgetDrawer from "./budgetDrawer";

const Stack = createNativeStackNavigator();

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
          options={({ route }) => ({ title: route.params.nameb })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
