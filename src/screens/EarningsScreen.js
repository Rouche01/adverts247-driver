import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StatusBar,
} from "react-native";
import { Button } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as PaymentContext } from "../context/PaymentContext";
import { Context as UserContext } from "../context/UserInfoContext";
import InfoBox from "../components/InfoBox";
import { withNavigation } from "react-navigation";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const EarningsScreen = ({ navigation }) => {
  const {
    state: { user },
  } = useContext(AuthContext);
  const {
    state: { error },
    initiateTransfer,
    clearErrors,
  } = useContext(PaymentContext);

  const [firstName, setFirstName] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [displayText, setDisplayText] = useState(true);

  useEffect(() => {
    if (user) {
      setFirstName(user.name.split(" ")[0]);
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      Alert.alert("Notice", `${error}`);
      clearErrors();
    }
  }, [error]);

  // console.log(user);

  useEffect(() => {
    let blinkCounter = setInterval(() => {
      setDisplayText((displayText) => !displayText);
    }, 700);

    navigation.addListener("willFocus", () => {
      blinkCounter = setInterval(() => {
        setDisplayText((displayText) => !displayText);
      }, 700);
    });

    navigation.addListener("willBlur", () => {
      clearInterval(blinkCounter);
    });

    return () => {
      clearInterval(blinkCounter);
    };
  }, []);

  const withdrawPayout = async () => {
    setLoadingState(true);
    if (user.bankInformation) {
      const { bank, recipientCode } = user.bankInformation;

      if (!bank) {
        Alert.alert(
          "Notice",
          "You need to add your bank account information before you can make any withdrawals"
        );
      } else {
        // console.log('Works');
        await initiateTransfer(recipientCode, "2456700");
      }
    } else {
      Alert.alert(
        "Notice",
        "You need to add your bank account information before you can make any withdrawals"
      );
    }

    setLoadingState(false);
  };

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="#fff"
        barStyle="dark-content"
      />
      <View style={{ flex: 6 }}>
        <View style={styles.earningStatus}>
          <Image
            source={{ uri: user.profilePhoto }}
            style={styles.profilePhoto}
          />
          <View style={{ paddingLeft: 15, flex: 1 }}>
            <Text style={styles.greetingText}>Good morning {firstName},</Text>
            <Text style={styles.earningStatusText}>
              You have earned 3,000 within 48 hours
            </Text>
          </View>
        </View>
        <View style={styles.earningOverview}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: hp("3.2%"),
                marginBottom: 15,
                fontWeight: "bold",
              }}
            >
              Earnings Overview
            </Text>
          </View>
          <View style={styles.innerEarningOverview}>
            <InfoBox
              mainText="2,000"
              subText="Today's Earnings"
              color="#4FB81D"
              fontSize={3.5}
            />
            <InfoBox
              mainText="25,000"
              subText="Avg Weekly Earnings"
              color="#4FB81D"
              fontSize={2.8}
            />
            <InfoBox
              mainText="200k+"
              subText="Total Earnings"
              color="#4FB81D"
              fontSize={3.5}
            />
          </View>
        </View>
        <View style={styles.payout}>
          <View style={styles.accountRow}>
            <Text style={{ color: "#fff", fontSize: hp("2.1%") }}>
              Available Payout
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("AddAccount")}>
              <Text
                style={{
                  color: "#444",
                  fontSize: hp("1.4%"),
                  backgroundColor: "#ddd",
                  paddingHorizontal: hp("2%"),
                  paddingVertical: 2,
                  borderRadius: 10,
                }}
              >
                ADD ACCOUNT
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: "#FF3B30",
              marginTop: hp("2.5%"),
              fontSize: hp("3.6%"),
              fontWeight: "bold",
            }}
          >
            {displayText ? `N24,567.00` : ""}
          </Text>
        </View>
      </View>
      <Button
        title="WITHDRAW"
        containerStyle={{ flex: 1, width: "100%" }}
        buttonStyle={{ padding: 15, backgroundColor: "black", borderRadius: 8 }}
        titleStyle={{ fontSize: hp("2%") }}
        onPress={() => withdrawPayout()}
        loading={loadingState}
      />
    </SafeAreaView>
  );
};

EarningsScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    padding: wp("4%"),
    flex: 1,
  },
  earningStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("6.4%"),
  },
  profilePhoto: {
    height: wp("27%"),
    width: wp("27%"),
    borderRadius: 70,
    borderColor: "red",
    borderWidth: 1,
  },
  greetingText: {
    fontSize: hp("2.2%"),
    color: "#828282",
  },
  earningStatusText: {
    fontSize: hp("2.2%"),
    fontWeight: "bold",
    color: "#828282",
  },
  earningOverview: {
    marginTop: hp("6%"),
  },
  innerEarningOverview: {
    flexDirection: "row",
    flex: 1,
  },
  payout: {
    backgroundColor: "black",
    marginTop: hp("19%"),
    borderRadius: 8,
    paddingHorizontal: wp("6%"),
    paddingVertical: hp("2.4%"),
  },
  accountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default withNavigation(EarningsScreen);
