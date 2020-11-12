import axios from 'axios';


let instance = axios.create({
    baseURL: `https://api.cloudinary.com/v1_1/pureverb/image/upload`,
    // cancelToken: source.token
});

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

export default instance;
