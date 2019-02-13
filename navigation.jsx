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
import Share from "./src/pages/share";
import AddContact from "./src/pages/addContact";
import Scan from "./src/pages/scanner";
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
    } } />
);

const ShareStack = createStackNavigator(
  {
    Share: {
      screen: Share,
      navigationOptions: {
        title: "Share"
      }
    },
    AddContact: {
      screen: AddContact,
      navigationOptions: {
        title: "Account"
      }
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerBackground: gradient,
        headerTintColor: colors.white,
        headerRight: createAccountButton(navigation),
        headerStyle: {
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0
        },
        headerBackTitle: null
      }
    }
  }
);

const ScanStack = createStackNavigator(
  {
    Scan: {
      screen: Scan,
      navigationOptions: {
        title: "Scan"
      }
    },
    AddContact: {
      screen: AddContact,
      navigationOptions: {
        title: "Account"
      }
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerBackground: gradient,
        headerTintColor: colors.white,
        headerRight: createAccountButton(navigation),
        headerStyle: {
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0
        },
        headerBackTitle: null
      }
    }
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Share: {
      screen: ShareStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <Icon_Ionic
              name={ Platform.select({ ios: "ios-share", android: "md-share" }) }
              size={ 24 }
              color={ focused ? colors.colorPrimary : colors.grey }
            />
          );
        }
      }
    },
    Scan: {
      screen: ScanStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <Icon_Ionic
              name={ Platform.select({
                ios: "ios-qr-scanner",
                android: "md-qr-scanner"
              }) }
              size={ 24 }
              color={ focused ? colors.colorPrimary : colors.grey }
            />
          );
        }
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: colors.colorPrimary,
      inactiveTintColor: colors.grey,
    },
  }
);

export const AppContainer = createAppContainer(TabNavigator);