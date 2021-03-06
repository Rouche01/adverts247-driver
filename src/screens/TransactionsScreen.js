import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const SingleTransaction = ({ amount, time, status, statusStyle }) => {
    return (
        <TouchableOpacity>
            <View style={styles.singleTransaction}>
                <View style={styles.leftCol}>
                    <Text style={styles.amount}>{amount}</Text>
                    <Text style={styles.time}>{time}</Text>
                </View>
                <View style={styles.rightCol}>
                    <Text style={{...styles.transactionStatus, ...statusStyle}}>{status}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}



const TransactionsScreen = () => {

    const dummyTransactions = [
        { amount: "N24,567.00", time: "10/11 12:50:32", status: "Pending" },
        { amount: "N65,450.00", time: "04/11 08:10:15", status: "Success" },
        { amount: "N33,875.50", time: "26/10 04:45:19", status: "Success" },
        { amount: "N33,875.50", time: "26/10 04:36:25", status: "Failed" }
    ]

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} 
                animated={true} 
                backgroundColor="rgba(0, 0, 0, 0.2)" 
                barStyle="light-content"
            />
            <FlatList 
                data={dummyTransactions}
                keyExtractor={(item) => item.time}
                renderItem={({ item }) => {

                    let statusStyle={}

                    if(item.status === "Pending") {
                        statusStyle = {
                            backgroundColor: '#A9B1AC',
                            color: '#333'
                        }
                    } else if(item.status === "Success") {
                        statusStyle = {
                            backgroundColor: '#4FB81D',
                            color: '#fff'
                        }
                    } else {
                        statusStyle = {
                            backgroundColor: '#FF3B30',
                            color: '#fff'
                        }
                    }

                    return <SingleTransaction 
                        statusStyle={statusStyle}
                        amount={item.amount} 
                        time={item.time} 
                        status={item.status} 
                    />
                }}
            />
        </View>
    );
}


TransactionsScreen.navigationOptions = {
    headerStyle: {
        backgroundColor: 'rgb(33,36,39)',
    },
    headerTintColor: '#fff',
}


const styles = StyleSheet.create({
    container: {
        padding: 12
    },
    singleTransaction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        // borderBottomWidth: 1,
        paddingVertical: hp('1.8%'),
        borderColor: '#ddd'
    },
    amount: {
        fontSize: hp('2.8%'),
        fontWeight: 'bold'
    },
    time: {
        color: 'gray',
        fontSize: hp('1.6%')
    },
    transactionStatus: {
        fontSize: hp('1.5%'),
        paddingHorizontal: wp('4%'),
        paddingVertical: 2,
        borderRadius: 20,
    }
});



export default TransactionsScreen;