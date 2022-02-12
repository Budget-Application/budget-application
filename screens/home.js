import React from "react";
import { StyleSheet, 
        View, 
        Text,
        FlatList,
        StatusBar,
    } from "react-native";
import BudgetItem from '../components/budgetItem'


const renderHeader = () => {
    return(
        <View style={style.headerView}>
            <Text style={style.headerText}>Header</Text>
        </View>
    );
}

export default function Home({budgetData}){
    
    return (
        <View style={style.container}>
            <FlatList 
                keyExtractor={(item, index) => index.toString()}
                data={budgetData}
                renderItem={
                    ({item}) => (
                            <BudgetItem item={item}/>
                    )}
                ItemSeparatorComponent={() => <View style={{
                    height: 10,
                    backgroundColor:"#000"
                }}/>}
                ListHeaderComponent={renderHeader}
                ListHeaderComponentStyle
            />
        </View>
    );
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor: 'green',
    },
    headerView: {
        flexDirection: 'row',
        backgroundColor: 'pink',
        justifyContent: 'center',
        alignContent: 'center',
    },
    headerText: {
        fontSize: 50,
        // backgroundColor: 'purple',
        justifyContent: 'center',
    },

});