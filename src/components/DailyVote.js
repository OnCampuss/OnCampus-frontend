import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function DailyVote() {
  return (
    <View style={styles.container}>
      <Feather name="check-square" size={24} color="#D4D4D8" style={styles.icon} />
      <Text style={styles.text}>Votação do dia</Text>
      <Feather name="chevron-right" size={24} color="#D4D4D8" style={styles.arrowIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 8,
    justifyContent: "space-between",
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
