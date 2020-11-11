import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomInput from '../components/CustomInput';
import { Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import useNavigateAfterLogin from '../hooks/useNavigateAfterLogin';


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

    // console.log(state.loading);


    return (
        <View style={styles.container}>
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
            { errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null }
            <Button
                onPress={() => {signInAndNavigate(signin)}}
                title="SIGN IN"
                containerStyle={{ marginTop: 70, marginHorizontal: 10 }}
                buttonStyle={{ backgroundColor: 'rgb(33,36,39)', padding: 15}}
                titleStyle={{ fontSize: 17 }}
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
        fontSize: 32,
        marginLeft: 10,
        marginBottom: 20,
        marginTop: 15
    },
    container: {
        padding: 10,
        flex: 1
    },
    errorText: {
        color: 'red',
        marginHorizontal: 10
    }
});


export default SigninScreen;