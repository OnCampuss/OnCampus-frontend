import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const LogoutButton = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      // Remover o token do AsyncStorage
      await AsyncStorage.removeItem('token');
      Alert.alert('Logout', 'Você foi desconectado com sucesso.');
  
      // Navegar para a tela de login
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }], // Altere 'LoginScreen' para o nome correto da tela de login em sua navegação
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      Alert.alert('Erro', 'Não foi possível desconectar.');
    }
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Text style={styles.logoutButtonText}>Sair</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: '#FF3B30',  // Vermelho para chamar atenção
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogoutButton;
