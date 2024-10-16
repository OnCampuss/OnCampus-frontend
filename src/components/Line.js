import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Line() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1e3a8a", "#3b82f6"]}
        style={styles.gradientBackground}
      >
        <View style={styles.lineView} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginTop: 5,
  },
  gradientBackground: {
    width: "80%",
    height: 2,
  },
  lineView: {
    borderStyle: "solid",
    borderColor: "transparent",
    borderTopWidth: 2,
    width: "100%",
    height: 2,
  },
});
