import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HairLine() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#D4D4D8", "#D4D4D8"]}
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
  },
  gradientBackground: {
    width: "90%", 
    height: 0.5,
  },
  lineView: {
    borderStyle: "solid",
    borderColor: "transparent",
    borderTopWidth: 2,
    width: "100%", 
    height: 2,
  },
});
