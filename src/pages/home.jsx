import React, {
  Component
} from 'react';
import {
  StyleSheet,
  View,
  Button,
  YellowBox,
  Text
} from 'react-native';
import QRCode from 'react-native-qrcode';
import Dialog, {
  ScaleAnimation,
  DialogContent,
  DialogTitle,
  DialogButton,
  DialogFooter
} from 'react-native-popup-dialog';

import Profile from "../services/profile";

import colors from "../assets/values/colors";

YellowBox.ignoreWarnings(['ListView is deprecated']);


export default class Home extends Component {
  constructor() {
    super();
    this.generateQR = this.generateQR.bind(this);
    this.renderQR = this.renderQR.bind(this);
    this.state = {
      loading: false,
      profile: '',
      qrValue: '',
      showQR: false
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
        <Button title="Generate Connection" onPress={ () => this.generateQR() } color={ colors.colorPrimary }>
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