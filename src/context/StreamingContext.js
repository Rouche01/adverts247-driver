import createDataContext from './createDataContext';
import adverts247Api from '../api/adverts247Api';
import AsyncStorage from '@react-native-async-storage/async-storage';


const streamingReducer = (state, action) => {
    switch(action.type) {
        case 'set_streaming_status':
            return { ...state, streamingStatus: action.payload };
        case 'set_error':
            return { ...state, error: action.payload };
        default:
            return state;
    }
}


const switchStreamingStatus = (dispatch) => async(driverId) => {
    console.log(driverId);
    try {
        const token = await AsyncStorage.getItem('token');
        await adverts247Api.patch(`/driver/${driverId}/switch-stream`, {}, { 
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        });
    } catch(err) {
        console.log(err);
        dispatch({
            type: 'set_error',
            payload: err.message
        });
    }
}


const getStreamingStatus = dispatch => async(driverId) => {
    try {
        const response = await adverts247Api.get(`/driver/${driverId}`);
        // console.log(response.data.driver);
        dispatch({ type: 'set_streaming_status', payload: response.data.driver.deviceStatus });
    } catch(err) {
        dispatch({
            type: 'set_error',
            payload: err.message
        });
    }
}


export const { Context, Provider } = createDataContext(
    streamingReducer,
    { switchStreamingStatus, getStreamingStatus },
    { error: null, streamingStatus: 'off' }
)