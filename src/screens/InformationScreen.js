import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import CustomInput from '../components/CustomInput';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as UserContext } from '../context/UserInfoContext';
import useImagePicker from '../hooks/useImagePicker';
import useCloudinary from '../hooks/useCloudinary';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const InformationScreen = ({ navigation }) => {

    const { state: { user }, getUser, signout } = useContext(AuthContext);
    const { updateUser } = useContext(UserContext);
    const [ image, handleImagePick ] = useImagePicker([1, 1]);
    const [ handleUpload ] = useCloudinary(image);
    const [ userInfo, setUserInfo ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        city: ''
    })
    const [ loadingState, setLoadingState ] = useState(false);
    // const [ buttonState, setButtonState ] = useState(true);

    useEffect(() => {
        if(user) {
            setUserInfo({
                firstName: user.name.split(' ')[0],
                lastName: user.name.split(' ')[1],
                email: user.email,
                phoneNumber: `0${user.phoneNumber.toString()}`,
                city: user.city
            })
        }
    }, [user]);


    const onChangeTextInput = (fieldObject) => {
        console.log(Object.keys(fieldObject)[0]);

        const userValue = Object.keys(fieldObject)[0];

        switch(userValue) {
            case 'firstName':
                setUserInfo({...userInfo, firstName: fieldObject[userValue]});
                break;
            case 'lastName':
                setUserInfo({...userInfo, lastName: fieldObject[userValue]});
                break;
            case 'email':
                setUserInfo({...userInfo, email: fieldObject[userValue]});
                break;
            case 'phoneNumber':
                setUserInfo({...userInfo, phoneNumber: fieldObject[userValue]});
                break;
            case 'city':
                setUserInfo({...userInfo, city: fieldObject[userValue]});
                break;
            default:
                setUserInfo({ ...userInfo });
        }
    }

    const saveChanges = async() => {
        setLoadingState(true);
        const data = {};

        if(image) {
            const cloudinaryRef = await handleUpload(image);
            console.log(cloudinaryRef);
            data.profilePhoto = cloudinaryRef.url
        }

        if(userInfo.email !== user.email) {
            data.email = userInfo.email
            // console.log('works')
        }

        if(Number(userInfo.phoneNumber.substring(1)) !== user.phoneNumber) {
            data.phoneNumber = userInfo.phoneNumber
        }

        console.log(data);

        if(Object.keys(data).length > 0) {
            // console.log(data);
            await updateUser(user._id, data, getUser);
        } 
        setLoadingState(false);
    }

    if(!user) {
        return <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size='large' color='black' />
        </View>;
    }

    return(
        <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Your Profile</Text>
                <View style={styles.headerButton}>
                    <Button 
                        title="Transactions"
                        containerStyle={{ marginRight: wp('2%') }}
                        titleStyle={{ fontSize: hp('1.85%') }}
                        buttonStyle={{ paddingHorizontal: 12, borderRadius: 10, backgroundColor: 'black' }}
                        onPress={() => navigation.navigate('Transactions')}
                    />
                    <Button 
                        title="Log out"
                        containerStyle={{  }}
                        titleStyle={{ fontSize: hp('1.85%') }}
                        buttonStyle={{ paddingHorizontal: 12, borderRadius: 10, backgroundColor: '#FF3B30' }}
                        onPress={signout}
                    />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity 
                    style={styles.profilePhoto}
                    onPress={() => handleImagePick()}
                >
                    <Image 
                        source={ !image ? { uri: user.profilePhoto } : { uri: image.uri } }
                        style={styles.avatar}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{ alignItems: 'center', marginTop: 10 }} 
                    onPress={() => handleImagePick()}
                >
                    <Text style={{ fontSize: hp('2.07%'), fontWeight: 'bold', color: 'gray'}}>CHANGE PHOTO</Text>
                </TouchableOpacity>
                <View style={styles.profileForm}>
                <View style={{ flexDirection: 'row' }}>
                    <CustomInput 
                        label="First Name" 
                        autoCapitalize="words"
                        autoCorrect={false}
                        value={userInfo.firstName}
                        onChange={(target) => onChangeTextInput({ firstName: target })}
                        flexStyle={1}
                        margin={5}
                        editable={false}
                    />
                    <CustomInput 
                        label="Last Name"
                        autoCapitalize="words"
                        autoCorrect={false} 
                        value={userInfo.lastName}
                        onChange={(target) => onChangeTextInput({ lastName: target })}
                        flexStyle={1}
                        margin={5}
                        editable={false}
                    />
                </View>
                <CustomInput 
                    label="Email Address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={userInfo.email}
                    onChange={(target) => onChangeTextInput({ email: target })}
                    margin={5}
                />
                <CustomInput 
                    label="Phone Number"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={userInfo.phoneNumber}
                    onChange={(target) => onChangeTextInput({ phoneNumber: target })}
                    margin={5}
                    keyboard="number-pad"
                />
                <CustomInput 
                    label="City"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={userInfo.city}
                    onChange={(target) => onChangeTextInput({ city: target })}
                    margin={5}
                    editable={false}
                />
                </View>
                <Button 
                    title="SAVE CHANGES"
                    containerStyle={{ marginTop: hp('4%'), marginHorizontal: 5 }}
                    buttonStyle={{ backgroundColor: 'rgb(33,36,39)', padding: 15}}
                    titleStyle={{ fontSize: hp('2%') }}
                    loading={loadingState}
                    onPress={() => saveChanges()}
                />
            </ScrollView>
        </SafeAreaView>
    );
}


InformationScreen.navigationOptions = {
    headerShown: false
}



const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp('3.7%')
    },
    headerText: {
        fontSize: hp('2.8%'),
        fontWeight: 'bold'
    },
    headerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    profilePhoto: {
        width: wp('35%'),
        height: wp('35%'),
        backgroundColor: '#D7D7D7',
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: hp('5.2%')
    },
    avatar: {
        width: wp('35%'),
        height: wp('35%'),
        borderRadius: 75,
        position: 'absolute'
    },
    profileForm: {
        marginTop: hp('4.4%')
    }
});


export default InformationScreen;