import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CustomInput = ({ label, autoCapitalize, autoCorrect, value, onChange, flexStyle, secureTextEntry, margin, keyboard, editable, focus, validationError }) => {
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
        height: hp('7%'),
        fontSize: 16,
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 5,
    },
    error: {
        color: 'red',
        fontSize: 13,
        marginTop: 2
    }
});


export default CustomInput;