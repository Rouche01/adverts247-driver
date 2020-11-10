import axios from 'axios';


const instance = axios.create({
    baseURL: `https://api.paystack.co/`,
    headers: {
        'Authorization': 'Bearer sk_test_81a55b311fe04240601246385d630a91fb50e821'
    }
});


export default instance;