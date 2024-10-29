// src/auth/LogoutButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LogOut } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase'; // Ajuste o caminho conforme necessário

const LogoutButton = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigation.navigate('Login'); // Redireciona para a tela de login
    } else {
      console.error('Erro ao sair:', error.message);
    }
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={styles.logoutContainer}>
      <LogOut size={24} color="#D4D4D8" />
      <Text style={styles.logoutText}>Sair do Aplicativo</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  logoutText: {
    marginLeft: 8,
    color: '#D4D4D8',
    fontSize: 18,
  },
});

export default LogoutButton;
