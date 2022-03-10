import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import * as Contacts from "expo-contacts";
import MyIcon, { MyAntIcon } from "../components/addFabIcon";

export default function AddUsersScreen({ route, navigation }) {
  const [contacts, setContacts] = useState(null);
  const [members, setMembers] = useState([]);
  const [showMembers, setShowMembers] = useState([]);

  useEffect(async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      const newData = data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          PhoneNumber:
            item.phoneNumbers &&
            item.phoneNumbers[0] &&
            item.phoneNumbers[0].number,
          isSelected: false,
        };
      });
      setContacts(newData);
    }
  }, []);

  const filterSelectedUsers = () => {
    const data = contacts.filter((item) => {
      return item.isSelected;
    });
    navigation.navigate("CreateBudget", { data });
  };

  return (
    <View style={Styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        style={{ flexGrow: 1 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              //   var resultMembers = members;
              //   var index = resultMembers.indexOf(item.id);
              //   console.log(index);
              //   console.log("Success");
              // else resultMembers = [...resultMembers, item.id];
              item.isSelected = !item.isSelected;
              setMembers([...members, item.id]);
            }}
            style={{
              backgroundColor: item.isSelected ? "#d5f2ea" : "white",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {item.isSelected && (
                <MyAntIcon
                  name={"checkcircle"}
                  size={25}
                  color={"#00f2aa"}
                  styles={{ marginBottom: "-5%", paddingLeft: "5%" }}
                />
              )}
              <Text style={[Styles.contactName]}>{item.name}</Text>
            </View>
            <Text style={Styles.contactNo}>{item.PhoneNumber}</Text>
          </TouchableOpacity>
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
      <TouchableOpacity
        activeOpacity={0.8}
        style={Styles.FabIcon}
        onPress={filterSelectedUsers}
      >
        <MyIcon name={"arrow-right"} size={30} color={"#fff"} />
      </TouchableOpacity>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
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
  contactName: {
    paddingHorizontal: "5%",
    paddingTop: "5%",
    fontSize: 20,
    justifyContent: "center",
    alignContent: "center",
  },
  contactNo: {
    paddingHorizontal: "10%",
    fontSize: 12,
    alignSelf: "flex-end",
    // justifyContent: "center",
    // alignContent: "center",
  },
});
