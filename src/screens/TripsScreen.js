import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-navigation';
import InfoBox from '../components/InfoBox';


const TripsScreen = () => {

    const { state } = useContext(AuthContext);
    const [ firstName, setFirstName ] = useState('');

    useEffect(() => {
        if(state.user) {
            setFirstName(state.user.name.split(' ')[0]);
        }
    }, [state])

    return (
        <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
            <View style={styles.tripStatus}>
                <Image 
                    source={{ uri: state.user.profilePhoto }}
                    style={styles.profilePhoto}
                />
                <View style={{ paddingLeft: 15, flex: 1 }}>
                    <Text style={styles.greetingText}>Good morning, {firstName},</Text>
                    <Text style={styles.tripStatusText}>You have completed 100 trips in 48 hours</Text>
                </View>
            </View>
            <View style={styles.tripOverview}>
                <Text style={{ fontSize: 28, marginBottom: 15, fontWeight: 'bold' }}>Trips Overview</Text>
                <View style={styles.innerTripOverview}>
                <InfoBox 
                        mainText="50" 
                        subText="Trips Completed" 
                        color="#FF3B30"
                        fontSize={32}
                    /> 
                <InfoBox
                        mainText="+ 5.23%" 
                        subText="Percentage Change" 
                        color="#FFF"
                        fontSize={22}
                />
                <InfoBox 
                        mainText="10k+" 
                        subText="Total Earnings" 
                        color="#4FB81D"
                        fontSize={32}
                />
                </View>
            </View>
            {/* <View style={styles.switchContainer}>
                <View style={styles.switchStyle}>

                </View>
            </View> */}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 15
    }, 
    tripStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 50
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
    tripStatusText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#828282'
    },
    tripOverview: {
        marginTop: 45
    },
    innerTripOverview: {
        flexDirection: 'row',
        flex: 1,
    },
    switchContainer: {
        marginTop: 50
    },
    switchStyle: {
        backgroundColor: 'black',
        height: 150,
        width: 150,
        borderRadius: 75
    }
});


export default TripsScreen;