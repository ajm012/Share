import React, { Component } from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";
import { Image, Platform, TouchableOpacity } from "react-native";
import Icon_Ionic from "react-native-vector-icons/Ionicons";

import Home from "./src/pages/home";
import AddContact from "./src/pages/addContact";

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <Icon_Ionic
              name={ Platform.select({ ios: "ios-home", android: "md-home" }) }
              size={ 30 }
              color={ focused ? "purple" : "gray" }
            />
          );
        }
      }
    },
    AddContact: {
      screen: AddContact,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <Icon_Ionic
              name={ Platform.select({
                ios: "ios-filing",
                android: "md-filing"
              }) }
              size={ 30 }
              color={ focused ? "purple" : "gray" }
            />
          );
        }
      }
    },
  },
);

export const AppContainer = createAppContainer(TabNavigator);