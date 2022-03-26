import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import BudgetItem from "../components/budgetItem";
import * as user from "../db/apis/user.js";
import MyIcon from "../components/addFabIcon";
import LoadingView from "../components/loadingView";
import { useIsFocused } from "@react-navigation/native";

export default function Home({ route, navigation }) {
  const [budgetData, setBudgetData] = useState([]);
  const [userDetails, setUserDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(route.params.id);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(async () => {
    const userDetailsDB = await user.getUserDetails(userId);
    console.log(userDetailsDB);
    setUserDetails(userDetailsDB);
  }, []);

  useEffect(async () => {
    setIsLoading(true);
    const budgetList = await user.getUserBudgetList(userId);
    setBudgetData(budgetList);
    setIsLoading(false);
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    user
      .getUserBudgetList(userId)
      .then((budgetList) => setBudgetData(budgetList));
    setRefreshing(false);
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
            <MyIcon name={"search"} size={25} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
            }}
            onPress={() => {
              navigation.navigate("Profile", { userDetails });
            }}
          >
            <MyIcon name={"more-vertical"} size={25} color={"#000"} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [userDetails]);

  return (
    <View style={Styles.container}>
      {isLoading ? (
        <LoadingView />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={budgetData}
            renderItem={({ item }) => (
              <BudgetItem
                item={item}
                navigation={navigation}
                userDetails={userDetails}
              />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ItemSeparatorComponent={() => (
              <View
                style={{
                  marginLeft: "17.5%",
                  height: 1,
                  backgroundColor: "#c0c0c0",
                }}
              />
            )}
          />
          <View style={Styles.FabIcon}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate("AddUsers");
              }}
            >
              <MyIcon name={"plus"} size={40} color={"#fff"} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
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
  FabIcon: {
    backgroundColor: "#00f2aa",
    width: "15%",
    height: "7.5%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    right: 20,
    borderRadius: 100,
    elevation: 5,
  },
});
