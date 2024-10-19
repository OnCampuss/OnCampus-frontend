import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 8,
    marginBottom: 5,
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});
