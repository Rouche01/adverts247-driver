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
    const [ validationErrors, setValidationErrors ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        city: ''
    });

    const { state, signup, clearErrorMessage, getUser, errorMessage } = useContext(AuthContext);

    // console.log(state);

    useEffect(() => {

        return () => {
            clearErrorMessage();
        }
    }, [])


    useEffect(() => {

        if(errorMessage) {
            Alert.alert(
                'Signup Error',
                'An error occured while trying to sign up, make sure you are filling in accurate details and try again',
                [
                    {
                        text: 'Try again',
                    }
                ]
            );
            clearErrorMessage();
        }

    }, [errorMessage])


    const validateInput = () => {

        let validMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let validPhoneNumber = /^[0]\d{10}$/;

        const errorsInit = {}

        let fields = {firstName, lastName, email, phoneNumber, password, city};

        for(const key in fields) {
            if(!fields[key]) {
                errorsInit[key] = "This field is required";
            }
            if(fields.email && !fields.email.match(validMail)) {
                errorsInit.email = "Please enter a valid email address"
            }
            if(fields.phoneNumber && !fields.phoneNumber.match(validPhoneNumber)) {
                errorsInit.phoneNumber = "Looks like your phone number is incorrect. Enter a valid one"
            }
            if(fields.password && fields.password.length < 6) {
                errorsInit.password = "Password must be at least 6 characters"
            }
        }

        console.log(errorsInit);

        setValidationErrors(errorsInit);

        if(Object.entries(errorsInit).length === 0) {
            return true;
        } else {
            return false;
        }
    }


    const onSignup = () => {

        const validated = validateInput();
        console.log(validated);
        if(validated) {
            signup({ email, name: `${firstName} ${lastName}`, phoneNumber, password, city }, getUser);
        } 
    }


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
                    onChange={(value) => {
                        setValidationErrors({...validationErrors, firstName: ''});
                        setFirstName(value);
                    }}
                    flexStyle={1}
                    margin={10}
                    validationError={
                        validationErrors.firstName && validationErrors.firstName.length > 0 ? validationErrors.firstName : null
                    }
                 />
                <CustomInput 
                    label="Last Name"
                    autoCapitalize="words"
                    autoCorrect={false} 
                    value={lastName}
                    onChange={(value) => {
                        setValidationErrors({...validationErrors, lastName: ''});
                        setLastName(value);
                    }}
                    flexStyle={1}
                    margin={10}
                    validationError={
                        validationErrors.lastName && validationErrors.lastName.length > 0 ? validationErrors.lastName : null
                    }
                />
            </View>
            <CustomInput 
                label="Email Address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChange={(value) => {
                    setValidationErrors({...validationErrors, email: ''});
                    setEmail(value);
                }}
                margin={10}
                validationError={
                    validationErrors.email && validationErrors.email.length > 0 ? validationErrors.email : null
                }
            />
            <CustomInput 
                label="Phone Number"
                autoCapitalize="none"
                autoCorrect={false}
                value={phoneNumber}
                onChange={(value) => {
                    setValidationErrors({...validationErrors, phoneNumber:''});
                    setPhoneNumber(value);
                }}
                margin={10}
                keyboard='number-pad'
                validationError={
                    validationErrors.phoneNumber && validationErrors.phoneNumber.length > 0 ? validationErrors.phoneNumber : null
                }
            />
            <CustomInput 
                label="Password"
                autoCapitalize="none"
                autoCorrect={false}
                value={password}
                onChange={(value) => {
                    setValidationErrors({...validationErrors, password: ''});
                    setPassword(value);
                }}
                secureTextEntry={true}
                margin={10}
                validationError={
                    validationErrors.password && validationErrors.password.length > 0 ? validationErrors.password : null
                }
            />
            <CustomInput 
                label="City"
                autoCapitalize="words"
                autoCorrect={false}
                value={city}
                onChange={(value) => {
                    setValidationErrors({...validationErrors, city: ''});
                    setCity(value);
                }}
                margin={10}
                validationError={
                    validationErrors.city && validationErrors.city.length > 0 ? validationErrors.city : null
                }
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
                onPress={() => onSignup()}
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