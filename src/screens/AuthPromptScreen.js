import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Button } from 'react-native-elements';


const AuthPromptScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* <Text h1>Hello</Text> */}
            <View style={styles.backgroundStyle}>
               <ImageBackground 
                    source={require('../assets/driver-landing.jpg')}
                    style={{ flex: 1, resizeMode: 'cover' }}
                >
                    <View style={styles.overlayStyle}>
                        <Image 
                            style={styles.logoStyle}
                            source={require('../assets/logo.png')} 
                        />
                    </View>
               </ImageBackground>
            </View>
            <View style={styles.callToActionWrapper}>
                <Text style={styles.welcomeText} h3>Welcome to Adverts247</Text>
                <View style={styles.buttonContainer}>
                    <Button 
                        onPress={() => navigation.navigate('Signin')}
                        containerStyle={{ flex: 1, marginRight: 15 }} 
                        buttonStyle={{ padding: 14, backgroundColor: '#FF3B30' }}
                        titleStyle={styles.buttonTitle}
                        title="SIGN IN" 
                    />
                    <Button 
                        onPress={() => navigation.navigate('Signup')}
                        containerStyle={{ flex: 1 }} 
                        buttonStyle={{ padding: 14, backgroundColor: '#FFF' }} 
                        titleStyle={styles.buttonTitle}
                        title="REGISTER" 
                    />
                </View>
            </View>     
        </View>
    );
}


AuthPromptScreen.navigationOptions = {
    headerShown: false
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlayStyle: {
        height: '100%', 
        width: '100%', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    logoStyle: {
        marginLeft: 30,
        position: 'absolute',
        top: 100
    },  
    backgroundStyle: {
        flex: 1,
    },
    callToActionWrapper: {
        height: 290,
        width: '100%',
        backgroundColor: 'rgb(33,36,39)',
        padding: 30
    },
    welcomeText: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'normal'
    },
    buttonContainer: {
        flexDirection: 'row', 
        marginTop: 30 
    },
    buttonTitle: {
        color: 'black', 
        fontSize: 18 
    }
});


export default AuthPromptScreen;