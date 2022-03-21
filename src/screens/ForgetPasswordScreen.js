import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const ForgetPasswordScreen = () => {
  return (
    <View style={styles.container}>
      <Text>
        Enter your registed email address to receive password reset instruction.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp("3.5%"),
  },
});

export default ForgetPasswordScreen;
