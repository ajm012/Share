import React, {
  Component
} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import QRCode from 'react-native-qrcode';


export default class App extends Component {
  constructor() {
    super();

    this.onPressFlag = this.onPressFlag.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.state = {
      cca2: 'US',
      phone: '',
      qrValue: ''
    };
  }

  componentDidMount() {
    this.setState({
      pickerData: this.phone.getPickerData(),
    });
  }

  onPressFlag() {
    this.countryPicker.openModal();
  }

  selectCountry(country) {
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({ cca2: country.cca2 });
  }

  updatePhone(value) {
    this.setState({ phone: value });
    
  }

  generateQR() {
    alert(this.state.phone);
    this.setState({
      qrValue: this.state.phone
    });
  }

  renderQR() {
    if (this.state.qrValue === '') {
      return;
    } else {
      return (
        <QRCode
            value={this.state.qrValue}
            size={200}
            bgColor='purple'
            fgColor='white'/>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <PhoneInput
          ref={(ref) => {
            this.phone = ref;
          }}
          onPressFlag={this.onPressFlag}
          style={styles.phoneInput}
          onChangePhoneNumber={(phoneNumber) => this.updatePhone(phoneNumber)}
        />

        <CountryPicker
          ref={(ref) => {
            this.countryPicker = ref;
          }}
          onChange={value => this.selectCountry(value)}
          translation="eng"
          cca2={this.state.cca2}
        >
          <View />
        </CountryPicker>
        <Button title="Generate Connection" onPress={() => this.generateQR()}>
        </Button>
        {this.renderQR()}
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