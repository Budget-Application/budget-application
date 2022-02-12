import React, { useState } from 'react';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StyleSheet, View, Text} from 'react-native';
import Home from './screens/home';
import { 
  NunitoSans_200ExtraLight,
  NunitoSans_200ExtraLight_Italic,
  NunitoSans_300Light,
  NunitoSans_300Light_Italic,
  NunitoSans_400Regular,
  NunitoSans_400Regular_Italic,
  NunitoSans_600SemiBold,
  NunitoSans_600SemiBold_Italic,
  NunitoSans_700Bold,
  NunitoSans_700Bold_Italic,
  NunitoSans_800ExtraBold,
  NunitoSans_800ExtraBold_Italic,
  NunitoSans_900Black,
  NunitoSans_900Black_Italic 
} from '@expo-google-fonts/nunito-sans'

// const getFonts= () => Font.loadAsync({
//     'nunito-bold': require("./assets/fonts/NunitoSans-Bold.ttf"),
//     'nunito-regular': require("./assets/fonts/NunitoSans-Regular.ttf"),
// });

export default function App() {
  let [fontsLoaded, setFontsLoaded] = useFonts({
    NunitoSans_200ExtraLight,
    NunitoSans_200ExtraLight_Italic,
    NunitoSans_300Light,
    NunitoSans_300Light_Italic,
    NunitoSans_400Regular,
    NunitoSans_400Regular_Italic,
    NunitoSans_600SemiBold,
    NunitoSans_600SemiBold_Italic,
    NunitoSans_700Bold,
    NunitoSans_700Bold_Italic,
    NunitoSans_800ExtraBold,
    NunitoSans_800ExtraBold_Italic,
    NunitoSans_900Black,
    NunitoSans_900Black_Italic 
 });
  const budgetData = [
    {nameb: "Budget_1", amount: "1"},
    {nameb: "Budget_2", amount: "2"},
    {nameb: "Budget_3", amount: "3"},
    {nameb: "Budget_4", amount: "4"},
    {nameb: "Budget_5", amount: "5"},
    {nameb: "Budget_6", amount: "6"},
    {nameb: "Budget_7", amount: "7"},
    {nameb: "Budget_8", amount: "8"},
    {nameb: "Budget_9", amount: "9"},
    {nameb: "Budget_11", amount: "11"},
    {nameb: "Budget_12", amount: "12"},
    {nameb: "Budget_13", amount: "13"},
    {nameb: "Budget_14", amount: "14"},
    {nameb: "Budget_15", amount: "15"},
    {nameb: "Budget_16", amount: "16"},
    {nameb: "Budget_17", amount: "17"},
    {nameb: "Budget_18", amount: "18"},
    {nameb: "Budget_19", amount: "19"},
  ];

  if (!fontsLoaded){
    return <AppLoading/>
  }
  return (
      <Home budgetData={budgetData}/>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'NunitoSans_800ExtraBold_Italic',
  }
});
