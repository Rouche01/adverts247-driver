import createDataContext from './createDataContext';
import adverts247Api from '../api/adverts247Api';
import AsyncStorage from '@react-native-async-storage/async-storage';


const messageReducer = (state, action) => {
    switch(action.type) {
        case 'set_loading':
            return { ...state, loading: action.payload }
        case 'add_error_message':
            return { ...state, error: action.payload }
        default:
            return state;
    }
}


const sendMessage = (dispatch) => async(message, callback) => {
    dispatch({ type: 'set_loading', payload: true });
    try {
        const token = await AsyncStorage.getItem('token');
        await adverts247Api.post('/messages', message, { headers: { 'Authorization': `Bearer ${token}`}});
        dispatch({ type: 'set_loading', payload: false });
        if(callback) {
            callback();
        }
    } catch(err) {
        dispatch({
            type: 'add_error_message',
            payload: 'There was an error sending your message, please try again'
        })
        dispatch({ type: 'set_loading', payload: false });
    }
}


export const { Context, Provider } = createDataContext(
    messageReducer,
    { sendMessage },
    { loading: false, error: '' }
);