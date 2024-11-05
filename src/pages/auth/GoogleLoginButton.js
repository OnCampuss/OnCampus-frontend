import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { supabase } from '../../services/supabase';
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';

export default function GoogleLoginButton({ onLogin }) {
  const navigation = useNavigation();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '1051910795082-8ogrc292dfpdi9f1srdr79je1kem5sho.apps.googleusercontent.com',
    redirectUri: 'https://pvlfdoyarqaignybhjid.supabase.co/auth/v1/callback', 
  });

  React.useEffect(() => {
    console.log("useEffect executado com response:", response);

    if (response?.type === 'success') {
      console.log("Resposta bem-sucedida do Google:", response);
      const { id_token } = response.params;

      if (id_token) {
        console.log("ID Token encontrado, iniciando signInWithIdToken...");
        
        supabase.auth.signInWithIdToken({
          provider: 'google',
          token: id_token,
        })
        .then(({ data, error }) => {
          if (error) {
            console.error("Erro ao logar com Google:", error);
          } else {
            console.log("Login realizado com sucesso:", data);

            if (onLogin) {
              console.log("Chamando função onLogin...");
              onLogin();
            } else {
              console.log("Navegando para Home...");
              navigation.navigate("Home");
            }
          }
        })
        .catch((err) => {
          console.error("Erro inesperado durante o signInWithIdToken:", err);
        });
      } else {
        console.error("ID Token não encontrado.");
      }
    } else if (response?.type === 'error') {
      console.error("Erro na resposta do Google:", response.error);
    }
  }, [response]);

  const handleGoogleLogin = () => {
    console.log("Iniciando autenticação com Google...");
    promptAsync();
  };

  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={handleGoogleLogin} style={styles.icon}>
        <View style={styles.ovalIcon}>
          <Icon name="google" size={30} color="#D4D4D8" />
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
