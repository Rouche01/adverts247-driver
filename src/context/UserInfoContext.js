import createDataContext from './createDataContext';
import adverts247Api from '../api/adverts247Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { customNavigate } from '../navigationRef';


const userReducer = (state, action) => {
    switch(action.type) {
        default:
            return state;
    }
}



const updateUser = (dispatch) => async(userId, data, callback, routeName) => {
    try {
        const token = await AsyncStorage.getItem('token');
        await adverts247Api.patch(`/drivers/${userId}`, data, { headers: { 'Authorization': `Bearer ${token}`}});
        if(callback) {
            callback();
        }
        if(routeName) {
            customNavigate(routeName);
        }
    } catch(err) {
        dispatch({
            type: 'add_error',
            payload: err
        })
    }
};


export const { Context, Provider } = createDataContext(
    userReducer,
    { updateUser },
    { }
);