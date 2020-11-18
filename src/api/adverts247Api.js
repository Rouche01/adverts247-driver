import axios from 'axios';


let instance = axios.create({
    baseURL: `http://a2b30da4523f.ngrok.io`
});


export default instance;