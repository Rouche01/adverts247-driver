import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-navigation';
import { AntDesign } from '@expo/vector-icons';
import useImagePicker from '../hooks/useImagePicker';
import useCloudinary from '../hooks/useCloudinary';
import useDisableButton from '../hooks/useDisableButton';
import { Context as UserContext } from '../context/UserInfoContext';
import { Context as AuthContext } from '../context/AuthContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const ProfilePhotoScreen = ({ navigation }) => {

    const [ loadingState, setLoadingState ] = useState(false);

    const { updateUser } = useContext(UserContext);
    const { state, getUser } = useContext(AuthContext)
    const [ image, handleImagePick ] = useImagePicker([1, 1]);
    const [ handleUpload, cancelCloudinarySubscription ] = useCloudinary();
    const [ buttonDisable ] = useDisableButton(state.user.profilePhoto, state, image);


    useEffect(() => {

        return () => {

            cancelCloudinarySubscription();
        }

    }, []);


    const saveProfileImage = async() => {
        if(image) {
            setLoadingState(true);
            const cloudinaryRef = await handleUpload(image);
            console.log(cloudinaryRef);
            if(cloudinaryRef) {
                await updateUser(
                    state.user._id, 
                    { profilePhoto: cloudinaryRef.url }, 
                    getUser, 'DriversLicense'
                );
            }
            setLoadingState(false);
        } else {
            navigation.navigate('DriversLicense');
        } 
    }

    const resolveImage = () => {
        if(image) {
            return <Image 
                source={{ uri: image.uri }}
                style={styles.avatar}
            />
        } else if(state.user.profilePhoto) {
            return <Image 
                source={{ uri: state.user.profilePhoto }}
                style={styles.avatar}
            />
        } else {
            return <AntDesign 
                name='adduser'
                size={70}
                color='rgba(255, 255, 255, 1)'
            />
        }
    }

    // console.log(state);

    return (
        <View style={styles.container}>
            <View style={{ flex: 5 }}>
                <Text style={styles.mainText}>Take your profile photo</Text>
                <Text style={styles.subText}>Note: Your profile should meet the following requirement.</Text>
                <View style={styles.requirementList}>
                    <Text style={styles.requirement}>1. Show your whole face and tops of your shoulders.</Text>
                    <Text style={styles.requirement}>2. Take your sunglasses and hat off.</Text>
                    <Text style={styles.requirement}>3. Take your photo in a well-lit place.</Text>
                </View>
                <TouchableOpacity style={styles.avatarPlaceholder} 
                    onPress={() => handleImagePick()}>
                    {resolveImage()}
                </TouchableOpacity>
            </View>
            <Button 
                onPress={() => { saveProfileImage() }}
                loading={loadingState}
                disabled={buttonDisable}
                title='UPLOAD PHOTO'
                containerStyle={{ flex: 1, width: '100%'  }}
                buttonStyle={{ padding: 15, backgroundColor: 'black', borderRadius: 8 }}
                titleStyle={{ fontSize: hp('2%') }}
            />
        </View>
    );
}


ProfilePhotoScreen.navigationOptions = {
    headerStyle: {
        backgroundColor: 'rgb(33,36,39)',
    },
    headerTitle: '',
    headerTintColor: '#fff',
    headerRight: () => (
        <Button 
            title='Help'
            containerStyle={{ marginRight: 20, borderRadius: 8 }}
            buttonStyle={{ backgroundColor: '#fff', paddingHorizontal: 25 }}
            titleStyle={{ color: '#000' }}
        />
    )
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp('3.4%'),
        paddingTop: 30,
        flex: 1
    },
    mainText: {
        fontSize: hp('3.4%'),
        fontWeight: 'bold',
    },
    subText: {
        fontSize: hp('1.9%'),
        marginTop: 8
    },
    requirementList: {
        marginTop: hp('3%')
    },
    requirement: {
        color: '#8E8E93',
        fontSize: 14
    },
    avatarPlaceholder: {
        width: hp('30%'),
        height: hp('30%'),
        backgroundColor: '#D7D7D7',
        borderRadius: 125,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: hp('5%')
    },
    avatar: {
        width: hp('30%'),
        height: hp('30%'),
        borderRadius: 125,
        position: 'absolute'
    }
});



export default ProfilePhotoScreen;
