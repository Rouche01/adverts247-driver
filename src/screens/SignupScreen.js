import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, StatusBar } from "react-native";
import CustomInput from "../components/CustomInput";
import { Button } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SignupScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    city: "",
  });

  // console.log(state);

  const validateInput = () => {
    let validMail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let validPhoneNumber = /^[0]\d{10}$/;

    const errorsInit = {};

    let fields = { firstName, lastName, email, phoneNumber, password, city };

    for (const key in fields) {
      if (!fields[key]) {
        errorsInit[key] = "This field is required";
      }
      if (fields.email && !fields.email.match(validMail)) {
        errorsInit.email = "Please enter a valid email address";
      }
      if (fields.phoneNumber && !fields.phoneNumber.match(validPhoneNumber)) {
        errorsInit.phoneNumber =
          "Looks like your phone number is incorrect. Enter a valid one";
      }
      if (fields.password && fields.password.length < 6) {
        errorsInit.password = "Password must be at least 6 characters";
      }
    }

    // console.log(errorsInit);

    setValidationErrors(errorsInit);

    if (Object.entries(errorsInit).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const onContinue = () => {
    const validated = validateInput();
    const registerInfo = {
      email: email.trim(),
      name: `${firstName.trim()} ${lastName.trim()}`,
      phoneNumber: phoneNumber.trim(),
      password: password.trim(),
      city: city.trim(),
    };

    if (validated) {
      navigation.navigate("ExtraInfo", { registerInfo });
    }

    // console.log(validated);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.titleStyle}>Create Account</Text>
          <StatusBar
            backgroundColor="rgba(0, 0, 0, 0.2)"
            translucent={true}
            animated={true}
          />
          <View style={{ flexDirection: "row" }}>
            <CustomInput
              label="First Name"
              autoCapitalize="words"
              autoCorrect={false}
              value={firstName}
              onChange={(value) => {
                setValidationErrors({ ...validationErrors, firstName: "" });
                setFirstName(value);
              }}
              flexStyle={1}
              margin={10}
              validationError={validationErrors?.firstName || null}
            />
            <CustomInput
              label="Last Name"
              autoCapitalize="words"
              autoCorrect={false}
              value={lastName}
              onChange={(value) => {
                setValidationErrors({ ...validationErrors, lastName: "" });
                setLastName(value);
              }}
              flexStyle={1}
              margin={10}
              validationError={validationErrors?.lastName || null}
            />
          </View>
          <CustomInput
            label="Email Address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChange={(value) => {
              setValidationErrors({ ...validationErrors, email: "" });
              setEmail(value);
            }}
            margin={10}
            validationError={validationErrors?.email || null}
          />
          <CustomInput
            label="Phone Number"
            autoCapitalize="none"
            autoCorrect={false}
            value={phoneNumber}
            onChange={(value) => {
              setValidationErrors({ ...validationErrors, phoneNumber: "" });
              setPhoneNumber(value);
            }}
            margin={10}
            keyboard="number-pad"
            validationError={validationErrors?.phoneNumber || null}
          />
          <CustomInput
            label="Password"
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChange={(value) => {
              setValidationErrors({ ...validationErrors, password: "" });
              setPassword(value);
            }}
            secureTextEntry={true}
            margin={10}
            validationError={validationErrors?.password || null}
          />
          <CustomInput
            label="City"
            autoCapitalize="words"
            autoCorrect={false}
            value={city}
            onChange={(value) => {
              setValidationErrors({ ...validationErrors, city: "" });
              setCity(value);
            }}
            margin={10}
            validationError={validationErrors?.city || null}
          />
          <CustomInput
            label="Invite Code"
            autoCapitalize="none"
            autoCorrect={false}
            value={inviteCode}
            onChange={(value) => {
              setInviteCode(value);
            }}
            margin={10}
          />
          <Text style={styles.legalStyle}>
            By proceeding , I agree to Adverts 247’s Terms of Use and
            acknowledge that I have read the Privacy Policy.
          </Text>
          <Text style={styles.legalStyle}>
            I also agree that adverts 247 or it’s representatives may contact me
            by email , phone or SMS (including by automated means) at the email
            address or number I provide,including for marketing purposes.
          </Text>
        </ScrollView>
      </View>
      <Button
        title="CONTINUE"
        containerStyle={{
          marginTop: 30,
          flex: 1.5,
          marginHorizontal: 10,
          marginBottom: 30,
        }}
        buttonStyle={{ backgroundColor: "rgb(33,36,39)", padding: 15 }}
        titleStyle={{ fontSize: hp("2%") }}
        onPress={() => onContinue()}
      />
    </View>
  );
};

SignupScreen.navigationOptions = {
  headerTitle: "Adverts247 | Sign Up",
  headerStyle: {
    backgroundColor: "rgb(33,36,39)",
  },
  headerTintColor: "#fff",
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp("2%"),
    flex: 12,
  },
  titleStyle: {
    fontSize: hp("3.8%"),
    marginLeft: wp("2%"),
    marginBottom: 20,
    marginTop: hp("3%"),
  },
  legalStyle: {
    fontSize: 14,
    margin: 10,
    opacity: 0.7,
  },
  errorStyle: {
    color: "red",
    marginHorizontal: 10,
  },
});

export default SignupScreen;
