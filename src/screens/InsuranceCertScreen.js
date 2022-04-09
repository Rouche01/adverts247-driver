import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import DocumentUpload from '../components/DocumentUpload';
import useImagePicker from '../hooks/useImagePicker';
import useCloudinary from '../hooks/useCloudinary';
import useDisableButton from '../hooks/useDisableButton';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as UserContext } from '../context/UserInfoContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const InsuranceCertScreen = ({ navigation }) => {

    const [ loadingState, setLoadingState ] = useState(false);

    const [ image, handleImagePick ] = useImagePicker([4, 3]);
    const [ handleUpload ] = useCloudinary(image);
    const { state, getUser } = useContext(AuthContext);
    const { updateUser } = useContext(UserContext);

    const [ buttonDisable ] = useDisableButton(state.user.insuranceCert, state, image);

    const saveInsuranceCert = async() => {
        if(image) {
            setLoadingState(true);
            const cloudinaryRef = await handleUpload(image);
            // console.log(cloudinaryRef);
            await updateUser(state.user.id, { insuranceCert: cloudinaryRef.url }, getUser, 'VehicleReg');
            setLoadingState(false)
        } else {
            navigation.navigate('VehicleReg');
        }
    }

    // console.log(state);

    return (
        <View style={styles.container}>
            <DocumentUpload
                title="Take a photo of your Vehicle Insurance Certificate"
                subtitle="This docuemnt should say “certificate of insurance” at the top, and will list your coverage limits,it also usually has the names of drivers who are listed in the insurance policy."
                placeholder={require('../assets/InsuranceCert.png')}
                documentImage={image}
                dbImage={state.user.insuranceCert}
                buttonPress={handleImagePick}
            />
            <Button
                onPress={() => saveInsuranceCert()}
                loading={loadingState}
                disabled={buttonDisable}
                title='UPLOAD CERTIFICATE'
                containerStyle={{ flex: 1, width: '100%' }}
                buttonStyle={{ padding: 15, backgroundColor: 'black', borderRadius: 8, marginHorizontal: 20  }}
                titleStyle={{ fontSize: hp('2%') }}
            />
        </View>
    );
}


InsuranceCertScreen.navigationOptions = {
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
        flex: 1
    }
});


export default InsuranceCertScreen;