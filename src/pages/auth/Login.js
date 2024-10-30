import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Mail, LockKeyhole } from "lucide-react-native";
import { supabase } from "../../services/supabase";
import ButtonLarge from "../../components/ButtonLarge";
import Icon from "react-native-vector-icons/FontAwesome";

const backgroundImage = require("../../images/mixed.jpg");

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session && data.session.user.email_confirmed_at) {
        onLogin();
        navigation.navigate("Home");
      }
    };
    checkSession();
  }, []);

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert("Erro", error.message);
    } else {
      if (data.user && data.user.email_confirmed_at) {
        onLogin();
        navigation.navigate("Home");
      } else {
        Alert.alert(
          "Confirmação de E-mail",
          "Por favor, verifique seu e-mail para confirmar sua conta."
        );
        await supabase.auth.signOut();
        navigation.navigate("Login");
      }
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      Alert.alert("Erro", "Não foi possível realizar o login com o Google.");
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate("SignUpScreen");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ImageBackground
          source={backgroundImage}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Mail size={20} color="#887E7E" style={styles.icon} />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                placeholderTextColor="#fff"
              />
            </View>
            <View style={styles.inputContainer}>
              <LockKeyhole size={20} color="#887E7E" style={styles.icon} />
              <TextInput
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#fff"
              />
            </View>
            <ButtonLarge title="Login" onPress={handleLogin} />

            <TouchableOpacity onPress={navigateToSignUp} style={styles.cad}>
              <Text style={styles.linkText}>
                Não possui cadastro?
                <Text style={styles.linkTextHighlight}> Cadastre-se</Text>
              </Text>
            </TouchableOpacity>

            <Text style={styles.socialLoginText}>Faça Login com</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity style={styles.icon}>
                <View style={styles.ovalIcon}>
                  <Icon name="facebook" size={30} color="#D4D4D8" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleGoogleLogin} style={styles.icon}>
                <View style={styles.ovalIcon}>
                  <Icon name="google" size={30} color="#D4D4D8" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon}>
                <View style={styles.ovalIcon}>
                  <Icon name="apple" size={30} color="#D4D4D8" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#171717",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#887E7E",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    backgroundColor: "transparent",
  },
  cad: {
    marginTop: 12,
  },
  input: {
    height: 60,
    flex: 1,
    paddingLeft: 10,
    color: "#D3D3D8",
  },
  icon: {
    marginLeft: 10,
  },
  linkText: {
    color: "#ffffff",
    marginTop: 12,
    textAlign: "center",
  },
  linkTextHighlight: {
    color: "#0093E9",
    fontWeight: "bold",
  },
  socialLoginText: {
    color: "#ffffff",
    textAlign: "center",
    marginVertical: 12,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
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
