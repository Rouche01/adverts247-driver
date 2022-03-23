import createDataContext from "./createDataContext";
import { customNavigate } from "../navigationRef";
import AsyncStorage from "@react-native-async-storage/async-storage";
import adverts247Api from "../api/adverts247Api";

const authReducer = (state, action) => {
  switch (action.type) {
    case "signin":
      return { ...state, token: action.payload };
    case "signout":
      return { token: null, errorMessage: "", user: null };
    case "add_signin_error":
      return { ...state, signinError: action.payload };
    case "add_signup_error":
      return { ...state, signupError: action.payload };
    case "clear_signin_error":
      return { ...state, signinError: "" };
    case "clear_signup_error":
      return { ...state, signupError: "" };
    case "get_user":
      return { ...state, user: action.payload.user };
    case "loading_state":
      return { ...state, loading: action.payload };
    case "set_user_state":
      return { ...state, loggedIn: action.payload };
    default:
      return state;
  }
};

const signin =
  (dispatch) =>
  async ({ email, password }, callback) => {
    console.log('Works');
    dispatch({
      type: "loading_state",
      payload: true,
    });
    try {
      const response = await adverts247Api.post("/drivers/signin", {
        email,
        password,
      });
      const token = response.data.token;
      await AsyncStorage.setItem("token", token);
      dispatch({
        type: "signin",
        payload: token,
      });
      callback();
      dispatch({
        type: "loading_state",
        payload: false,
      });
    } catch (err) {
      console.log(err.response.data);
      dispatch({
        type: "loading_state",
        payload: false,
      });
      dispatch({
        type: "add_signin_error",
        payload: err.response.data.message || "Something went wrong",
      });
    }
  };

const signup = (dispatch) => async (signupData, callback) => {
  console.log("---auth context---");
  dispatch({ type: "loading_state", payload: true });
  try {
    const response = await adverts247Api.post("/drivers/signup", signupData);
    const token = response.data.token;
    await AsyncStorage.setItem("token", token);
    dispatch({
      type: "signin",
      payload: token,
    });
    if (callback) {
      callback();
    }
    dispatch({ type: "loading_state", payload: false });
    customNavigate("SetupIndex");
  } catch (err) {
    console.log(err.response.data.message);
    dispatch({ type: "loading_state", payload: false });
    dispatch({
      type: "add_signup_error",
      payload: err.response.data.message || "Something went wrong",
    });
  }
};

const tryLocalSignin = (dispatch) => async (callback) => {
  try {
    const token = await AsyncStorage.getItem("token");
    // console.log(token);
    if (token) {
      dispatch({
        type: "signin",
        payload: token,
      });
      if (callback) {
        callback();
      }
      dispatch({ type: "set_user_state", payload: true });
    } else {
      dispatch({ type: "set_user_state", payload: false });
      customNavigate("AuthPrompt");
    }
  } catch (err) {
    customNavigate("AuthPrompt");
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({
    type: "signout",
  });
  customNavigate("AuthPrompt");
};

const getUser = (dispatch) => async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    // console.log(token);
    const response = await adverts247Api.get("/driver", {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data);
    dispatch({
      type: "get_user",
      payload: response.data,
    });
  } catch (err) {
    // console.log(err.response.data.error);
    dispatch({
      type: "add_error_message",
      payload: err.response.data.error,
    });
  }
};

const clearErrorMessage = (dispatch) => async (authAction) => {
  const isSignin = authAction === "signin";
  dispatch({
    type: isSignin ? "clear_signin_error" : "clear_signup_error",
  });
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signin, signup, tryLocalSignin, signout, clearErrorMessage, getUser },
  {
    token: null,
    signinError: "",
    signupError: "",
    user: null,
    loading: false,
    loggedIn: false,
  }
);
