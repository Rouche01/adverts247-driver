import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-elements";
import { ScrollView } from "react-navigation";
import { AntDesign } from "@expo/vector-icons";
import useImagePicker from "../hooks/useImagePicker";
import useCloudinary from "../hooks/useCloudinary";
import useDisableButton from "../hooks/useDisableButton";
import { Context as UserContext } from "../context/UserInfoContext";
import { Context as AuthContext } from "../context/AuthContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ProfilePhotoScreen = ({ navigation }) => {
  const [loadingState, setLoadingState] = useState(false);

  const { updateUser } = useContext(UserContext);
  const {
    state: { user },
    getUser,
  } = useContext(AuthContext);
  const [image, handleImagePick] = useImagePicker([1, 1]);
  const [handleUpload, cancelCloudinarySubscription] = useCloudinary();
  const [buttonDisable] = useDisableButton(user.profilePhoto, user, image);

  useEffect(() => {
    return () => {
      cancelCloudinarySubscription();
    };
  }, []);

  const saveProfileImage = async () => {
    if (image) {
      setLoadingState(true);
      const cloudinaryRef = await handleUpload(image);
      // console.log(cloudinaryRef);
      if (cloudinaryRef) {
        await updateUser(
          user.id,
          { profilePhoto: cloudinaryRef.url },
          getUser,
          "DriversLicense"
        );
      }
      setLoadingState(false);
    } else {
      navigation.navigate("DriversLicense");
    }
  };

  const resolveImage = () => {
    if (image) {
      return <Image source={{ uri: image.uri }} style={styles.avatar} />;
    } else if (user.profilePhoto) {
      return (
        <Image source={{ uri: user.profilePhoto }} style={styles.avatar} />
      );
    } else {
      return (
        <AntDesign name="adduser" size={70} color="rgba(255, 255, 255, 1)" />
      );
    }
  };

  // console.log(state);

  const goToHelp = () => {
    console.log("go to help");
  };

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
            <Text style={styles.mainText}>Take your profile photo</Text>
            <Text style={styles.subText}>
              Note: Your profile should meet the following requirement.
            </Text>
            <View style={styles.requirementList}>
              <Text style={styles.requirement}>
                1. Show your whole face and tops of your shoulders.
              </Text>
              <Text style={styles.requirement}>
                2. Take your sunglasses and hat off.
              </Text>
              <Text style={styles.requirement}>
                3. Take your photo in a well-lit place.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.avatarPlaceholder}
              onPress={() => handleImagePick()}
            >
              {resolveImage()}
            </TouchableOpacity>
          </View>
          <Button
            onPress={() => {
              saveProfileImage();
            }}
            loading={loadingState}
            disabled={buttonDisable}
            title="UPLOAD PHOTO"
            containerStyle={{ flex: 1, width: "100%", padding: 15 }}
            buttonStyle={{
              padding: 15,
              backgroundColor: "black",
              borderRadius: 8,
            }}
            titleStyle={{ fontSize: hp("2%") }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

ProfilePhotoScreen.navigationOptions = {
  headerStyle: {
    backgroundColor: "rgb(33,36,39)",
  },
  headerTitle: "",
  headerTintColor: "#fff",
  headerRight: () => (
    <Button
      title="Help"
      containerStyle={{ marginRight: 20, borderRadius: 8 }}
      buttonStyle={{ backgroundColor: "#fff", paddingHorizontal: 25 }}
      titleStyle={{ color: "#000" }}
    />
  ),
};

const styles = StyleSheet.create({
  body: {
    flex: 4,
    paddingTop: 30,
    paddingHorizontal: wp("3.4%"),
  },
  customHeader: {
    backgroundColor: "rgb(33,36,39)",
    height: 70,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    flexDirection: "row",
  },
  mainText: {
    fontSize: hp("3.7%"),
    fontWeight: "bold",
  },
  subText: {
    fontSize: hp("2.1%"),
    marginTop: 8,
  },
  requirementList: {
    marginTop: hp("3%"),
  },
  requirement: {
    color: "#8E8E93",
    fontSize: 14.6,
  },
  avatarPlaceholder: {
    width: hp("30%"),
    height: hp("30%"),
    backgroundColor: "#D7D7D7",
    borderRadius: 125,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: hp("5%"),
  },
  avatar: {
    width: hp("30%"),
    height: hp("30%"),
    borderRadius: 125,
    position: "absolute",
  },
});

export default ProfilePhotoScreen;
