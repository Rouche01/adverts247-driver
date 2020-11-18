import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const NavTabs = ({ subText, mainText, routeName, navigation, complete }) => {

    return (
        <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
            <View style={styles.navTabs}>
                <View>
                    <Text style={styles.subText}>{ complete ? `Completed` : subText }</Text>
                    <Text style={styles.tabsTitle}>{mainText}</Text>
                </View>
                { !complete ? <AntDesign name="right" size={hp('2%')} color="black" /> :
                    <MaterialIcons name="check-circle" size={hp('2.5%')} color="green" />
                }
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    tabsTitle: {
        fontSize: hp('3%')
    },
    navTabs: {
        marginHorizontal: 15,
        height: hp('12%'),
        backgroundColor: '#E3E3E3',
        marginTop: hp('1.8%'),
        borderRadius: 8,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});



export default withNavigation(NavTabs);