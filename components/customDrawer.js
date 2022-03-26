import React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, ImageBackground, Image, Pressable } from "react-native";
import MyIcon, { MyAntIcon, MyFontAwesomeIcon } from "./addFabIcon";

export default function CustomeDrawer({ userDetails, props, navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#00f2aa", flex: 1 }}
      >
        <ImageBackground
          source={require("../assets/images/drawer_bg_image.jpg")}
          style={{
            padding: 20,
            justifyContent: "flex-start",
            alignItems: "flex-end",
          }}
        >
          <Pressable
            onPress={() => {
              navigation.navigate("Profile", { userDetails });
            }}
          >
            <Image
              source={require("../assets/images/user_image.png")}
              style={{
                width: 60,
                height: 60,
                resizeMode: "contain",
                alignSelf: "flex-end",
              }}
            />
          </Pressable>
          <Text
            style={{
              color: "#ffffff",
              fontSize: 18,
              marginBottom: 5,
            }}
          >
            {userDetails.name}
          </Text>
          <Text
            style={{
              color: "#ffffff",
              fontSize: 18,
            }}
          >
            {userDetails.phone_no}
          </Text>
        </ImageBackground>
        <View style={{ backgroundColor: "#d5f2ea", flex: 1, padding: 10 }}>
          <DrawerItem
            icon={() => <MyIcon color={"black"} size={20} name={"home"} />}
            label="Home"
            labelStyle={{
              marginLeft: -25,
              fontWeight: "normal",
              fontSize: 15,
              color: "black",
            }}
            onPress={() => navigation.navigate("Home", { id: userDetails.id })}
          />
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}
