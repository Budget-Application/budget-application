import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import MyIcon, { MyFontAwesomeIcon } from "../components/addFabIcon";

export default function ProfileScreen({ route, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={require("../assets/images/user_image.png")}
      />
      <View
        style={[
          styles.icon,
          {
            position: "absolute",
            alignSelf: "center",
            top: "17%",
            right: "35%",
            backgroundColor: "#fff",
            borderRadius: 100,
            width: "10%",
            height: '5%',
          },
        ]}
      >
        <MyFontAwesomeIcon name={"camera"} size={25} color={"#808080"}/>
      </View>
      <View style={styles.body}>
        <View style={styles.detailsView}>
          <View style={styles.icon}>
            <MyFontAwesomeIcon name={"user"} size={30} color={"#808080"} />
          </View>
          <View style={styles.viewBody}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.info}>{route.params.userDetails.name}</Text>
          </View>
          <View style={styles.icon}>
            <MyFontAwesomeIcon name={"pencil"} size={25} color={"#808080"} />
          </View>
        </View>
        <View style={styles.detailsView}>
          <View style={styles.icon}>
            <MyFontAwesomeIcon name={"phone"} size={30} color={"#808080"} />
          </View>
          <View style={styles.viewBody}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.info}>{route.params.userDetails.phone_no}</Text>
          </View>
          <View style={styles.icon}>
            <MyFontAwesomeIcon name={"pencil"} size={25} color={"#808080"} />
          </View>
        </View>
        <View style={styles.detailsView}>
          <View style={styles.icon}>
            <MyFontAwesomeIcon
              name={"envelope-o"}
              size={30}
              color={"#808080"}
            />
          </View>
          <View style={styles.viewBody}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.info}>{route.params.userDetails.email}</Text>
          </View>
          <View style={styles.icon}>
            <MyFontAwesomeIcon name={"pencil"} size={25} color={"#808080"} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#d5f2ea",
    flex: 1,
  },
  avatar: {
    width: "30%",
    flex: 1,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "white",
    alignSelf: "center",
    marginTop: "-15%",
    resizeMode: "cover",
  },
  body: {
    alignItems: "center",
    padding: "10%",
    flexGrow: 1,
  },
  detailsView: {
    flexDirection: "row",
    height: "20%",
  },
  icon: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  viewBody: {
    flexGrow: 1,
    marginLeft: "3%",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    color: "#808080",
  },
  info: {
    fontSize: 18,
  },
});
