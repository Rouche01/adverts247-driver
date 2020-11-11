import createDataContext from './createDataContext';
import { customNavigate } from '../navigationRef';
import AsyncStorage from '@react-native-async-storage/async-storage';
import adverts247Api from '../api/adverts247Api';


const authReducer = (state, action) => {
    switch(action.type) {
        case 'signin':
            return { ...state, token: action.payload }
        case 'signout':
            return { token: null, errorMessage: '', user: null }
        case 'add_error_message':
            return { ...state, errorMessage: action.payload }
        case 'clear_error_message':
            return { ...state, errorMessage: '' }
        case 'get_user':
            return { ...state, user: action.payload.user }
        case 'loading_state':
            return { ...state, loading: action.payload }
        default:
            return state;
    }
}


const signin = (dispatch) => async({ email, password }, callback) => {
    // console.log('Works');
    dispatch({
        type: 'loading_state',
        payload: true
    })
    try {
        const response = await adverts247Api.post('/drivers/signin', { email, password });
        const token = response.data.token;
        await AsyncStorage.setItem('token', token);
        dispatch({
            type: 'signin',
            payload: token
        })
        callback();
        dispatch({
            type: 'loading_state',
            payload: false
        })
    } catch(err) {
        // console.log(err);
        dispatch({
            type: 'loading_state',
            payload: false
        });
        dispatch({
            type: 'add_error_message',
            payload: 'You are logging in with wrong credentials'
        })
    }
}

const signup = (dispatch) => async (signupData, callback) => {
    // console.log('Works');
    dispatch({ type: 'loading_state', payload: true });
    try {
        const response = await adverts247Api.post('/drivers/signup', signupData);
        const token = response.data.token;
        await AsyncStorage.setItem('token', token);
        dispatch({
            type: 'signin',
            payload: token
        })
        if(callback) {
            callback();
        }
        dispatch({ type: 'loading_state', payload: false });
        customNavigate('SetupIndex');
    } catch(err) {
        dispatch({ type: 'loading_state', payload: false });
        dispatch({
            type: 'add_error_message',
            payload: 'There was an error trying to sign up, please try again'
        })
    }
}

const tryLocalSignin = (dispatch) => async(callback) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if(token) {
            dispatch({
                type: 'signin',
                payload: token
            })
            if(callback) {
                callback();
            }
            // customNavigate('SetupIndex');
            return true;
        } else {
            return false;
        }
    } catch(err) {
        customNavigate('AuthPrompt');
    }
    
}

const signout = (dispatch) => async() => {
    await AsyncStorage.removeItem('token')
    dispatch({
        type: 'signout',
    })
    customNavigate('AuthPrompt')
}

const getUser = (dispatch) => async() => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await adverts247Api.get('/driver', { headers: { 'Authorization': `Bearer ${token}`}});
        dispatch({
            type: 'get_user',
            payload: response.data
        })
    } catch(err) {
        dispatch({
            type: 'add_error_message',
            payload: err
        })
    }
};


const clearErrorMessage = (dispatch) => async() => {
    console.log('Works');
    dispatch({
        type: 'clear_error_message'
    })
}


export const { Context, Provider } = createDataContext(
    authReducer,
    { signin, signup, tryLocalSignin, signout, clearErrorMessage, getUser },
    { token: null, errorMessage: '', user: null, loading: false }
);