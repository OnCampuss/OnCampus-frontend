import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { supabase } from '../../services/supabase';
import Icon from "react-native-vector-icons/FontAwesome";

export default function FacebookLoginButton() {
  const handleFacebookLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
    });
    if (error) {
      console.error('Erro ao logar com o Facebook:', error.message);
    }
  };

  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={handleFacebookLogin} style={styles.icon}>
        <View style={styles.ovalIcon}>
          <Icon name="facebook" size={30} color="#D4D4D8" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },
  ovalIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1E3A8A",
    justifyContent: "center",
    alignItems: "center",
  },
});
