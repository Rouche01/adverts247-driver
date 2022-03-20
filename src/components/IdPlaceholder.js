import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const IdPlaceholder = () => {
  return (
    <View style={styles.idBox}>
      <View style={styles.innerBorder}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image source={require("../assets/image.png")} />
          <Text style={styles.uploadText}>Click here to upload a valid ID</Text>
          <Text style={styles.supportedVersions}>Supports: JPG, JPEG, PNG</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  idBox: {
    width: "100%",
    height: 250,
    backgroundColor: "#E0E0E0",
    borderRadius: 7,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  innerBorder: {
    width: "95%",
    height: 230,
    borderColor: "#999",
    borderWidth: 1,
    borderStyle: "dotted",
    borderRadius: 7,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadText: {
    fontSize: hp("2.1%"),
    fontWeight: "bold",
    color: "#868686",
  },
  supportedVersions: {
    fontSize: hp("1.7%"),
    color: "#868686",
  },
});

export default IdPlaceholder;
