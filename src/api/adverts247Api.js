import axios from 'axios';


let instance = axios.create({
    baseURL: `https://frozen-escarpment-07199.herokuapp.com/`
});


export default instance;