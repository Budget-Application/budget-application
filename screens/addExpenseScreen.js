import React from "react";
import { StyleSheet, View, Text} from "react-native";

export default function AddExpenseScreen(){
    return (
        <View style={style.container}>
            <Text>
                Add Expense Screen
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        padding: 24,
    }
});