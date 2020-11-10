import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as MessageContext } from '../context/MessageContext';


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
                />
                <Button 
                    title="SEND MESSAGE"
                    containerStyle={{ marginTop: 55 }}
                    buttonStyle={{ padding: 15, backgroundColor: 'black', borderRadius: 8 }}
                    titleStyle={{ fontSize: 17 }}
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
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 40
    },
    contactForm: {
        marginTop: 30
    },
    label: {
        fontSize: 18
    },
    supportInput: {
        width: '100%',
        backgroundColor: '#E3E3E3',
        borderRadius: 5,
        marginTop: 15,
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontSize: 16
    }
});


export default SupportScreen;