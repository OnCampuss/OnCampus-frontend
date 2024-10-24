// src/pages/SignUpScreen.js
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const SignUpScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Sign Up</Text>
      <TextInput placeholder="Email" style={{ width: 200, borderWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Password" style={{ width: 200, borderWidth: 1, marginBottom: 10 }} secureTextEntry />
      <Button title="Sign Up" onPress={() => { /* Implement sign-up logic */ }} />
    </View>
  );
};

export default SignUpScreen;
