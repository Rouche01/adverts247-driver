import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const InfoBox = ({ mainText, subText, fontSize, color, spacing }) => {
    return (
        <View style={styles.infoBox}>
            <Text style={{ color: 'white', textAlign: 'center', marginBottom: spacing }}>{subText}</Text>
            <Text style={{ color: color, textAlign: 'center', fontSize: fontSize, fontWeight: 'bold' }}>
                {mainText}
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    infoBox: {
        width: '100%',
        padding: 15,
        height: 120,
        backgroundColor: 'black',
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 3
    }
})


export default InfoBox;