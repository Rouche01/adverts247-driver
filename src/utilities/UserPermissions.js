import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Alert } from 'react-native';

export const getCameraPermission = async() => {
        if(Constants.platform.android) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

            // console.log(status);
            return status;

            // if(status !== "granted") {
            //     Alert.alert('We need permission to use your camera roll');
            // }
        }
}


export const getLocationPermission = async() => {
    if(Constants.platform.android) {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        return status;
        // if(status !== "granted") {
        //     Alert.alert('We need permission to use your camera roll');
        // } else {
        //     return 'Works';
        // }
    }
}

export const checkCameraPermission = async() => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if(status === "granted") {
        return true;
    } else {
        return false;
    }
}

export const checkLocationPermission = async() => {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    if(status === "granted") {
        return true;
    } else {
        return false;
    }
}
