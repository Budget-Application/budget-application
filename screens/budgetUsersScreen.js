import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MyAntIcon } from "../components/addFabIcon";
import LoadingView from "../components/loadingView";
import { getUserDetails } from "../db/apis/user";

export default function BudgetUsersView({ route, navigation }) {
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(async () => {
    const users = route.params.users;
    const budgetId = route.params.budgetId;
    setIsLoading(true);
    let userDetails = [];
    await Promise.all(
      users.map(async (user) => {
        const userData = await getUserDetails(user);
        userDetails.push(userData);
      })
    );
    setUserDetails(userDetails);
    setIsLoading(false);
    return () => setUserDetails();
  }, []);

  return (
    <View style={Styles.container}>
      <View style={Styles.header}>
        <Text style={Styles.budgetUserHeaderText}>Budget Users</Text>
      </View>
      <View style={{ flex: 92 }}>
        {isLoading ? (
          <LoadingView />
        ) : (
          <FlatList
            data={userDetails}
            keyExtractor={(item) => item.id}
            style={{ flex: 9 }}
            renderItem={({ item }) => (
              <View style={{}}>
                <Text style={Styles.userName}>{item.name}</Text>
                <Text style={Styles.phoneNumber}>{item.phone_no}</Text>
              </View>
            )}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  backgroundColor: "#000",
                }}
              />
            )}
          />
        )}
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#d5f2ea",
  },
  budgetUserHeaderText: {
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
  },
  userName: {
    paddingHorizontal: "5%",
    paddingTop: "5%",
    fontSize: 20,
    justifyContent: "center",
    alignContent: "center",
  },
  phoneNumber: {
    paddingHorizontal: "5%",
    fontSize: 12,
    alignSelf: "flex-end",
  },
});
