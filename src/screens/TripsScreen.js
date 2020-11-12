import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as TripContext } from '../context/TripContext';
import { SafeAreaView } from 'react-navigation';
import InfoBox from '../components/InfoBox';
import { AntDesign, Feather } from '@expo/vector-icons';


const TripsScreen = () => {

    const { state: { user } } = useContext(AuthContext);
    const { state: { tripState }, startTrip, endTrip } = useContext(TripContext);
    const [ firstName, setFirstName ] = useState('');
    const [ switchTheme, setSwitchTheme ] = useState({
        backgroundColor: 'black',
        color: '#fff'
    });

    useEffect(() => {
        if(user) {
            setFirstName(user.name.split(' ')[0]);
        }
    }, [user])

    useEffect(() => {
        if(tripState) {
            setSwitchTheme({
                backgroundColor: '#FF3B30',
                color: 'black'
            })
        } else {
            setSwitchTheme({
                backgroundColor: 'black',
                color: '#fff'
            })
        }
    }, [tripState])

    // console.log(tripState);

    if(!user) {
        return <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size='large' color='black' />
        </View>;
    }

    return (
        <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.tripStatus}>
                    <Image 
                        source={{ uri: user.profilePhoto }}
                        style={styles.profilePhoto}
                    />
                    <View style={{ paddingLeft: 15, flex: 1 }}>
                        <Text style={styles.greetingText}>Good morning {firstName},</Text>
                        <Text style={styles.tripStatusText}>You have completed 100 trips in 48 hours</Text>
                    </View>
                </View>
                <View style={styles.tripOverview}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 28, marginBottom: 15, fontWeight: 'bold' }}>Trips Overview</Text>
                        <Feather name="more-horizontal" size={30} color="black" />
                    </View>
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
                                spacing={8}
                        />
                        <InfoBox 
                                mainText="10k+" 
                                subText="Total Earnings" 
                                color="#4FB81D"
                                fontSize={32}
                        />
                    </View>
                </View>
                <View style={styles.switchContainer}>
                    <TouchableOpacity onPress={() => {
                        if(tripState) {
                            endTrip();
                        } else {
                            startTrip();
                        }
                    }}>
                        <View style={{backgroundColor: switchTheme.backgroundColor, height: 200, width: 200,
                            borderRadius: 100, justifyContent: 'center'}}>
                            <AntDesign style={styles.switchIcon} 
                                name="poweroff" size={100} 
                                color={switchTheme.color} 
                            />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.switchText}>{ !tripState ? `Start Trip` : `End Trip` }</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        // borderWidth: 1,
        // borderColor: 'red'
    }, 
    tripStatus: {
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
    tripStatusText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#828282'
    },
    tripOverview: {
        marginTop: 55
    },
    innerTripOverview: {
        flexDirection: 'row',
        flex: 1,
    },
    switchContainer: {
        marginTop: 80,
        alignItems: 'center'
    },
    switchIcon: {
        alignSelf: 'center', 
    },
    switchText: {
        fontSize: 28,
        marginTop: 15,
        fontWeight: 'bold'
    }
});


export default TripsScreen;