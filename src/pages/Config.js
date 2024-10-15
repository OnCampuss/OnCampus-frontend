import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const backgroundImage = require('../images/Group.png');

export default function Config() {
  return (
    <ImageBackground 
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.text}>Configurações</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#171717',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'red',
  },
});
