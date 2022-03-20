import React, { useContext, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View, Alert } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import useNavigateWithLocalSignin from "../hooks/useNavigateWithLocalSignin";

const PreAuthScreen = () => {
  const { tryLocalSignin, clearErrorMessage, signout } =
    useContext(AuthContext);
  const [localSigninAndNavigate, error] = useNavigateWithLocalSignin();

  useEffect(() => {
    localSigninAndNavigate(tryLocalSignin);
  }, []);

  useEffect(() => {
    // console.log(error, 'jjjgj');
    if (error) {
      Alert.alert(
        "Signin Error",
        error,
        [
          {
            text: "Sign Out",
            onPress: () => {
              clearErrorMessage();
              signout();
            },
          },
        ]
      );
    }
  }, [error]);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};

PreAuthScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({});

export default PreAuthScreen;
