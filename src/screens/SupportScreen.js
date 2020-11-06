import React, { useContext } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';


const SupportScreen = () => {

    const { state } = useContext(AuthContext);

    return(
        <View>
            <View>
                <Image 
                    source={{ uri: state.user.profilePhoto }}
                    style={{ height: 70, width: 70 }}
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({

});


export default SupportScreen;