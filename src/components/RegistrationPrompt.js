import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RegistrationPrompt({ onComplete }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Documents');
    onComplete();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Complete seu cadastro para acessar todas as funcionalidades</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Cadastrar-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#222',
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
