import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AuthPromptScreen from './src/screens/AuthPromptScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as UserProvider } from './src/context/UserInfoContext';
import SetupIndexScreen from './src/screens/SetupIndexScreen';
import { setNavigator } from './src/navigationRef';
import ProfilePhotoScreen from './src/screens/ProfilePhotoScreen';
import DriversLicenseScreen from './src/screens/DriversLicenseScreen';
import InsuranceCertScreen from './src/screens/InsuranceCertScreen';
import VehicleRegScreen from './src/screens/VehicleRegScreen';
import TripsScreen from './src/screens/TripsScreen';
import PreAuthScreen from './src/screens/PreAuthScreen';
import EarningsScreen from './src/screens/EarningsScreen';
import InformationScreen from './src/screens/InformationScreen';
import SupportScreen from './src/screens/SupportScreen';


const mainFlow = createBottomTabNavigator({
  Trips: TripsScreen,
  Earnings: EarningsScreen,
  Information: InformationScreen,
  Support: SupportScreen
})


mainFlow.navigationOptions = () => ({
  tabBarOptions: {
    activeTintColor: 'red',
    inactiveTintColor: 'red'
  }
})


const navigator = createSwitchNavigator({
  authFlow: createStackNavigator({
    PreAuth: PreAuthScreen,
    AuthPrompt: AuthPromptScreen,
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  accountSetupFlow: createStackNavigator({
    SetupIndex: SetupIndexScreen,
    ProfilePhoto: ProfilePhotoScreen,
    DriversLicense: DriversLicenseScreen,
    InsuranceCert: InsuranceCertScreen,
    VehicleReg: VehicleRegScreen
  }),
  mainFlow
});


const App = createAppContainer(navigator);

export default () => {
  return(
    <UserProvider>
      <AuthProvider>
        <App ref={(navigator) => setNavigator(navigator)} />
      </AuthProvider>
    </UserProvider>
  )
}