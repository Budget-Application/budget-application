import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  StatusBar,
  Button,
  TouchableOpacity,
} from "react-native";
import BudgetItem from "../components/budgetItem";
import * as user from "../db/apis/user.js";
import MyIcon from "../components/addFabIcon";

export default function Home({ navigation }) {
  const [budgetData, setBudgetData] = useState([]);

  useEffect(async () => {
    const budgetList = await user.getUserBudgetList("testUser");
    setBudgetData(budgetList);
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            // flex:1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              padding: 10,
            }}
          >
            <MyIcon name={"search"} size={25} color={"#f0f0f0"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
            }}
          >
            <MyIcon name={"more-vertical"} size={25} color={"#f0f0f0"} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={style.container}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={budgetData}
        renderItem={({ item }) => (
          <BudgetItem item={item} navigation={navigation} />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              alignSelf: "flex-end",
              width: "83%",
              height: 1,
              backgroundColor: "#c0c0c0",
            }}
          />
        )}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight,
    backgroundColor: "#f0f0f0",
  },
  headerView: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignContent: "center",
  },
  headerText: {
    fontSize: 50,
    justifyContent: "center",
  },
});
