import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';


const PreAuthScreen = () => {
    
    const { tryLocalSignin, getUser } = useContext(AuthContext);

    useEffect(() => {
        tryLocalSignin(getUser);
    }, [])

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