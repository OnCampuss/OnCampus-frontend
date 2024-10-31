// src/components/SubText.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function SubText({ children }) {
  return <Text style={styles.subText}>{children}</Text>;
}

const styles = StyleSheet.create({
  subText: {
    color: '#D4D4D8',
    textAlign: 'center',
    marginHorizontal: 15,
    fontSize: 14,
    marginTop: 10,
  },
});
