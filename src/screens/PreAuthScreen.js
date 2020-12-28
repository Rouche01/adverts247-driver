import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import useNavigateWithLocalSignin from '../hooks/useNavigateWithLocalSignin';



const PreAuthScreen = () => {
    
    const { state: { user }, tryLocalSignin } = useContext(AuthContext);
    const [ localSigninAndNavigate ] = useNavigateWithLocalSignin();


    useEffect(() => {

        localSigninAndNavigate(tryLocalSignin);
        // tryLocalSignin(getUser);

    }, [])


    // useEffect(() => {
    //     if(user) {
    //         console.log(user);
    //     }
    // }, [user])


    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size='large' color='black' />
        </View>
    );
}


PreAuthScreen.navigationOptions = {
    headerShown: false
}


const styles = StyleSheet.create({

});


export default PreAuthScreen;