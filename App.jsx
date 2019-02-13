import React from "react";
import { View, StatusBar } from "react-native";
import { AppContainer } from "./navigation";
export default class App extends React.Component {
  render() {
    return (
      <View style={{ height: "100%", width: "100%" }}>
        <AppContainer />
      </View>
    );
  }
}