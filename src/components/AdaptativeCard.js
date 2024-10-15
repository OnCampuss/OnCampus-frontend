import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

export default function AdaptiveCard({ children }) {
  const { width } = Dimensions.get('window');
  const cardWidth = width > 380 ? 380 : width * 0.9;

  return (
    <View style={[styles.card, { width: cardWidth }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#3F3F46",
    borderRadius: 15,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});
