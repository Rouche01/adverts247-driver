import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CustomInput = ({ label, autoCapitalize, autoCorrect, value, onChange, flexStyle, secureTextEntry, margin, keyboard, editable, focus, validationError, helpInfo }) => {
    return (
        <View style={{ margin: margin, flex: flexStyle, marginBottom: hp('1.6%') }}>
            {/* <Text style={styles.labelStyle}>{label}</Text> */}
            <TextInput
                placeholder={label}
                placeholderTextColor='gray'
                style={ validationError ? {...styles.inputStyle, borderWidth: 1, borderColor: 'red'} : 
                {...styles.inputStyle}} 
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
                value={value}
                onChangeText={(newValue) => onChange(newValue)}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboard}
                editable={editable}
                onFocus={focus}
            />
            { helpInfo && <Text style={styles.extraInfo}>{helpInfo}</Text> }
            { validationError && <Text style={styles.error}>{validationError}</Text> }
        </View>
    );
}


const styles = StyleSheet.create({
    labelStyle: {
        fontSize: 17,
        marginBottom: 8
    },
    inputStyle: {
        backgroundColor: '#E3E3E3',
        height: hp('7.2%'),
        fontSize: hp('2.2%'),
        paddingHorizontal: 20,
        paddingVertical: hp('0.5%'),
        borderRadius: 5,
    },
    error: {
        color: 'red',
        fontSize: 13,
        marginTop: 2
    },
    extraInfo: {
        fontSize: 14,
        marginTop: 2,
        color: 'grey'
    }
});


export default CustomInput;