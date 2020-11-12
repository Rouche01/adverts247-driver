import axios from 'axios';


let instance = axios.create({
    baseURL: `https://salty-bayou-92177.herokuapp.com/`
});


export default instance;