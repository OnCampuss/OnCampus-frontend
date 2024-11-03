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
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Mail, LockKeyhole } from "lucide-react-native";
import { supabase } from "../../services/supabase";
import ButtonLarge from "../../components/ButtonLarge";
import Icon from "react-native-vector-icons/FontAwesome";
import GoogleLoginButton from './GoogleLoginButton';
import FacebookLoginButton from './FacebookLoginButton'; // Importando o botão de login do Facebook

const backgroundImage = require("../../images/mixed.jpg");
const logoImage = require("../../../assets/logo.png");

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

  const navigateToSignUp = () => {
    navigation.navigate("SignUpScreen");
  };

  const navigateToForgotPassword = () => {
    navigation.navigate("ForgotPasswordScreen");
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
            <Image source={logoImage} style={styles.logo} />
            <Text style={styles.welcomeMessage}>Seu aplicativo de transporte universitário!</Text> 
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
            <Text style={styles.socialLoginText}>ou</Text>
            <View style={styles.iconContainer}>
              <FacebookLoginButton style={styles.icon} /> 
              <GoogleLoginButton style={styles.icon} /> 
              <TouchableOpacity style={styles.icon}>
                <View style={styles.ovalIcon}>
                  <Icon name="apple" size={30} color="#D4D4D8" />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={navigateToForgotPassword} style={styles.forgotPassword}>
              <Text style={styles.linkText}>
                Esqueceu a senha?
                <Text style={styles.linkTextHighlight}> Clique aqui</Text>
              </Text>
            </TouchableOpacity>
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
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    bottom: 45,
  },
  welcomeMessage: {
    color: "#d4d4d2",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
  },
  forgotPassword: {
    marginTop: 12,
    textAlign: "center",
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
    alignItems: "center",
    justifyContent: "center",
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
