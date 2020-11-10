import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { Context as PaymentContext } from '../context/PaymentContext';
import { FontAwesome } from '@expo/vector-icons';
import PickerModal from '../components/PickerModal';
import CustomInput from '../components/CustomInput';


const AddAccountScreen = () => {

    const { state: { bankList, userAccountDetails, enableWithdraw }, 
        getBankList,
        confirmUserAccount } = useContext(PaymentContext);
    const [ pickedBank, setPickedBank ] = useState(null);
    const [ accountNumber, setAccountNumber ] = useState('');
    const [ accountName, setAccountName ] = useState('');
    const [ toggleModal, setToggleModal ] = useState(false);
    const [ buttonDisable, setButtonDisable ] = useState(true);

    useEffect(() => {

        setButtonDisable(!enableWithdraw);
        
    }, [enableWithdraw])

    useEffect(() => {
        getBankList();
    }, [])


    console.log(enableWithdraw);

    const selectBank = (bankName) => {
        setPickedBank(bankName);
    }


    useEffect(() => {
        
        // getUserAccountDetails();
        if(pickedBank) {
            console.log(accountNumber);
            confirmUserAccount(accountNumber, pickedBank.code);
        }

    }, [accountNumber, pickedBank])

    useEffect(() => {

        if(userAccountDetails) {
            setAccountName(userAccountDetails.account_name);
        } else {
            setAccountName('');
        }
    }, [userAccountDetails])

    if(!bankList) {
        return <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size='large' color='black' />
        </View>;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setToggleModal(!toggleModal)}>
                <View style={styles.selectInput}>
                    { !pickedBank ? <Text style={styles.placeholder}>Select a Bank</Text> : 
                        <Text style={styles.selectedValue}>{pickedBank.name}</Text>
                    }
                    <FontAwesome name="caret-down" size={20} color="gray" />
                </View>
            </TouchableOpacity>
            <CustomInput 
                label="Account Number"
                margin={0}
                value={accountNumber}
                autoCapitalize='none'
                autoCorrect={false}
                onChange={setAccountNumber}
                keyboard='number-pad'
            />
            <CustomInput 
                label="Account Name"
                margin={0}
                value={accountName}
                autoCapitalize='none'
                autoCorrect={false}
                onChange={setAccountName}
                editable={true}
            />
            <Button 
                title="WITHDRAW"
                containerStyle={{ marginTop: 50 }}
                buttonStyle={{ padding: 15, backgroundColor: 'black', borderRadius: 8 }}
                titleStyle={{ fontSize: 17 }}
                disabled={buttonDisable}
                disabledStyle={{ backgroundColor: "#979797" }}
                disabledTitleStyle={{ color: '#fff' }}
            />
            <PickerModal 
                visible={toggleModal} 
                onClose={() => setToggleModal(!toggleModal)}
                items={bankList}
                onSelect={selectBank}
                selectedValue={ pickedBank ? pickedBank.name : ` `}
            />
        </View>
    )
}


AddAccountScreen.navigationOptions = {
    headerStyle: {
        backgroundColor: 'rgb(33,36,39)',
    },
    headerTitle: 'Add Bank Account',
    headerTintColor: '#fff',
}


const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 15
    },
    selectInput: {
        height: 55,
        width: '100%',
        backgroundColor: '#E3E3E3',
        borderRadius: 5,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    placeholder: {
        fontSize: 16,
        color: 'gray'
    },
    selectedValue: {
        fontSize: 16,
        color: 'black'
    }
});


export default AddAccountScreen;