import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getCameraPermission, getLocationPermission } from '../utilities/UserPermissions';
import { Context as AuthContext } from '../context/AuthContext';


const GatewayScreen = ({ navigation }) => {

    const { state: { user } } = useContext(AuthContext);

    const [ cameraPermission, setCameraPermission ] = useState('denied');
    const [ locationPermission, setLocationPermission ] = useState('denied');

    useEffect(() => {
        if(locationPermission === 'granted' && cameraPermission === 'granted') {
            // console.log('move to the next');

            const { profilePhoto, insuranceCert, driversLicense, vehicleReg} = user;
            if(profilePhoto && insuranceCert && driversLicense && vehicleReg) {
                navigation.navigate('mainFlow');
            } else {
                navigation.navigate('SetupIndex');
            }
        }
    }, [locationPermission, cameraPermission])

    const acceptPermissions = async() => {

        let location, camera;

        if(locationPermission !== 'granted') {
            location = await getLocationPermission();
            setLocationPermission(location);
        }

        if(cameraPermission !== 'granted') {
            camera = await getCameraPermission();
            setCameraPermission(camera);
        }

    }

    return(
        <View style={styles.backgroundStyle}>
            <StatusBar 
                barStyle="light-content"
                backgroundColor="rgba(0,0,0,0.2)"
                translucent={true}
            />
            <View style={styles.body}>
                <View style={styles.permissionIcon}>
                    <MaterialCommunityIcons name="shield-check" size={45} color="rgba(255,255,255,0.6)" />
                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                        For a smooth and efficient app experience, Adverts247 need your below permissions to access and collect information. You can suspend your permission or uninstall App from your device at any time.
                    </Text>
                </View>
                <View style={styles.permissionGroup}>
                    <View style={styles.groupIconWrapper}>
                        <View style={styles.groupIcon}>
                            <Ionicons name="md-locate" size={wp('6%')} color="#fff" />
                        </View>
                    </View>
                    <View style={styles.groupInfo}>
                        <Text style={styles.groupTitle}>Location</Text>
                        <Text style={styles.groupBody}>
                            We may collect your current location to verify your location and check your location periodically.
                        </Text>
                    </View>
                    
                </View>
                <View style={styles.permissionGroup}>
                    <View style={styles.groupIconWrapper}>
                        <View style={styles.groupIcon}>
                            <MaterialCommunityIcons name="camera" size={wp('6%')} color="#fff" />
                        </View>
                    </View>
                    <View style={styles.groupInfo}>
                        <Text style={styles.groupTitle}>Camera & Storage</Text>
                        <Text style={styles.groupBody}>
                            We may collect your images & documents to access information for the verification of your profile.
                        </Text>
                    </View>
                    
                </View>
            </View>
            <View style={styles.footer}>
                <Button 
                    onPress={() => acceptPermissions()}
                    title="Accept & Access"
                    containerStyle={{ marginTop: hp('5%'), width: wp('85%') }}
                    buttonStyle={{ padding: 15, backgroundColor: '#F1040E', borderRadius: 8 }}
                    titleStyle={{ fontSize: hp('2%') }}
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    backgroundStyle: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#262525'
    },
    body: {
        alignItems: 'center',
        flex: 5,
    },  
    footer: {
        flex: 1
    },  
    permissionIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        backgroundColor: 'grey',
        borderRadius: 40,
        marginBottom: -40,
        marginTop: 60,
        backgroundColor: '#333',
        zIndex: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
    },
    infoBox: {
        width: wp('85%'),
        backgroundColor: '#1D1B1B',
        borderRadius: 15,
        paddingHorizontal: 24,
        paddingBottom: 24,
        elevation: 12
    },
    infoText: {
        color: '#fff',
        marginTop: 55,
        fontSize: hp('1.9%')
    },
    permissionGroup: {
        marginTop: hp('4%'),
        flexDirection: 'row',
        width: wp('85%'),
        alignItems: 'center'
    },
    groupIconWrapper: {
        flex: 2
    }, 
    groupIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('12%'),
        height: wp('12%'),
        borderRadius: wp('7%'),
        backgroundColor: '#F1040E',
        elevation: 10
    },
    groupInfo: {
        flex: 7
    },
    groupTitle: {
        fontSize: hp('2.2%'),
        color: '#fff'
    },
    groupBody: {
        color: '#fff',
        fontSize: hp('1.6%')
    }
});


export default GatewayScreen;