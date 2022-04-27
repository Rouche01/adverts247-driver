import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import AuthPromptScreen from "./src/screens/AuthPromptScreen";
import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as UserProvider } from "./src/context/UserInfoContext";
import { Provider as TripProvider } from "./src/context/TripContext";
import { Provider as PaymentProvider } from "./src/context/PaymentContext";
import { Provider as MessageProvider } from "./src/context/MessageContext";
import { Provider as StreamingProvider } from "./src/context/StreamingContext";
import { MenuProvider } from "react-native-popup-menu";
import { setNavigator } from "./src/navigationRef";
import ProfilePhotoScreen from "./src/screens/ProfilePhotoScreen";
import TripsScreen from "./src/screens/TripsScreen";
import PreAuthScreen from "./src/screens/PreAuthScreen";
import EarningsScreen from "./src/screens/EarningsScreen";
import InformationScreen from "./src/screens/InformationScreen";
import SupportScreen from "./src/screens/SupportScreen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import AddAccountScreen from "./src/screens/AddAccountScreen";
import TransactionsScreen from "./src/screens/TransactionsScreen";
import GatewayScreen from "./src/screens/GatewayScreen";
import ExtraInfoScreen from "./src/screens/ExtraInfoScreen";
import UploadIdScreen from "./src/screens/UploadIdScreen";
import ForgetPasswordScreen from "./src/screens/ForgetPasswordScreen";
import ResetTokenScreen from "./src/screens/ResetTokenScreen";
import ResetPasswordScreen from "./src/screens/ResetPassword";

if (Platform.OS === "android") {
  // only android needs polyfill
  require("intl"); // import intl object
  require("intl/locale-data/jsonp/en-NG"); // load the required locale details
}

const navigator = createSwitchNavigator({
  authFlow: createStackNavigator({
    PreAuth: PreAuthScreen,
    AuthPrompt: AuthPromptScreen,
    Signup: SignupScreen,
    forgotPasswordFlow: createStackNavigator(
      {
        ForgotPassword: ForgetPasswordScreen,
        ResetToken: ResetTokenScreen,
        ResetPassword: ResetPasswordScreen,
      },
      {
        headerMode: "none",
        navigationOptions: ({ navigation }) => {
          const { index } = navigation.state;
          return {
            headerTitle: index > 0 ? "Reset Password" : "Forgot Password",
            headerStyle: {
              backgroundColor: "rgb(33,36,39)",
            },
            headerTintColor: "#fff",
          };
        },
      }
    ),
    ExtraInfo: ExtraInfoScreen,
    Signin: SigninScreen,
  }),
  Gateway: GatewayScreen,
  // accountSetupFlow: createStackNavigator({
  //   SetupIndex: SetupIndexScreen,
  //   DriversLicense: DriversLicenseScreen,
  //   InsuranceCert: InsuranceCertScreen,
  //   VehicleReg: VehicleRegScreen
  // }),
  UploadId: UploadIdScreen,
  ProfilePhoto: ProfilePhotoScreen,
  mainFlow: createBottomTabNavigator({
    Trips: {
      screen: TripsScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="local-taxi" size={24} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: "#f1f1f1",
          inactiveTintColor: "#8E8E93",
          activeBackgroundColor: "#0A0A0A",
          inactiveBackgroundColor: "#0A0A0A",
        },
      },
    },
    earningsFlow: {
      screen: createStackNavigator({
        Earnings: EarningsScreen,
        AddAccount: AddAccountScreen,
      }),
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="money" size={24} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: "#f1f1f1",
          inactiveTintColor: "#8E8E93",
          activeBackgroundColor: "#0A0A0A",
          inactiveBackgroundColor: "#0A0A0A",
        },
        tabBarLabel: "Earnings",
      },
    },
    profileFlow: {
      screen: createStackNavigator({
        Information: InformationScreen,
        Transactions: TransactionsScreen,
      }),
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Feather name="user" size={24} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: "#f1f1f1",
          inactiveTintColor: "#8E8E93",
          activeBackgroundColor: "#0A0A0A",
          inactiveBackgroundColor: "#0A0A0A",
        },
        tabBarLabel: "Information",
      },
    },
    Support: {
      screen: SupportScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <AntDesign name="questioncircleo" size={24} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: "#f1f1f1",
          inactiveTintColor: "#8E8E93",
          activeBackgroundColor: "#0A0A0A",
          inactiveBackgroundColor: "#0A0A0A",
        },
      },
    },
  }),
});

const App = createAppContainer(navigator);

export default () => {
  return (
    <MenuProvider>
      <UserProvider>
        <AuthProvider>
          <PaymentProvider>
            <TripProvider>
              <MessageProvider>
                <StreamingProvider>
                  <App ref={(navigator) => setNavigator(navigator)} />
                </StreamingProvider>
              </MessageProvider>
            </TripProvider>
          </PaymentProvider>
        </AuthProvider>
      </UserProvider>
    </MenuProvider>
  );
};
