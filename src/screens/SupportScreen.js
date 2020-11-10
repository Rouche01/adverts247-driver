import React, { useContext } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';


const SupportScreen = () => {

    const { state } = useContext(AuthContext);

    return(
        <View>
            
        </View>
    );
}


const styles = StyleSheet.create({

});


export default SupportScreen;