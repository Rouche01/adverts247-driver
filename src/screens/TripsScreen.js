import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import { ScrollView } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as TripContext } from '../context/TripContext';
import { Context as StreamingContext } from '../context/StreamingContext';
import { SafeAreaView } from 'react-navigation';
import InfoBox from '../components/InfoBox';
import { AntDesign, Feather } from '@expo/vector-icons';
import { checkCameraPermission, checkLocationPermission } from '../utilities/UserPermissions';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const TripsScreen = ({ navigation }) => {

    const { state: { user } } = useContext(AuthContext);
    const { state: { tripState }, startTrip, endTrip } = useContext(TripContext);
    const { 
        state: { streamingStatus }, 
        switchStreamingStatus, 
        getStreamingStatus 
    } = useContext(StreamingContext);

    const [ firstName, setFirstName ] = useState('');
    const [ switchTheme, setSwitchTheme ] = useState({
        backgroundColor: 'black',
        color: '#fff'
    });

    useEffect(() => {

        (async() => {

            const cameraPermission = await checkCameraPermission();
            const locationPermission = await checkLocationPermission();

            // console.log(cameraPermission, locationPermission);

            if(!cameraPermission || !locationPermission) {
                // console.log(cameraPermission, locationPermission);
                navigation.navigate('Gateway');
            }
        })();

    }, [])

    useEffect(() => {
        getStreamingStatus(user._id);
    }, []);

    // useEffect(() => {
    //     console.log(streamingStatus);
    // }, [streamingStatus]);

    useEffect(() => {
        if(user) {
            setFirstName(user.name.split(' ')[0]);
        }
    }, [user])

    useEffect(() => {
        if(streamingStatus === "on") {
            setSwitchTheme({
                backgroundColor: '#FF3B30',
                color: 'black'
            })
        } else if (streamingStatus === "off") {
            setSwitchTheme({
                backgroundColor: 'black',
                color: '#fff'
            })
        }
    }, [streamingStatus])


    const tripSwitch = async() => {
        
        await switchStreamingStatus(user._id);
        await getStreamingStatus(user._id);
    }

    if(!user) {
        return <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size='large' color='black' />
        </View>;
    }

    return (
        <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
            <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
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
                        <Text style={{ fontSize: hp('3.2%'), marginBottom: 15, fontWeight: 'bold' }}>Trips Overview</Text>
                    </View>
                    <View style={styles.innerTripOverview}>
                        <InfoBox 
                                mainText="50" 
                                subText="Trips Completed" 
                                color="#FF3B30"
                                fontSize={3.5}
                            /> 
                        <InfoBox
                                mainText="+ 5.23%" 
                                subText="Percentage Change" 
                                color="#FFF"
                                fontSize={2.5}
                                spacing={8}
                        />
                        <InfoBox 
                                mainText="10k+" 
                                subText="Total Earnings" 
                                color="#4FB81D"
                                fontSize={3.5}
                        />
                    </View>
                </View>
                <View style={styles.switchContainer}>
                    <TouchableOpacity onPress={tripSwitch}>
                        <View style={{backgroundColor: switchTheme.backgroundColor, height: hp('25%'), 
                            width: hp('25%'), borderRadius: 200, justifyContent: 'center'}}>
                            <AntDesign style={styles.switchIcon} 
                                name="poweroff" size={hp('15%')} 
                                color={switchTheme.color} 
                            />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.switchText}>
                        { streamingStatus === "off" ? `Start Trip` : `End Trip` }
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: wp('4%'),
        flex: 1,
        // borderWidth: 1,
        // borderColor: 'red'
    }, 
    tripStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp('6.4%')
    },
    profilePhoto: {
        height: wp('27%'),
        width: wp('27%'),
        borderRadius: 70,
        borderColor: 'red',
        borderWidth: 1
    },
    greetingText: {
        fontSize: hp('2.2%'),
        color: '#828282'
    },
    tripStatusText: {
        fontSize: hp('2.2%'),
        fontWeight: 'bold',
        color: '#828282'
    },
    tripOverview: {
        marginTop: hp('6%')
    },
    innerTripOverview: {
        flexDirection: 'row',
        flex: 1,
    },
    switchContainer: {
        marginTop: hp('8%'),
        alignItems: 'center'
    },
    switchIcon: {
        alignSelf: 'center', 
    },
    switchText: {
        fontSize: hp('3.5%'),
        marginTop: hp('2%'),
        fontWeight: 'bold'
    }
});


export default TripsScreen;