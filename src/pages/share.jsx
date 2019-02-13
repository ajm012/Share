import React, {
  Component
} from 'react';
import {
  StyleSheet,
  View,
  YellowBox,
  Text,
  TouchableOpacity,
  Animated
} from 'react-native';
import QRCode from 'react-native-qrcode';
import Dialog, {
  ScaleAnimation,
  DialogContent,
  DialogTitle,
  DialogButton,
  DialogFooter
} from 'react-native-popup-dialog';
import LinearGradient from "react-native-linear-gradient";
import Icon_Ionic from "react-native-vector-icons/Ionicons";

import Profile from "../services/profile";

import colors from "../assets/values/colors";

// Probably do something about this at some point
YellowBox.ignoreWarnings(['ListView is deprecated']);


export default class Home extends Component {
  constructor() {
    super();
    this.generateQR = this.generateQR.bind(this);
    this.renderQR = this.renderQR.bind(this);
    this.buttonSpring = new Animated.Value(0.3);
    this.state = {
      loading: false,
      profile: '',
      qrValue: '',
      showQR: false
    };
  }

  componentDidMount() {
    Animated.spring(
      this.buttonSpring,
      {
        toValue: 1,
        friction: 2.5
      }
    ).start()
  }

  generateQR() {
    this.setState({
      loading: true
    });
    Profile.retrieveOrCreateProfile().then(res => {
      this.setState({
        loading: false,
        profile: res
      });
      this.setState({
        qrValue: this.state.profile.phoneNumber
      });
      this.setState({
        showQR: true
      });
    });
  }

  renderQR() {
    if (this.state.qrValue === '') {
      return (
        <Dialog
          visible={ this.state.showQR }
          dialogAnimation={ new ScaleAnimation() }
          onDismiss={ () => {
            this.setState({ showQR: false });
          } }
          dialogTitle={ <DialogTitle title="Nothing to Share" hasTitleBar={ false } /> }
          footer={
            <DialogFooter>
              { [
                <DialogButton
                  text="Dismiss"
                  bordered
                  onPress={ () => {
                    this.setState({ showQR: false });
                  } }
                  key="dismiss"
                  style={ { backgroundColor: colors.colorPrimary } }
                  textStyle={ { color: colors.white } }
                />
              ] }
            </DialogFooter>
          }
        >
          <DialogContent>
            <View justifyContent="center" alignItems="center">
              <Text>You don't have any contact information!</Text>
              <Text>Link some platforms to share.</Text>
            </View>
          </DialogContent>
        </Dialog>
      );
    } else {
      return (
        <Dialog
          visible={ this.state.showQR }
          dialogAnimation={ new ScaleAnimation() }
          onDismiss={ () => {
            this.setState({ showQR: false });
          } }
          dialogTitle={ <DialogTitle title="Scan Me!" hasTitleBar={ false } /> }
          footer={
            <DialogFooter>
              { [
                <DialogButton
                  text="Dismiss"
                  bordered
                  onPress={ () => {
                    this.setState({ showQR: false });
                  } }
                  key="dismiss"
                  style={ { backgroundColor: colors.colorPrimary } }
                  textStyle={ { color: colors.white } }
                />
              ] }
            </DialogFooter>
          }
        >
          <DialogContent>
            <QRCode
              value={ this.state.qrValue }
              size={ 200 }
              bgColor={ colors.colorPrimary }
              fgColor={ colors.white }
            />
          </DialogContent>
        </Dialog>
      );
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <Animated.View style={ { transform: [{ scale: this.buttonSpring }] } }>
          <LinearGradient
            colors={ [colors.colorPrimary, colors.primaryTint] }
            style={ styles.generateButton }
            start={ {
              x: 0,
              y: 0
            } }
            end={ {
              x: 1,
              y: 0
            } }>

            <TouchableOpacity
              onPress={ () => this.generateQR() }
              style={ styles.generateButton }>
              <Text style={ styles.buttonText }>Generate Connection</Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
        { this.renderQR() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  phoneInput: {
    paddingLeft: 16
  },
  generateButton: {
    height: 200,
    width: 200,
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.white
  },
  buttonText: {
    fontSize: 20,
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "System"
  }
});