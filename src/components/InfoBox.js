import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const InfoBox = ({ mainText, subText, fontSize, color, spacing }) => {
    return (
        <View style={styles.infoBox}>
            <Text style={{ color: 'white', textAlign: 'center', flex: 1, fontSize: wp('3.8%') }}>{subText}</Text>
            <Text style={{ color: color, textAlign: 'center', flex: 1, fontSize: hp(fontSize), fontWeight: 'bold' }}>
                {mainText}
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    infoBox: {
        width: '100%',
        padding: wp('3.5%'),
        height: hp('15%'),
        backgroundColor: 'black',
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 3
    }
})


export default InfoBox;