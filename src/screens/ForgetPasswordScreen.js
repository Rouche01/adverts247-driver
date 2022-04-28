import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, StatusBar, Alert } from "react-native";
import { Button } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomInput from "../components/CustomInput";
import { Context as AuthContext } from "../context/AuthContext";

const ForgetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const [validationErrors, setValidationErrors] = useState({
    email: "",
  });

  const {
    state: { loading, genericError },
    generateResetPasswordToken,
    clearGenericError,
  } = useContext(AuthContext);

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
    let validMail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const errorsInit = {};

    let fields = { email };

    for (const key in fields) {
      if (!fields[key]) {
        errorsInit[key] = "This field is required";
      }
      if (fields.email && !fields.email.match(validMail)) {
        errorsInit.email = "Please enter a valid email address";
      }
    }

    setValidationErrors(errorsInit);

    if (Object.entries(errorsInit).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const receiveResetToken = async () => {
    const validated = validateInput();

    if (validated) {
      await generateResetPasswordToken(email);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="rgba(0, 0, 0, 0.2)"
        translucent={true}
        animated={true}
      />
      <Text style={styles.subtitle}>
        Enter your registered email address to receive password reset token.
      </Text>
      <View style={styles.formContainer}>
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
        <Button
          onPress={() => receiveResetToken()}
          title="RESET"
          containerStyle={{ marginTop: 20, marginHorizontal: 10 }}
          buttonStyle={{ backgroundColor: "rgb(33,36,39)", padding: 15 }}
          titleStyle={{ fontSize: hp("2%") }}
          loading={loading}
        />
      </View>
    </View>
  );
};

ForgetPasswordScreen.navigationOptions = {
  headerTitle: "Forgot Password",
  headerStyle: {
    backgroundColor: "rgb(33,36,39)",
  },
  headerTintColor: "#fff",
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: wp("3.5%"),
    paddingHorizontal: wp("4.7%"),
  },
  subtitle: {
    fontSize: hp("2.2%"),
    marginTop: hp("3.6%"),
    textAlign: "center",
    paddingHorizontal: wp("1%"),
  },
  formContainer: {
    marginTop: hp("4%"),
  },
});

export default ForgetPasswordScreen;
