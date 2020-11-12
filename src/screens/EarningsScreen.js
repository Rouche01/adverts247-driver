import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as PaymentContext } from '../context/PaymentContext';
import { Context as UserContext } from '../context/UserInfoContext';
import InfoBox from '../components/InfoBox';
import { withNavigation } from 'react-navigation';


const EarningsScreen = ({ navigation }) => {

    const { state: { user } } = useContext(AuthContext);
    const { state: { error }, initiateTransfer, clearErrors } = useContext(PaymentContext);

    const [ firstName, setFirstName ] = useState('');
    const [ loadingState, setLoadingState ] = useState(false);

    useEffect(() => {
        if(user) {
            setFirstName(user.name.split(' ')[0]);
        }
    }, [user]);


    useEffect(() => {

        if(error) {
            Alert.alert('Notice', `${error}`)
            clearErrors();
        }

    }, [error])


    // console.log(user);


    const withdrawPayout = async() => {

        setLoadingState(true);
        const { bank, recipientCode } = user.bankInformation;

        if(!bank) {
            Alert.alert('Notice', 'You need to add your bank account information before you can make any withdrawals');
        } else{

            // console.log('Works');
            await initiateTransfer(recipientCode, "2456700");
            
        }

        setLoadingState(false);
    }

    
    if(!user) {
        return <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size='large' color='black' />
        </View>;
    }

    return(
        <SafeAreaView forceInset={{ top: 'always' }} style={styles.container} >
            <View style={{ flex: 6 }}>
                <View style={styles.earningStatus}>
                    <Image 
                        source={{ uri: user.profilePhoto }}
                        style={styles.profilePhoto}
                    />
                    <View style={{ paddingLeft: 15, flex: 1 }}>
                        <Text style={styles.greetingText}>Good morning {firstName},</Text>
                        <Text style={styles.earningStatusText}>You have earned 3,000 within 48 hours</Text>
                    </View>
                </View>
                <View style={styles.earningOverview}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 28, marginBottom: 15, fontWeight: 'bold' }}>Earnings Overview</Text>
                        <Feather name="more-horizontal" size={30} color="black" />
                    </View>
                    <View style={styles.innerEarningOverview}>
                        <InfoBox 
                                mainText="2,000" 
                                subText="Today's Earnings" 
                                color="#4FB81D"
                                fontSize={28}
                            /> 
                        <InfoBox
                                mainText="25,000" 
                                subText="Avg Weekly Earnings" 
                                color="#4FB81D"
                                fontSize={24}
                                spacing={4}
                        />
                        <InfoBox 
                                mainText="200k+" 
                                subText="Total Earnings" 
                                color="#4FB81D"
                                fontSize={28}
                        />
                    </View>
                </View>
                <View style={styles.payout}>
                    <View style={styles.accountRow}>
                        <Text style={{ color: '#fff', fontSize: 17 }}>Available Payout</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AddAccount')}>
                            <Text style={{ color: '#444', fontSize: 12, backgroundColor: '#ddd', paddingHorizontal: 17, paddingVertical: 2, borderRadius: 10 }}>ADD ACCOUNT</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: '#FF3B30', marginTop: 10, fontSize: 32, fontWeight: 'bold' }}>N24,567.00</Text> 
                </View>
            </View>
            <Button 
                title='WITHDRAW'
                containerStyle={{ flex: 1, width: '100%'}}
                buttonStyle={{ padding: 15, backgroundColor: 'black', borderRadius: 8 }}
                titleStyle={{ fontSize: 17 }}
                onPress={() => withdrawPayout()}
                loading={loadingState}
            />
        </SafeAreaView>
    );
}


EarningsScreen.navigationOptions = {
    headerShown: false
}


const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1
    }, 
    earningStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 55
    },
    profilePhoto: {
        height: 110,
        width: 110,
        borderRadius: 70,
        borderColor: 'red',
        borderWidth: 1
    },
    greetingText: {
        fontSize: 17,
        color: '#828282'
    },
    earningStatusText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#828282'
    },
    earningOverview: {
        marginTop: 60
    },
    innerEarningOverview: {
        flexDirection: 'row',
        flex: 1,
    },
    payout: {
        backgroundColor: 'black',
        marginTop: 150,
        borderRadius: 8,
        paddingHorizontal: 25,
        paddingVertical: 25
    },
    accountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});


export default withNavigation(EarningsScreen);