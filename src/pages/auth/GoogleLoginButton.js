import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { supabase } from '../../services/supabase';
import Icon from "react-native-vector-icons/FontAwesome";

export default function GoogleLoginButton() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '916468878707-mrgf520rhtmh3t3kd8m7a6v1tabr4c5n.apps.googleusercontent.com',
    redirectUri: 'https://auth.expo.io/@seu-usuario/seu-app', 
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;

      supabase.auth.signInWithIdToken({
        provider: 'google',
        token: id_token,
      })
      .then(({ data, error }) => {
        console.log(data, error);
      });
    }
  }, [response]);

  const handleGoogleLogin = () => {
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
