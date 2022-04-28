import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  StatusBar,
  Pressable,
} from "react-native";
import CustomInput from "../components/CustomInput";
import { Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import useNavigateAfterLogin from "../hooks/useNavigateAfterLogin";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });

  const validateInput = () => {
    let validMail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const errorsInit = {};

    let fields = { email, password };

    for (const key in fields) {
      if (!fields[key]) {
        errorsInit[key] = "This field is required";
      }
      if (fields.email && !fields.email.match(validMail)) {
        errorsInit.email = "Please enter a valid email address";
      }
      if (fields.password && fields.password.length < 8) {
        errorsInit.password = "Password must be at least 8 characters";
      }
    }

    setValidationErrors(errorsInit);

    if (Object.entries(errorsInit).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const {
    state: { loading, signinError },
    signin,
    clearErrorMessage,
  } = useContext(AuthContext);

  const [signInAndNavigate] = useNavigateAfterLogin(email, password);

  const onSignUp = () => {
    const validated = validateInput();

    if (validated) {
      signInAndNavigate(signin);
    }
  };

  useEffect(() => {
    return () => {
      clearErrorMessage();
    };
  }, []);

  useEffect(() => {
    if (signinError) {
      Alert.alert("Login Error", signinError, [
        {
          text: "Try again",
        },
      ]);
      clearErrorMessage("signin");
    }
  }, [signinError]);

  // console.log(state.loading);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="rgba(0, 0, 0, 0.2)"
        translucent={true}
        animated={true}
      />
      <Text style={styles.titleStyle}>Sign In</Text>
      <CustomInput
        label="Email"
        value={email}
        autoCorrect={false}
        autoCapitalize="none"
        validationError={validationErrors?.email || null}
        onChange={(value) => {
          setValidationErrors({ ...validationErrors, email: "" });
          setEmail(value);
        }}
        margin={10}
      />
      <CustomInput
        label="Password"
        value={password}
        autoCorrect={false}
        autoCapitalize="none"
        validationError={validationErrors?.password || null}
        onChange={(value) => {
          setValidationErrors({ ...validationErrors, password: "" });
          setPassword(value);
        }}
        secureTextEntry={true}
        margin={10}
      />
      <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgotPwdLink}>Forgot Password?</Text>
      </Pressable>
      <Button
        onPress={() => onSignUp()}
        title="SIGN IN"
        containerStyle={{ marginTop: 70, marginHorizontal: 10 }}
        buttonStyle={{ backgroundColor: "rgb(33,36,39)", padding: 15 }}
        titleStyle={{ fontSize: hp("2%") }}
        loading={loading}
      />
      <View style={styles.registerBtnGroup}>
        <Text style={styles.registerText}>Don’t have an account? </Text>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signUpBtn}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

SigninScreen.navigationOptions = {
  headerTitle: "Adverts247 | Sign In",
  headerStyle: {
    backgroundColor: "rgb(33,36,39)",
  },
  headerTintColor: "#fff",
};

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: hp("3.8%"),
    marginLeft: wp("2%"),
    marginBottom: 20,
    marginTop: hp("3%"),
  },
  container: {
    padding: wp("2%"),
    flex: 1,
  },
  errorText: {
    color: "red",
    marginHorizontal: 10,
  },
  forgotPwdLink: {
    textAlign: "right",
    textDecorationLine: "underline",
    fontSize: hp("2%"),
    marginRight: 8,
    marginTop: 8,
  },
  registerBtnGroup: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  registerText: {
    fontSize: hp("2%"),
  },
  signUpBtn: {
    fontSize: hp("2%"),
    color: "#FF3B30",
    fontWeight: "bold",
  },
});

export default SigninScreen;
