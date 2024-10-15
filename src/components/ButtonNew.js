import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function ButtonNew({ focused, size }) {
  const [showOptions, setShowOptions] = useState(false);

  const handlePress = () => {
    setShowOptions(!showOptions); 
  };

  const navigateToOption = (option) => {
    console.log(`Navegando para: ${option}`);
  };

  const options = ["Opção 1", "Opção 2", "Opção 3"];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.plusButton,
          { backgroundColor: focused ? "#3B82F6" : "#3B82F6" },
        ]}
        onPress={handlePress}
      >
        <Entypo name="plus" size={size} color={focused ? "black" : "white"} />
      </TouchableOpacity>

      {showOptions && (
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={option}
              style={styles.optionButton}
              onPress={() => navigateToOption(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  plusButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  optionsContainer: {
    position: "absolute",
    bottom: 95,
    left: "-30%",
    transform: [{ translateX: -60 }], 
    flexDirection: "row", 
    justifyContent: "space-between", 
    width: 180, 
    height: 60, 
    gap: 10, 
  },
  optionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3B82F6",
  },
  optionText: {
    color: "white",
  },
});
