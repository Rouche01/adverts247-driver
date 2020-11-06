import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


let instance = axios.create({
    baseURL: `http://07cd0e9222b4.ngrok.io`
});

// instance.interceptors.request.use(
//     async (config) => {
//         const token = await AsyncStorage.getItem('token');
//         if(token) {
//             config.headers.Authorization = `Bearer ${token}`
//         }
//     },
//     (err) => {
//         return Promise.reject(err);
//     }
// )

export default instance;