import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
  Modal,
  Button,
} from "react-native";

function getYears(selectedYear) {
  var yearList = [];

  for (let i = 0; i < 100; i++) {
    yearList.push(parseInt(selectedYear) - i);
  }
  return yearList;
}

export default function YearView({ route, navigation }) {
  const [yearModalVisible, setYearModalVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2022);
  const monthNames = [
    "January",
    "February",
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
        <Modal
          animationType="fade"
          transparent
          visible={yearModalVisible}
          onRequestClose={() => setYearModalVisible(false)}
        >
          <View style={Styles.centered_view}>
            <Button title="Cancel" onPress={() => setYearModalVisible(false)} />
            <View style={Styles.modal}>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={getYears(selectedYear)}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedYear(item);
                      setYearModalVisible(false);
                    }}
                  >
                    <View style={Styles.yearItemView}>
                      <Text style={Styles.yearText}>{item}</Text>
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
        </Modal>
        <Pressable onPress={() => setYearModalVisible(true)}>
          <Text style={Styles.selectedYear}>{selectedYear}</Text>
        </Pressable>
        <Text style={Styles.selectedYearBudget}> Amount </Text>
      </View>
      <View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={monthNames}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Budget_month_view", { selectedYear, item })
              }
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
    // justifyContent: 'center',
    // alignContent: 'center',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  monthItemView: {
    padding: 10,
    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  monthText: {
    padding: 10,
    backgroundColor: "yellow",
    fontSize: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  centered_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  modal: {
    width: "50%",
    height: "75%",
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
  },
  yearItemView: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  yearText: {
    padding: 10,
    // backgroundColor: "yellow",
    fontSize: 30,
    justifyContent: "center",
    alignContent: "center",
  },
  selectedYear: {
    fontSize: 30,
  },
  selectedYearBudget: {
    fontSize: 30,
  },
});
