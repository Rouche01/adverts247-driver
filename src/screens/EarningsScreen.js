import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import InfoBox from '../components/InfoBox';
import { withNavigation } from 'react-navigation';


const EarningsScreen = ({ navigation }) => {

    const { state: { user } } = useContext(AuthContext);
    const [ firstName, setFirstName ] = useState('');

    useEffect(() => {
        if(user) {
            setFirstName(user.name.split(' ')[0]);
        }
    }, [user]);

    
    if(!user) {
        return <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size='large' color='black' />
        </View>;
    }

    return(
        <SafeAreaView forceInset={{ top: 'always' }} style={styles.container} >
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
                        <Text style={{ color: '#fff', fontSize: 12, opacity: 0.5, backgroundColor: '#fff', paddingHorizontal: 17, paddingVertical: 2, borderRadius: 10 }}>ADD ACCOUNT</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ color: '#FF3B30', marginTop: 10, fontSize: 32, fontWeight: 'bold' }}>N24,567.00</Text> 
            </View>
            <Button 
                title='WITHDRAW'
                containerStyle={{ position: 'absolute', bottom: 50, width: '100%', left: 15 }}
                buttonStyle={{ padding: 15, backgroundColor: 'black', borderRadius: 8 }}
                titleStyle={{ fontSize: 17 }}
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