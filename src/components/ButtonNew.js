import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { DollarSign, Settings, Handshake } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function ButtonNew({ focused, size }) {
  const [showOptions, setShowOptions] = useState(false);
  const navigation = useNavigation();

  const handlePress = () => {
    setShowOptions(!showOptions);
  };

  const navigateToOption = (option) => {
    switch (option) {
      case "Opção 1":
        navigation.navigate("Finance"); // Navegar para a tela Settings
        break;
      case "Opção 2":
        navigation.navigate("Settings"); // Navegar para a tela Terms Policy
        break;
      case "Opção 3":
        navigation.navigate("TermsPolicy"); // Navegar para a tela Finance (ou a tela que você desejar)
        break;
      default:
        break;
    }
  };

  const options = [
    { icon: <DollarSign size={24} color="white" />, option: "Opção 1" }, // Para Settings
    { icon: <Settings size={24} color="white" />, option: "Opção 2" }, // Para Terms Policy
    { icon: <Handshake size={24} color="white" />, option: "Opção 3" }, // Para Finance
  ];

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
          {options.map(({ icon, option }, index) => (
            <TouchableOpacity
              key={option}
              style={styles.optionButton}
              onPress={() => navigateToOption(option)}
            >
              {icon}
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
    borderWidth: 2,
    borderColor: "white",
    shadowColor: "#000",
  },
});
