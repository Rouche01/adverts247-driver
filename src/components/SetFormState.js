import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import CustomInput from './CustomInput';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';



const SetFormState = ({ bankName, accountNumber, accountName, btnTitle, loading, onBtnClick }) => {
    return (
        <View style={styles.container}>
            <CustomInput 
                label="Select Bank"
                margin={0}
                value={bankName}
                autoCapitalize='none'
                autoCorrect={false}
                editable={false}
            />
            <CustomInput 
                label="Account Number"
                margin={0}
                value={accountNumber}
                autoCapitalize='none'
                autoCorrect={false}
                editable={false}
            />
            <CustomInput 
                label="Account Name"
                margin={0}
                value={accountName}
                autoCapitalize='none'
                autoCorrect={false}
                editable={false}
            />
            <Button 
                title={btnTitle}
                containerStyle={{ marginTop: 50 }}
                buttonStyle={{ padding: 15, backgroundColor: '#FF3B30', borderRadius: 8 }}
                titleStyle={{ fontSize: hp('2%') }}
                loading={loading}
                onPress={onBtnClick}
            />
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        marginTop: 10
    }
});


export default SetFormState;