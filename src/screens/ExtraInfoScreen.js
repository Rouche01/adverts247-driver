import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, ScrollView, StatusBar, Text, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomInput from '../components/CustomInput';
import { Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext'


const ExtraInfoScreen = ({ navigation }) => {

    const [ favouriteMeal, setFavouriteMeal ] = useState('');
    const [ favouriteHobby, setFavouriteHobby ] = useState('');
    const [ vacationSpot, setVacationSpot ] = useState('');
    const [ askMeAbout, setAskMeAbout ] = useState('');
    const [ validationErrors, setValidationErrors ] = useState({
        favouriteMeal: '',
        favouriteHobby: '',
        vacationSpot: '',
        askMeAbout: ''
    });

    const { 
        state: { loading, errorMessage }, 
        signup, 
        clearErrorMessage, 
        getUser, 
    } = useContext(AuthContext);

    useEffect(() => {

        return () => {
            clearErrorMessage();
        }
        
    }, [])

    useEffect(() => {
        if(errorMessage) {
            console.log(errorMessage);
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

        const errorsInit = {};

        const fields = { favouriteMeal, favouriteHobby, vacationSpot, askMeAbout };

        for(const key in fields) {
            if(!fields[key]) {
                errorsInit[key] = 'This field is required';
            }
        }

        setValidationErrors(errorsInit);

        if(Object.entries(errorsInit).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    const onSignup = () => {
        const validated = validateInput();

        const extraInfo = {
            favouriteMeal,
            favouriteHobby,
            askMeAbout,
            vacationSpot
        }

        const { email, name, phoneNumber, password, city } = navigation.state.params.registerInfo;

        if(validated) {
            signup({ email, name, phoneNumber, password, city, extraInfo }, getUser);
        } 
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.formContainer}>
                <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent={true} animated={true} />
                <Text style={styles.titleStyle}>Extra Information</Text>
                <Text style={styles.subText}>
                    Help your riders know a bit more about you, by sharing some intersting personal info.
                </Text>
                <CustomInput 
                    label="What's your favourite meal?" 
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={favouriteMeal}
                    onChange={(value) => {
                        setValidationErrors({...validationErrors, favouriteMeal: ''});
                        setFavouriteMeal(value);
                    }}
                    flexStyle={1}
                    margin={10}
                    validationError={
                        validationErrors.favouriteMeal && validationErrors.favouriteMeal.length > 0 ? validationErrors.favouriteMeal : null
                    }
                />
                <CustomInput 
                    label="What's your favourite hobby?" 
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={favouriteHobby}
                    onChange={(value) => {
                        setValidationErrors({...validationErrors, favouriteHobby: ''});
                        setFavouriteHobby(value);
                    }}
                    flexStyle={1}
                    margin={10}
                    validationError={
                        validationErrors.favouriteHobby && validationErrors.favouriteHobby.length > 0 ? validationErrors.favouriteHobby : null
                    }
                />
                <CustomInput 
                    label="Your vacation spot" 
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={vacationSpot}
                    onChange={(value) => {
                        setValidationErrors({...validationErrors, vacationSpot: ''});
                        setVacationSpot(value);
                    }}
                    flexStyle={1}
                    margin={10}
                    validationError={
                        validationErrors.vacationSpot && validationErrors.vacationSpot.length > 0 ? validationErrors.vacationSpot : null
                    }
                />
                <CustomInput 
                    label="Ask me about?" 
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={askMeAbout}
                    onChange={(value) => {
                        setValidationErrors({...validationErrors, askMeAbout: ''});
                        setAskMeAbout(value);
                    }}
                    flexStyle={1}
                    margin={10}
                    helpInfo="What is an interesting topic that you like to discuss"
                    validationError={
                        validationErrors.askMeAbout && validationErrors.askMeAbout.length > 0 ? validationErrors.askMeAbout : null
                    }
                />
            </ScrollView>
            <Button 
                title="SIGN UP"
                containerStyle={{ marginTop: 30, marginHorizontal: 10, marginBottom: 60 }}
                buttonStyle={{ backgroundColor: 'rgb(33,36,39)', padding: 15}}
                titleStyle={{ fontSize: hp('2%') }}
                onPress={() => onSignup()}
                loading={loading}
            />
        </View>
    );
}


ExtraInfoScreen.navigationOptions = {
    headerTitle: 'Sign Up | Personal Info',
    headerStyle: {
        backgroundColor: 'rgb(33,36,39)',
    },
    headerTintColor: '#fff'
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    formContainer: {
        padding: wp('2%'),
        flex: 1
    },
    titleStyle: {
        fontSize: hp('3.8%'),
        marginLeft: wp('2%'),
        marginTop: hp('3%')
    },
    subText: {
        marginBottom: 20,
        marginLeft: wp('2%'),
        fontSize: 15
    }
});


export default ExtraInfoScreen;