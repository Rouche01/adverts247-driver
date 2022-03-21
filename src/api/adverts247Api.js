import axios from "axios";
import { NODE_ENV, LOCAL_BACKEND_URL, TEST_BACKEND_URL } from "@env";

const isLocalEnv = NODE_ENV === "local";

let instance = axios.create({
  baseURL: "https://frozen-escarpment-07199.herokuapp.com/api",
});

export default instance;
