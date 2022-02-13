import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function YearView({ route, navigation }) {
  const monthNames = [
    "January",
    "Febroury",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <View style={Styles.container}>
      <View style={Styles.header}>
        <Text>Header</Text>
      </View>
      <View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={monthNames}
          renderItem={({ item }) => (
            <TouchableOpacity
            onPress={()=>navigation.navigate("Budget_month_view", item)}
            >
              <View style={Styles.monthItemView}>
                <Text style={Styles.monthText}>{item}</Text>
              </View>
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
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
  monthItemView: {
    padding: 10,
    backgroundColor: "red",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-evenly",
  },
  monthText: {
    padding: 10,
    backgroundColor: "yellow",
    fontSize: 30,
    justifyContent: "center",
    alignContent: "center",
  },

});
