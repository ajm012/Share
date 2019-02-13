import React, { Component } from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";
import { Image, Platform, TouchableOpacity } from "react-native";
import Icon_Ionic from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";

import colors from "./src/assets/values/colors";

/* ----------------------- PAGES ----------------------- */
import Home from "./src/pages/home";
import AddContact from "./src/pages/addContact";
/* ----------------------------------------------------- */

function createHeader(title) {
  return {
    title: title,
    headerBackground: gradient,
    headerTintColor: "white",
  }
}

function createAccountButton(navigation) {
  return (
    <TouchableOpacity transparent onPress={ () => navigation.navigate("AddContact") }>
      <Icon_Ionic
        name={ Platform.select({ ios: "ios-person", android: "md-person" }) }
        size={ 24 }
        paddingTop={ Platform.OS === "ios" ? 0 : StatusBar.currentHeight }
        style={ { marginRight: 16 } }
        color={ colors.white }
      />
    </TouchableOpacity>
  );
}

const gradient = (
  <LinearGradient
    colors={ [colors.colorPrimary, colors.primaryTint] }
    style={ { flex: 1 } }
    start={ {
      x: 0,
      y: 0
    } }
    end={ {
      x: 1,
      y: 0
    } }>
  </LinearGradient>
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        title: "Home",
        headerBackground: gradient,
        headerTintColor: colors.white,
        headerRight: createAccountButton(navigation)
      }
    }
  }
);

const ContactStack = createStackNavigator(
  {
    AddContact: {
      screen: AddContact
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        title: "Contact",
        headerBackground: gradient,
        headerTintColor: colors.white,
        headerRight: createAccountButton(navigation)
      }
    }
  }
);

ContactStack.navigationOptions = ({ navigation }) => {
  let navigationOptions = {};
  navigationOptions.header = createHeader();
  navigationOptions.headerRight = createAccountButton(navigation);
  return navigationOptions;
}

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <Icon_Ionic
              name={ Platform.select({ ios: "ios-home", android: "md-home" }) }
              size={ 30 }
              color={ focused ? colors.colorPrimary : colors.grey }
            />
          );
        }
      }
    },
    Contact: {
      screen: ContactStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <Icon_Ionic
              name={ Platform.select({
                ios: "ios-filing",
                android: "md-filing"
              }) }
              size={ 30 }
              color={ focused ? colors.colorPrimary : colors.grey }
            />
          );
        }
      }
    },
  },
);

export const AppContainer = createAppContainer(TabNavigator);