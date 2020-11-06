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
import { MaterialIcons, AntDesign, FontAwesome, Feather } from '@expo/vector-icons';



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
  mainFlow: createBottomTabNavigator({
    Trips: {
      screen: TripsScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <MaterialIcons name="local-taxi" size={24} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: '#f1f1f1',
          inactiveTintColor: '#8E8E93',
          activeBackgroundColor: '#0A0A0A',
          inactiveBackgroundColor: '#0A0A0A'
        }
      }
    },
    Earnings: {
      screen: EarningsScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <FontAwesome name="money" size={24} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: '#f1f1f1',
          inactiveTintColor: '#8E8E93',
          activeBackgroundColor: '#0A0A0A',
          inactiveBackgroundColor: '#0A0A0A'
        }
      }
    },
    Information: {
      screen: InformationScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Feather name="user" size={24} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: '#f1f1f1',
          inactiveTintColor: '#8E8E93',
          activeBackgroundColor: '#0A0A0A',
          inactiveBackgroundColor: '#0A0A0A'
        }
      }
    },
    Support: {
      screen: SupportScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <AntDesign name="questioncircleo" size={24} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: '#f1f1f1',
          inactiveTintColor: '#8E8E93',
          activeBackgroundColor: '#0A0A0A',
          inactiveBackgroundColor: '#0A0A0A'
        }
      }
    }
  })
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