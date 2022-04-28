import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Alert, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from "react-native-safe-area-context";
import { Context as MessageContext } from '../context/MessageContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const SupportScreen = () => {

    const { state: { loading, error }, sendMessage } = useContext(MessageContext);
    const [ supportMessage, setSupportMessage ] = useState('');
    const [ buttonState, setButtonState ] = useState(true);

    useEffect(() => {

        if(supportMessage) {
            setButtonState(false);
        } else {
            setButtonState(true);
        }

    }, [supportMessage]);

    const onMessageSentCallback = () => {
        setSupportMessage('');
        Alert.alert('Notice', 'Your message was sent successfully, we will get in touch with you as soon as possible through your email or phone');
    }

    return(
        <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
            <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
            <Text style={styles.titleText}>Contact Us</Text>
            <View style={styles.contactForm}>
                <Text style={styles.label}>Your Message</Text>
                <TextInput
                    style={styles.supportInput}
                    multiline={true}
                    textAlignVertical='top'
                    numberOfLines={13}
                    value={supportMessage}
                    onChangeText={setSupportMessage}
                    returnKeyType="done"
                />
                <Button
                    title="SEND MESSAGE"
                    containerStyle={{ marginTop: hp('5%') }}
                    buttonStyle={{ padding: 15, backgroundColor: 'black', borderRadius: 8 }}
                    titleStyle={{ fontSize: hp('2%') }}
                    loading={loading}
                    disabled={buttonState}
                    disabledStyle={{ backgroundColor: "#979797" }}
                    disabledTitleStyle={{ color: '#fff', opacity: 0.8 }}
                    onPress={() => sendMessage({message: supportMessage}, onMessageSentCallback)}
                />
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    titleText: {
        fontSize: hp('3.1%'),
        fontWeight: 'bold',
        marginTop: 40
    },
    contactForm: {
        marginTop: 30
    },
    label: {
        fontSize: hp('2.2%')
    },
    supportInput: {
        width: '100%',
        backgroundColor: '#E3E3E3',
        height: hp("25%"),
        borderRadius: 5,
        marginTop: 15,
        paddingHorizontal: hp('2%'),
        paddingVertical: 20,
        fontSize: hp('2.2%')
    }
});


export default SupportScreen;