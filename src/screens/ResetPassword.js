import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, StatusBar, Text, Alert } from "react-native";
import { Button } from "react-native-elements";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import CustomInput from "../components/CustomInput";
import { Context as AuthContext } from "../context/AuthContext";

const ResetPassword = ({ navigation }) => {
  const [password, setPassword] = useState();
  const [passwordRetyped, setPasswordRetyped] = useState();

  const { userId } = navigation.state.params;

  const {
    state: { loading, genericError },
    resetPassword,
    clearGenericError,
  } = useContext(AuthContext);

  const [validationErrors, setValidationErrors] = useState({
    password: "",
    passwordRetyped: "",
  });

  useEffect(() => {
    if (genericError) {
      Alert.alert("Error", genericError, [
        {
          text: "OK",
        },
      ]);
      clearGenericError();
    }
  }, [genericError]);

  const validateInput = () => {
    const errorsInit = {};

    let fields = { password, passwordRetyped };

    for (const key in fields) {
      if (!fields[key]) {
        errorsInit[key] = "This field is required";
      }
      if (fields.password && fields.password.length < 8) {
        errorsInit.password = "Password must be at least 8 characters";
      }
      if (
        fields.passwordRetyped &&
        fields.passwordRetyped !== fields.password
      ) {
        errorsInit.passwordRetyped = "Password don't match";
      }
    }

    setValidationErrors(errorsInit);

    if (Object.entries(errorsInit).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const onPasswordReset = async () => {
    const validated = validateInput();

    if (validated) {
      await resetPassword(password, userId);
      Alert.alert("Success", "Your password reset was successful!", [
        { text: "Sign in", onPress: () => navigation.navigate("Signin") },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="rgba(0, 0, 0, 0.2)"
        translucent={true}
        animated={true}
      />
      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>Enter new password and confirm it</Text>
        <CustomInput
          label="New password"
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
        <CustomInput
          label="Retype new password"
          value={passwordRetyped}
          autoCorrect={false}
          autoCapitalize="none"
          validationError={validationErrors?.passwordRetyped || null}
          onChange={(value) => {
            setValidationErrors({ ...validationErrors, passwordRetyped: "" });
            setPasswordRetyped(value);
          }}
          secureTextEntry={true}
          margin={10}
        />
        <Button
          onPress={() => onPasswordReset()}
          title="RESET"
          containerStyle={{ marginTop: 70, marginHorizontal: 10 }}
          buttonStyle={{ backgroundColor: "rgb(33,36,39)", padding: 15 }}
          titleStyle={{ fontSize: hp("2%") }}
          loading={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: wp("3.5%"),
    paddingHorizontal: wp("3.5%"),
  },
  subtitle: {
    fontSize: hp("2.1%"),
    paddingHorizontal: wp("2%"),
    marginBottom: 20,
  },
  formContainer: {
    marginTop: 40,
  },
});

export default ResetPassword;
