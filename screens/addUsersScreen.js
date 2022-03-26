import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as Contacts from "expo-contacts";
import MyIcon, { MyAntIcon } from "../components/addFabIcon";
import { getPhoneNumberToUserMap } from "../db/apis/user";

const formatPhoneNumber = (number) => {
  if (number) number = number.replace(/\s+/g, "");
  if (number != undefined && number.length == 10) return "+91" + number;
  else return number;
};

export default function AddUsersScreen({ route, navigation }) {
  const [contacts, setContacts] = useState(null);
  const [members, setMembers] = useState([]);

  useEffect(async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === "granted") {
      let { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      const phoneToUserMap = await getPhoneNumberToUserMap();
      data = data.filter((item) => {
        if (item.phoneNumbers && item.phoneNumbers[0]) {
          const phoneNumber = formatPhoneNumber(item.phoneNumbers[0].number);
          return phoneNumber in phoneToUserMap;
        }
        return false;
      });

      const newData = data.map((item) => {
        if (item.phoneNumbers && item.phoneNumbers[0]) {
          const phoneNumber = formatPhoneNumber(item.phoneNumbers[0].number);

          return {
            id: phoneToUserMap[phoneNumber],
            name: item.name,
            PhoneNumber: phoneNumber,
          };
        }
      });
      setContacts(newData);
    }
    return () => {
      setContacts();
      setMembers();
    };
  }, []);

  const filterSelectedUsers = () => {
    const data = contacts.filter((item) => {
      return members.includes(item.id);
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
              const tempMember = members.includes(item.id)
                ? members.filter((value) => {
                    return item.id != value;
                  })
                : [...members, item.id];
              setMembers(tempMember);
            }}
            style={{
              backgroundColor: members.includes(item.id) ? "#d5f2ea" : "white",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {members.includes(item.id) && (
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
  },
});
