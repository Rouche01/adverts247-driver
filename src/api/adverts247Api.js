import axios from 'axios';
import { NODE_ENV, LOCAL_BACKEND_URL, TEST_BACKEND_URL } from "@env"

const isLocalEnv = NODE_ENV === "local";

let instance = axios.create({
    baseURL: isLocalEnv ? LOCAL_BACKEND_URL : TEST_BACKEND_URL
});


export default instance;