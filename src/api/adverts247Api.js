import axios from 'axios';


let instance = axios.create({
    baseURL: `http://7fbef18b1e66.ngrok.io`
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