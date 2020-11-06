import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';


const CustomInput = ({ label, autoCapitalize, autoCorrect, value, onChange, flexStyle, secureTextEntry }) => {
    return (
        <View style={{ margin: 10, flex: flexStyle, marginBottom: 20 }}>
            {/* <Text style={styles.labelStyle}>{label}</Text> */}
            <TextInput
                placeholder={label}
                style={styles.inputStyle} 
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
                value={value}
                onChangeText={(newValue) => onChange(newValue)}
                secureTextEntry={secureTextEntry}
            />
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
        height: 60,
        fontSize: 16,
        padding: 20,
        borderRadius: 5,
    }
});


export default CustomInput;