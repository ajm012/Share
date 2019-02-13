import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import QRCode from 'react-native-qrcode';

import Profile from "../services/profile";

import colors from "../assets/values/colors";


export default class Home extends Component {
  constructor() {
    super();
    this.generateQR = this.generateQR.bind(this);
    this.renderQR = this.renderQR.bind(this);
    this.state = {
      loading: false,
      profile: '',
      qrValue: ''
    };
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
    });
  }

  renderQR() {
    if (this.state.qrValue === '') {
      return;
    } else {
      return (
        <QRCode
          value={ this.state.qrValue }
          size={ 200 }
          bgColor={ colors.colorPrimary }
          fgColor={ colors.white } />
      );
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <Button title="Generate Connection" onPress={ () => this.generateQR() }>
        </Button>
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
  }
});