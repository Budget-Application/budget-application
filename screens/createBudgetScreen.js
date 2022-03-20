import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { MyAntIcon } from "../components/addFabIcon";
import { createNewBudgetGroup } from "../db/apis/util";
import { auth } from "../db/setup";

export default function CreateBudgetScreen({ route, navigation }) {
  const [newBudget, setNewBudget] = useState("");
  const [users, setUsers] = useState(route.params.data);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          title="Cancel"
          color={"#00f2aa"}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => (
        <Button
          title="Create"
          color="#00f2aa"
          onPress={async () => {
            if (!newBudget.trim()) {
              Alert.alert("Empty Budget Name", "Please enter Budget Name", [
                { text: "OK" },
              ]);
            } else {
              const userIds = [auth.currentUser.uid];
              users.map((user) => {
                userIds.push(user.id);
              });
              const response = await createNewBudgetGroup(newBudget, userIds);
              if (response) {
                Alert.alert("Request Successful", "Created budget group.", [
                  {
                    text: "OK",
                    onPress: () =>
                      navigation.replace("Home", {
                        id: auth.currentUser.uid,
                      }),
                  },
                ]);
              } else {
                {
                  Alert.alert(
                    "Network Error",
                    "Failed to create budget.\nPlease try again later.",
                    [
                      {
                        text: "OK",
                        onPress: () => navigation.goBack(),
                      },
                    ]
                  );
                }
              }
            }
          }}
        />
      ),
    });
  }, [navigation, newBudget]);

  const filterUsers = (id) => {
    const newUsers = users.filter((item) => {
      return item.id != id;
    });
    setUsers(newUsers);
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.budgetNameView}>
        <Text style={Styles.label}>Enter Name</Text>
        <TextInput
          style={Styles.budgetText}
          placeholder="Type Here"
          value={newBudget}
          onChangeText={(name) => setNewBudget(name)}
        />
      </View>
      <View
        style={{
          paddingTop: "5%",
          borderBottomColor: "#808080",
          borderBottomWidth: 1,
        }}
      />
      <Text style={Styles.flatListHeader}>Budget Group Members</Text>
      <FlatList
        data={users}
        style={Styles.flatList}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => (
          <View
            style={[
              Styles.flatListItemView,
              index == 0 ? { paddingTop: 0 } : {},
            ]}
          >
            <Text style={Styles.flatListItems}>{item.name}</Text>
            <TouchableOpacity onPress={() => filterUsers(item.id)}>
              <MyAntIcon name={"closecircle"} size={18} />
            </TouchableOpacity>
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
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  budgetNameView: {
    width: "100%",
    height: "10%",
    paddingHorizontal: "5%",
  },
  label: {
    color: "#808080",
    fontSize: 15,
  },
  budgetText: {
    flex: 1,
    paddingLeft: "5%",
    fontSize: 30,
    borderColor: "#808080",
    borderWidth: 1,
  },
  flatListHeader: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: "5%",
    paddingTop: "5%",
  },
  flatList: {
    padding: "5%",
    flexGrow: 1,
  },
  flatListItemView: {
    paddingTop: "5%",
    paddingBottom: "5%",
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  flatListItems: {
    fontSize: 18,
    flex: 1,
  },
});
