import React, { useEffect, useState } from "react";
import { StyleSheet, View, StatusBar, Text, Image } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import CodeInput from "../components/CodeInput";

const TOKEN_LENGTH = 4;

const ResetTokenScreen = ({ navigation }) => {
  const [code, setCode] = useState("");

  useEffect(() => {
    if (code.length === 4) {
      navigation.navigate("ResetPassword");
    }
  }, [code]);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="rgba(0, 0, 0, 0.2)"
        translucent={true}
        animated={true}
      />
      <View style={styles.imageContainer}>
        <Image
          style={styles.emailIcon}
          source={require("../assets/email-puzzle.png")}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.resetText}>
          Reset instructions has been sent to email (richardemate@gmail.com).
          Please enter the reset code
        </Text>
        <View style={styles.tokenInputContainer}>
          <CodeInput code={code} setCode={setCode} codeLength={TOKEN_LENGTH} />
        </View>
      </View>
    </View>
  );
};

ResetTokenScreen.navigationOptions = {
  headerTitle: "Reset Password",
  headerStyle: {
    backgroundColor: "rgb(33,36,39)",
  },
  headerTintColor: "#fff",
};

const styles = StyleSheet.create({
  container: {},
  formContainer: {
    paddingVertical: wp("3.5%"),
    paddingHorizontal: wp("4.7%"),
  },
  resetText: {
    fontSize: hp("2.2%"),
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
  },
  tokenInputContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 35,
  },
  emailIcon: {},
});

export default ResetTokenScreen;
