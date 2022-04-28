import axios from "axios";
import { NODE_ENV, LOCAL_BACKEND_URL, TEST_BACKEND_URL } from "@env";

const isLocalEnv = NODE_ENV === "local";

// http://5650-2001-4dd6-85cb-0-d02b-602b-3f65-ea8d.ngrok.io
// https://frozen-escarpment-07199.herokuapp.com

let instance = axios.create({
  baseURL: "https://frozen-escarpment-07199.herokuapp.com/api",
});

export default instance;
