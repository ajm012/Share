import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class Scan extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <RNCamera
          ref={ ref => {
            this.camera = ref;
          } }
          style={ styles.preview }
          type={ RNCamera.Constants.Type.back }
          flashMode={ RNCamera.Constants.FlashMode.on }
          permissionDialogTitle={ 'Permission to use camera' }
          permissionDialogMessage={ 'We need your permission to use your camera phone' }
          captureAudio={ false }
          onGoogleVisionBarcodesDetected={ ({ barcodes }) => {
            console.log(barcodes);
          } }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});