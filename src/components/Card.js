import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

export default function Card({ children, height = 500, width }) {
  const { width: screenWidth } = Dimensions.get('window');
  const cardWidth = width || (screenWidth > 380 ? 380 : screenWidth * 0.9);

  return (
    <View style={[styles.card, { width: cardWidth, height }]}>
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
    marginBottom: 10,
  },
});
