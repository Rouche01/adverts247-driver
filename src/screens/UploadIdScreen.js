import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StatusBar,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { ScrollView } from "react-navigation";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as UserInfoContext } from "../context/UserInfoContext";
import IdPlaceholder from "../components/IdPlaceholder";
import useImagePicker from "../hooks/useImagePicker";
import { useDisableSettings } from "../hooks/useDisableButton";
import useCloudinary from "../hooks/useCloudinary";

const UploadIdScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState();
  const [uploading, setUploading] = useState(false);

  const {
    state: { user },
    getUser,
  } = useContext(AuthContext);
  const { updateUser } = useContext(UserInfoContext);

  const [image, handleImagePick] = useImagePicker([4, 3]);
  const [buttonDisable] = useDisableSettings(image);
  const [handleUpload] = useCloudinary();

  useEffect(() => {
    if (user) {
      setFirstName(user.name.split(" ")[0]);
    }

    return () => {
      setUploading(false);
    };
  }, []);

  const goToHelp = () => {
    console.log("Help!!!");
  };

  const saveDriverIdAndNavigate = async () => {
    console.log("navigating to main app");
    if (image) {
      setUploading(true);
      const cloudinaryRef = await handleUpload(image);
      await updateUser(
        user.id,
        { driversValidId: cloudinaryRef.url },
        getUser,
        "ProfilePhoto"
      );
      setUploading(false);
    }
  };

  const resolveImage = () =>
    image ? (
      <Image
        source={{ uri: image.uri }}
        style={{ width: "100%", height: 200 }}
      />
    ) : (
      <IdPlaceholder />
    );

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <StatusBar
        backgroundColor="rgba(0, 0, 0, 0.9)"
        translucent={true}
        animated={true}
      />
      <ScrollView>
        <View style={{ minHeight: hp("100%") }}>
          <View style={styles.customHeader}>
            <Image
              source={require("../assets/logo.png")}
              style={{ width: wp("40%") }}
              resizeMode="contain"
            />
            <Button
              onPress={() => goToHelp()}
              title="Help"
              containerStyle={{ borderRadius: 8 }}
              buttonStyle={{ backgroundColor: "#fff", paddingHorizontal: 20 }}
              titleStyle={{ color: "#000" }}
            />
          </View>
          <View style={styles.body}>
            <Text style={styles.mainTitle}>Welcome, {firstName}</Text>
            <Text style={styles.subtitle}>
              You need to complete this step to set up your account
            </Text>
            <TouchableOpacity
              style={styles.touchableId}
              onPress={() => handleImagePick()}
            >
              {resolveImage()}
            </TouchableOpacity>
          </View>
          <Button
            onPress={() => saveDriverIdAndNavigate()}
            loading={uploading}
            disabled={buttonDisable}
            title="CONTINUE"
            containerStyle={{ flex: 1, width: "100%" }}
            buttonStyle={{
              padding: 15,
              backgroundColor: "black",
              borderRadius: 8,
              marginHorizontal: wp("3.4%"),
            }}
            titleStyle={{ fontSize: hp("2%") }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  customHeader: {
    backgroundColor: "rgb(33,36,39)",
    height: 70,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    flexDirection: "row",
  },
  body: {
    flex: 4,
    paddingTop: 30,
    paddingHorizontal: wp("3.4%"),
  },
  mainTitle: {
    fontSize: hp("3.5%"),
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: hp("2.1%"),
    marginTop: 8,
  },
  touchableId: {
    marginTop: hp("7%"),
  },
});

export default UploadIdScreen;
