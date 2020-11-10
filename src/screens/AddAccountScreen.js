import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import {Context as UserContext } from '../context/UserInfoContext';
import { Context as PaymentContext } from '../context/PaymentContext';
import { Context as AuthContext } from '../context/AuthContext';
import { FontAwesome } from '@expo/vector-icons';
import PickerModal from '../components/PickerModal';
import CustomInput from '../components/CustomInput';
import SetFormState from '../components/SetFormState';


const AddAccountScreen = () => {

    const { state: { bankList, userAccountDetails, loading }, 
        getBankList, confirmUserAccount,
        clearAccountDetails } = useContext(PaymentContext);
    
    const { updateUser } = useContext(UserContext);
    const { state: { user }, getUser } = useContext(AuthContext);
    const [ pickedBank, setPickedBank ] = useState(null);
    const [ accountNumber, setAccountNumber ] = useState('');
    const [ accountName, setAccountName ] = useState('');
    const [ toggleModal, setToggleModal ] = useState(false);
    const [ buttonDisable, setButtonDisable ] = useState(true);
    const [ loadSaveAccount, setLoadSaveAccount ] = useState(false);
    const [ hasBankInfo, setHasBankInfo ] = useState(false);

    useEffect(() => {

        if(pickedBank && accountNumber) {
            setButtonDisable(false);
        } else {
            setButtonDisable(true);
        }
        
    }, [pickedBank, accountNumber])

    useEffect(() => {

        clearAccountDetails();
        getBankList();

    }, []);


    useEffect(() => {

        if(user.bankInformation.bank) {
            setHasBankInfo(true);
        }

    }, [user])


    // console.log(loading);

    const selectBank = (bankName) => {
        setPickedBank(bankName);
    }


    useEffect(() => {

        if(userAccountDetails) {
            setAccountName(userAccountDetails.account_name);
        } else{
            setAccountName('');
        }
    }, [userAccountDetails])


    const confirmBankAccount = async() => {
        await confirmUserAccount(accountNumber, pickedBank.code);
    }

    const saveBankAccount = async() => {

        setLoadSaveAccount(true);

        const bankInformation = {
            bank: {
                name: pickedBank.name,
                code: pickedBank.code
            },
            accountNumber,
            accountName
        }

        await updateUser(user._id, {bankInformation}, getUser);
        setLoadSaveAccount(false);
    }


    const removeBankAccount = async() => {
        setLoadSaveAccount(true);
        await updateUser(user._id, {bankInformation: {}}, getUser);
        setPickedBank(null);
        setAccountNumber('');
        setHasBankInfo(false);
        setLoadSaveAccount(false);
    }

    if(!bankList) {
        return <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size='large' color='black' />
        </View>;
    }

    return (
        <View style={styles.container}>
            { !hasBankInfo ? <View>
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
                { !accountName ? <Button 
                    title="CONFIRM ACCOUNT"
                    containerStyle={{ marginTop: 20 }}
                    buttonStyle={{ padding: 15, backgroundColor: 'black', borderRadius: 8 }}
                    titleStyle={{ fontSize: 17 }}
                    loading={loading}
                    disabled={buttonDisable}
                    disabledStyle={{ backgroundColor: "#979797" }}
                    disabledTitleStyle={{ color: '#fff' }}
                    onPress={() => confirmBankAccount()}
                /> :
                <View>
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
                    title="ADD ACCOUNT"
                    containerStyle={{ marginTop: 50 }}
                    buttonStyle={{ padding: 15, backgroundColor: 'black', borderRadius: 8 }}
                    titleStyle={{ fontSize: 17 }}
                    disabled={buttonDisable}
                    disabledStyle={{ backgroundColor: "#979797" }}
                    disabledTitleStyle={{ color: '#fff' }}
                    loading={loadSaveAccount}
                    onPress={() => saveBankAccount()}
                />
                </View>
                }
                <PickerModal 
                    visible={toggleModal} 
                    onClose={() => setToggleModal(!toggleModal)}
                    items={bankList}
                    onSelect={selectBank}
                    selectedValue={ pickedBank ? pickedBank.name : ` `}
                />
            </View> :
            <SetFormState bankName={user.bankInformation.bank && user.bankInformation.bank.name} 
                accountNumber={user.bankInformation.accountNumber && user.bankInformation.accountNumber}
                accountName={user.bankInformation.accountName && user.bankInformation.accountName}
                btnTitle='REMOVE ACCOUNT'
                onBtnClick={removeBankAccount}
                loading={loadSaveAccount}
            />
            }
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