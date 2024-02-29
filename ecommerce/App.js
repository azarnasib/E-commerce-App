import React from "react";
import { SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView, TapGestureHandler } from "react-native-gesture-handler";
import Splash from './src/Shared/Screens/Splash';
import HomeScreen from './src/UserApp/Screens/Home.screen';
import CartScreen from './src/UserApp/Screens/Cart.screen';
import CartReducers from "./src/Shared/utils/Redux/reducers/Cart.reducers";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import OrderSummary from "./src/UserApp/Screens/OrderSummary.screen";
import SignupScreen from "./src/UserApp/SignUp.screen";
import ForgotPasswordScreen from "./src/UserApp/Screens/ForgetPassword.screen";
import ResetPasswordScreen from "./src/UserApp/ResetPassword.screen";
import LoginScreen from "./src/UserApp/Login.screen"; // Import LoginScreen
import VerifyOtpScreen from "./src/UserApp/Screens/VerifyOtp.screen"; // Import VerifyOtpScreen
import SplashScreen from "./src/UserApp/Screens/Splash.screen";
import CategorizedProductsScreen from "./src/UserApp/Screens/CategorizedProducts.screen";
import OrderListingScreen from "./src/UserApp/Screens/OrderListing.screen";
 


function App() {
  const Stack = createNativeStackNavigator();
 
  const combinedReducers = combineReducers({
    cart: CartReducers
  });
  const reduxStore = createStore(combinedReducers);

  const MainNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          />
        <Stack.Screen
          name="SignUp"
          component={SignupScreen}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name="VerifyOtp"
          component={VerifyOtpScreen}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="CategorizedProducts"
          component={CategorizedProductsScreen}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
        />
        <Stack.Screen
          name="OrderSummary"
          component={OrderSummary}
        />
        <Stack.Screen
          name="OrderL"
          component={OrderSummary}
        />
        <Stack.Screen
          name="OrderListing"
          component={OrderListingScreen}
        />
      
      </Stack.Navigator>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TapGestureHandler>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', marginTop: 30 }}>
          <Provider store={reduxStore}>
            <NavigationContainer>
              <MainNavigator />
            </NavigationContainer>
          </Provider>
        </SafeAreaView>
      </TapGestureHandler>
    </GestureHandlerRootView>
  )
}

export default App;
