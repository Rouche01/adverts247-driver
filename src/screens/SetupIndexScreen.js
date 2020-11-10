import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import NavTabs from '../components/NavTabs';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as UserContext } from '../context/UserInfoContext';


const SetupIndexScreen = ({ navigation }) => {

    const [ firstName, setFirstName ] = useState('');
    const [buttonDisable, setButtonDisable] = useState(true);

    const { state, signout } = useContext(AuthContext);

    // console.log(state);

    useEffect(() => {
        if(state.user) {
            if(state.user.profilePhoto 
                && state.user.driversLicense 
                && state.user.vehicleReg
                && state.user.insuranceCert) {
                    setButtonDisable(false);
                }
        }
    }, [state])

    useEffect(() => {

        if(state.user) {
            setFirstName(state.user.name.split(' ')[0]);
        }
    }, [state])

    if(!state.user) {
        return <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size='large' color='black' />
        </View>;
    }

    return (

        <SafeAreaView forceInset={{ top: 'always' }}>
            <View style={styles.customHeader}>
                <Image 
                    source={require('../assets/logo.png')}
                    style={{ height: 35, width: 150 }}
                    resizeMode='contain'
                />
                <Button 
                    // onPress={() => signout()}
                    title="Help"
                    containerStyle={{ borderRadius: 8 }}
                    buttonStyle={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
                    titleStyle={{ color: '#000' }}
                />
            </View>
            <View style={styles.body}>
                <Text style={styles.mainText}>Welcome, {firstName}</Text>
                <Text style={styles.subtitleText}>
                    You need to meet the following steps to set up your account.
                </Text>
                <NavTabs 
                    routeName='ProfilePhoto' 
                    subText='Recommended next step' 
                    mainText='Profile Photo'
                    complete={state.user.profilePhoto} 
                />
                <NavTabs 
                    routeName='DriversLicense'
                    subText='Get Started' 
                    mainText="Driver's License"
                    complete={state.user.driversLicense}
                />
                <NavTabs 
                    routeName='InsuranceCert'
                    subText='Get Started' 
                    mainText='Insurance Certificate'
                    complete={state.user.insuranceCert} 
                />
                <NavTabs 
                    routeName='VehicleReg'
                    subText='Get Started' 
                    mainText='Vehicle Registration'
                    complete={state.user.vehicleReg} 
                />
                <Button 
                    onPress={() => navigation.navigate('mainFlow')}
                    disabled={buttonDisable}
                    disabledStyle={{ backgroundColor: "#979797", padding: 15, borderRadius: 8 }}
                    disabledTitleStyle={{ color: '#fff' }}
                    title="CONTINUE"
                    containerStyle={{ marginTop: 45, marginHorizontal: 15 }}
                    buttonStyle={{ padding: 15, backgroundColor: 'black', borderRadius: 8, marginHorizontal: 20 }}
                    titleStyle={{ fontSize: 17 }}
                />
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    body: {
        marginTop: 20
    },  
    mainText: {
        fontSize: 28,
        fontWeight: "bold",
        marginLeft: 15
    },
    subtitleText: {
        fontSize: 17,
        marginHorizontal: 15,
        marginTop: 10,
        marginBottom: 20
    },
    customHeader: {
        backgroundColor: 'rgb(33,36,39)',
        height: 70,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        flexDirection: 'row'
    },
    subText: {
        fontSize: 13
    }
});


SetupIndexScreen.navigationOptions = {
    headerShown: false
}


export default SetupIndexScreen;