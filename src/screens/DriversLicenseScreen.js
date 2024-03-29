import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import DocumentUpload from "../components/DocumentUpload";
import useImagePicker from "../hooks/useImagePicker";
import useCloudinary from "../hooks/useCloudinary";
import useDisableButton from "../hooks/useDisableButton";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as UserContext } from "../context/UserInfoContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const DriversLicenseScreen = ({ navigation }) => {
  const [loadingState, setLoadingState] = useState(false);

  const { updateUser } = useContext(UserContext);
  const { state, getUser } = useContext(AuthContext);

  const [image, handleImagePick] = useImagePicker([4, 3]);
  const [handleUpload] = useCloudinary();
  const [buttonDisable] = useDisableButton(
    state.user.driversLicense,
    state,
    image
  );

  const saveDriversLicense = async () => {
    if (image) {
      setLoadingState(true);
      const cloudinaryRef = await handleUpload(image);
      // console.log(cloudinaryRef);
      await updateUser(
        state.user.id,
        { driversLicense: cloudinaryRef.url },
        getUser,
        "InsuranceCert"
      );
      setLoadingState(false);
    } else {
      navigation.navigate("InsuranceCert");
    }
  };

  // console.log(state);

  return (
    <View style={styles.container}>
      <DocumentUpload
        title="Take a photo of your Personal Driver's License"
        subtitle="Make sure your Driver’s License is not expired and avoid using so that your information is clear and visible."
        placeholder={
          <Image
            style={{ alignSelf: "center" }}
            source={require("../assets/LicensePlaceholder.png")}
          />
        }
        buttonPress={handleImagePick}
        documentImage={image}
        dbImage={state.user.driversLicense}
      />
      <Button
        onPress={() => saveDriversLicense()}
        loading={loadingState}
        disabled={buttonDisable}
        title="UPLOAD LICENSE"
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
  );
};

DriversLicenseScreen.navigationOptions = {
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
  container: {
    flex: 1,
  },
});

export default DriversLicenseScreen;
