import React, {
  Component
} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import { SocialIcon } from 'react-native-elements'

import Profile from "../services/profile";


export default class AddContact extends Component {
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
    Profile.addToProfile("phoneNumber", value);
  }

  render() {
    return (
      <View style={ styles.container }>
        <ScrollView>
          <PhoneInput
            ref={ (ref) => {
              this.phone = ref;
            } }
            onPressFlag={ this.onPressFlag }
            style={ styles.phoneInput }
            onChangePhoneNumber={ (phoneNumber) => this.updatePhone(phoneNumber) }
          />

          <CountryPicker
            ref={ (ref) => {
              this.countryPicker = ref;
            } }
            onChange={ value => this.selectCountry(value) }
            translation="eng"
            cca2={ this.state.cca2 }
          >
            <View />
          </CountryPicker>
          <SocialIcon
            title='Connect Facebook'
            button
            type='facebook'
          />
          <SocialIcon
            title='Connect Twitter'
            button
            type='twitter'
          />
          <SocialIcon
            title="Connect LinkedIn"
            button
            type='linkedin'
          />
          <SocialIcon
            title="Connect Instagram"
            button
            type='instagram'
          />
          <SocialIcon
            title="Connect Pinterest"
            button
            type='pinterest'
          />
          <SocialIcon
            title="Connect Soundcloud"
            button
            type='soundcloud'
          />
          <SocialIcon
            title="Connect Twitch"
            button
            type='twitch'
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 16
  },
  phoneInput: {
    paddingVertical: 20
  }
});