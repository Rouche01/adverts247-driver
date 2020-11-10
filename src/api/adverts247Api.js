import axios from 'axios';


let instance = axios.create({
    baseURL: `http://5c511ab37522.ngrok.io`
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