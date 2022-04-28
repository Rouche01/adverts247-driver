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
    case "add_error_message":
      return { ...state, genericError: action.payload };
    case "clear_generic_error":
      return { ...state, genericError: "" };
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

    const response = await adverts247Api.get("/driver", {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({
      type: "get_user",
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: "add_error_message",
      payload: err.response.data.error,
    });
  }
};

const generateResetPasswordToken = (dispatch) => async (email) => {
  dispatch({ type: "loading_state", payload: true });
  try {
    const response = await adverts247Api.post("/request-reset-token", {
      email,
    });

    dispatch({ type: "loading_state", payload: false });

    customNavigate("ResetToken", { userId: response.data.userId });
  } catch (err) {
    dispatch({ type: "loading_state", payload: false });
    dispatch({
      type: "add_error_message",
      payload: err.response.data.message || "Something went wrong",
    });
  }
};

const verifyResetToken = (dispatch) => async (userId, token) => {
  dispatch({ type: "loading_state", payload: true });
  try {
    const response = await adverts247Api.post("/verify-reset-token", {
      token,
      userId,
    });

    dispatch({ type: "loading_state", payload: false });

    customNavigate("ResetPassword", { userId: response.data.userId });
  } catch (err) {
    dispatch({ type: "loading_state", payload: false });
    dispatch({
      type: "add_error_message",
      payload: err.response.data.message || "Something went wrong",
    });
  }
};

const resetPassword = (dispatch) => async (password, userId) => {
  dispatch({ type: "loading_state", payload: true });
  try {
    await adverts247Api.post("/reset-password", {
      password,
      userId,
    });
    dispatch({ type: "loading_state", payload: false });
  } catch (err) {
    dispatch({ type: "loading_state", payload: false });
    dispatch({
      type: "add_error_message",
      payload: err.response.data.message || "Something went wrong",
    });
  }
};

const clearErrorMessage = (dispatch) => (authAction) => {
  const isSignin = authAction === "signin";
  dispatch({
    type: isSignin ? "clear_signin_error" : "clear_signup_error",
  });
};

const clearGenericError = (dispatch) => () => {
  dispatch({ type: "clear_generic_error" });
};

export const { Context, Provider } = createDataContext(
  authReducer,
  {
    signin,
    signup,
    tryLocalSignin,
    signout,
    clearErrorMessage,
    clearGenericError,
    getUser,
    generateResetPasswordToken,
    verifyResetToken,
    resetPassword,
  },
  {
    token: null,
    signinError: "",
    signupError: "",
    genericError: "",
    user: null,
    loading: false,
    loggedIn: false,
  }
);
