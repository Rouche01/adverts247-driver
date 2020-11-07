import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import InfoBox from '../components/InfoBox';


const EarningsScreen = () => {

    const { state: { user } } = useContext(AuthContext);
    const [ firstName, setFirstName ] = useState('');

    useEffect(() => {
        if(user) {
            setFirstName(user.name.split(' ')[0]);
        }
    }, [user]);

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
            <Button 
                title='WITHDRAW'
                containerStyle={{ marginTop: 350 }}
                buttonStyle={{ padding: 15, backgroundColor: 'black', borderRadius: 8 }}
                titleStyle={{ fontSize: 17 }}
            />
        </SafeAreaView>
    );
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
    }
});


export default EarningsScreen;