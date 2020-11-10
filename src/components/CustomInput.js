import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';


const CustomInput = ({ label, autoCapitalize, autoCorrect, value, onChange, flexStyle, secureTextEntry, margin, keyboard, editable }) => {
    return (
        <View style={{ margin: margin, flex: flexStyle, marginBottom: 20 }}>
            {/* <Text style={styles.labelStyle}>{label}</Text> */}
            <TextInput
                placeholder={label}
                placeholderTextColor='gray'
                style={styles.inputStyle} 
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
                value={value}
                onChangeText={(newValue) => onChange(newValue)}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboard}
                editable={editable}
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
        height: 55,
        fontSize: 16,
        paddingHorizontal: 20,
        paddingVertical: 17,
        borderRadius: 5,
    }
});


export default CustomInput;