import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import DocumentUpload from '../components/DocumentUpload';
import useImagePicker from '../hooks/useImagePicker';
import useCloudinary from '../hooks/useCloudinary';
import useDisableButton from '../hooks/useDisableButton';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as UserContext } from '../context/UserInfoContext';

const VehicleRegScreen = ({ navigation }) => {

    const [ loadingState, setLoadingState ] = useState(false);

    const [ image, handleImagePick ] = useImagePicker([4, 3]);
    const [ handleUpload ] = useCloudinary(image);
    const { state, getUser } = useContext(AuthContext);
    const { updateUser } = useContext(UserContext);

    const [ buttonDisable ] = useDisableButton(state.user.vehicleReg, state, image);

    const saveVehicleReg = async() => {
        if(image) {
            setLoadingState(true);
            const cloudinaryRef = await handleUpload(image);
            console.log(cloudinaryRef);
            await updateUser(state.user._id, { vehicleReg: cloudinaryRef.url }, getUser, 'SetupIndex');
            setLoadingState(false);
        } else {
            navigation.navigate('SetupIndex');
        }
    }

    console.log(state);

    return (
        <View style={styles.container}>
            <DocumentUpload 
                title="Take a photo of your Personal Vehicle License"
                subtitle="Make sure your vehicle’s make,model,year,license plate,VIN,and expiration are clear and visible."
                placeholder={require('../assets/VehicleLicense.png')}
                documentImage={image}
                dbImage={state.user.vehicleReg}
                buttonPress={handleImagePick}
            />
            <Button 
                onPress={() => saveVehicleReg() }
                loading={loadingState}
                disabled={buttonDisable}
                title='UPLOAD LICENSE'
                containerStyle={{ flex: 1, width: '100%' }}
                buttonStyle={{ padding: 15, backgroundColor: 'black', borderRadius: 8, marginHorizontal: 20  }}
                titleStyle={{ fontSize: 17 }}
            />
        </View>
    );
}


VehicleRegScreen.navigationOptions = {
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


export default VehicleRegScreen;