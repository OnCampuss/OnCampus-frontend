import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function FinanceCard() {
  return (
    <View style={styles.container}>
      <Feather name="dollar-sign" size={24} color="white" style={styles.icon} />
      <Text style={styles.text}>Financeiro</Text>
      <Feather name="chevron-right" size={24} color="white" style={styles.arrowIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
  },
  arrowIcon: {
    marginLeft: 10,
  },
});
