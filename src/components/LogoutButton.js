import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { supabase } from "../services/supabase";

const LogoutButton = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      onLogout();  // Chama a função de logout (pode ser passada via props para resetar estados ou navegar)
      console.log("Logout bem-sucedido!");
    } catch (error) {
      console.log("Erro ao fazer logout:", error.message);
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
