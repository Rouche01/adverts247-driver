import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert, StatusBar } from 'react-native';
import CustomInput from '../components/CustomInput';
import { Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import useNavigateAfterLogin from '../hooks/useNavigateAfterLogin';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const SigninScreen = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const { state: { loading, errorMessage }, signin, 
        clearErrorMessage } = useContext(AuthContext);

    const [ signInAndNavigate ] = useNavigateAfterLogin(email, password);

    useEffect(() => {

        return () => {
            clearErrorMessage();
        }
    }, []);


    useEffect(() => {

        if(errorMessage) {
            Alert.alert(
                "Login Error", 
                "There was an error logging in, try again with the correct credentials",
                [
                    {
                      text: 'Try again',
                    },
                ]
            )
            clearErrorMessage();
        }

    }, [errorMessage])

    // console.log(state.loading);


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent={true} animated={true} />
            <Text style={styles.titleStyle}>Sign In</Text>
            <CustomInput 
                label="Email"
                value={email}
                autoCorrect={false}
                autoCapitalize="none"
                onChange={(value) => {
                    if(errorMessage) {
                        clearErrorMessage();
                    }
                    setEmail(value);
                }}
                margin={10}
            />
            <CustomInput
                label="Password"
                value={password}
                autoCorrect={false}
                autoCapitalize="none"
                onChange={(value) => {
                    if(errorMessage) {
                        clearErrorMessage();
                    }
                    setPassword(value);
                }}
                secureTextEntry={true}
                margin={10}
            />
            <Button
                onPress={() => {signInAndNavigate(signin)}}
                title="SIGN IN"
                containerStyle={{ marginTop: 70, marginHorizontal: 10 }}
                buttonStyle={{ backgroundColor: 'rgb(33,36,39)', padding: 15}}
                titleStyle={{ fontSize: hp('2%') }}
                loading={loading}
            />
        </View>
    );
}


SigninScreen.navigationOptions = {
    headerTitle: 'Adverts247 | Sign In',
    headerStyle: {
        backgroundColor: 'rgb(33,36,39)',
    },
    headerTintColor: '#fff'
}



const styles = StyleSheet.create({
    titleStyle: {
        fontSize: hp('3.8%'),
        marginLeft: wp('2%'),
        marginBottom: 20,
        marginTop: hp('3%')
    },
    container: {
        padding: wp('2%'),
        flex: 1
    },
    errorText: {
        color: 'red',
        marginHorizontal: 10
    }
});


export default SigninScreen;