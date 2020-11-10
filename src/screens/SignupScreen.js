import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import CustomInput from '../components/CustomInput';
import { Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';


const SignupScreen = () => {
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ city, setCity ] = useState('');
    const [ inviteCode, setInviteCode ] = useState('');

    const { state, signup, clearErrorMessage, getUser } = useContext(AuthContext);

    // console.log(state);

    useEffect(() => {

        return () => {
            clearErrorMessage();
        }
    }, [])


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.titleStyle}>Create Account</Text>
            { state.errorMessage ? <Text style={styles.errorStyle}>{state.errorMessage}</Text> : null }
            <View style={{ flexDirection: 'row' }}>
                <CustomInput 
                    label="First Name" 
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={firstName}
                    onChange={setFirstName}
                    flexStyle={1}
                    margin={10}
                 />
                <CustomInput 
                    label="Last Name"
                    autoCapitalize="words"
                    autoCorrect={false} 
                    value={lastName}
                    onChange={setLastName}
                    flexStyle={1}
                    margin={10}
                />
            </View>
            <CustomInput 
                label="Email Address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChange={setEmail}
                margin={10}
            />
            <CustomInput 
                label="Phone Number"
                autoCapitalize="none"
                autoCorrect={false}
                value={phoneNumber}
                onChange={setPhoneNumber}
                margin={10}
                keyboard='number-pad'
            />
            <CustomInput 
                label="Password"
                autoCapitalize="none"
                autoCorrect={false}
                value={password}
                onChange={setPassword}
                secureTextEntry={true}
                margin={10}
            />
            <CustomInput 
                label="City"
                autoCapitalize="words"
                autoCorrect={false}
                value={city}
                onChange={setCity}
                margin={10}
            />
            <CustomInput 
                label="Invite Code"
                autoCapitalize="none"
                autoCorrect={false}
                value={inviteCode}
                onChange={setInviteCode}
                margin={10}
            />
            <Text style={styles.legalStyle}>By proceeding , I agree to Adverts 247’s Terms of Use and acknowledge that I have read the Privacy Policy.</Text>
            <Text style={styles.legalStyle}>I also agree that adverts 247 or it’s representatives may contact me by email , phone or SMS (including by automated means) at the email address or number I provide,including for marketing purposes.</Text>
            <Button 
                title="CONTINUE"
                containerStyle={{ marginTop: 30, marginHorizontal: 10, marginBottom: 60 }}
                buttonStyle={{ backgroundColor: 'rgb(33,36,39)', padding: 15}}
                titleStyle={{ fontSize: 17 }}
                onPress={
                    () => signup({ email, name: `${firstName} ${lastName}`, phoneNumber, password, city }, getUser)
                }
                loading={state.loading}
            />
        </ScrollView>
    );
}


SignupScreen.navigationOptions = {
    headerTitle: 'Adverts247 | Sign Up',
    headerStyle: {
        backgroundColor: 'rgb(33,36,39)',
    },
    headerTintColor: '#fff'
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1
    },
    titleStyle: {
        fontSize: 32,
        marginLeft: 10,
        marginBottom: 20,
        marginTop: 15
    },
    legalStyle: {
        fontSize: 14,
        margin: 10,
        opacity: 0.7
    },
    errorStyle: {
        color: 'red',
        marginHorizontal: 10
    }
});


export default SignupScreen;