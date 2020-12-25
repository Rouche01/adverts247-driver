import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AuthPromptScreen from './src/screens/AuthPromptScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as UserProvider } from './src/context/UserInfoContext';
import { Provider as TripProvider } from './src/context/TripContext';
import { Provider as PaymentProvider } from './src/context/PaymentContext';
import { Provider as MessageProvider } from './src/context/MessageContext';
import { Provider as StreamingProvider } from './src/context/StreamingContext';
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
import AddAccountScreen from './src/screens/AddAccountScreen';
import TransactionsScreen from './src/screens/TransactionsScreen';
import GatewayScreen from './src/screens/GatewayScreen';
import ExtraInfoScreen from './src/screens/ExtraInfoScreen';



const navigator = createSwitchNavigator({
  authFlow: createStackNavigator({
    PreAuth: PreAuthScreen,
    AuthPrompt: AuthPromptScreen,
    Signup: SignupScreen,
    ExtraInfo: ExtraInfoScreen,
    Signin: SigninScreen
  }),
  Gateway: GatewayScreen,
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
    earningsFlow: {
      screen: createStackNavigator({
        Earnings: EarningsScreen,
        AddAccount: AddAccountScreen
      }),
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <FontAwesome name="money" size={24} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: '#f1f1f1',
          inactiveTintColor: '#8E8E93',
          activeBackgroundColor: '#0A0A0A',
          inactiveBackgroundColor: '#0A0A0A'
        },
        tabBarLabel: 'Earnings'
      }
    },
    profileFlow: {
      screen: createStackNavigator({
        Information: InformationScreen,
        Transactions: TransactionsScreen
      }),
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Feather name="user" size={24} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: '#f1f1f1',
          inactiveTintColor: '#8E8E93',
          activeBackgroundColor: '#0A0A0A',
          inactiveBackgroundColor: '#0A0A0A'
        },
        tabBarLabel: 'Information'
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
  )
}