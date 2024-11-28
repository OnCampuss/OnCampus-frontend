import React, { useState } from "react";
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
import ButtonLarge from "../../components/ButtonLarge";
import GoogleLoginButton from './GoogleLoginButton';
import { supabase } from "../../services/supabase";
import FacebookLoginButton from './FacebookLoginButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
const backgroundImage = require("../../images/mixed.jpg");
import Icon from "react-native-vector-icons/FontAwesome";
const logoImage = require("../../../assets/logo.png");

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    console.log('Login iniciado...');
  
    try {
      if (!email || !password) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos');
        return;
      }
  
      const response = await fetch('http://18.231.68.185:2000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Login bem-sucedido. Salvando token e dados do usuário...');
  
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
  
        onLogin();
  
        Alert.alert('Sucesso', 'Login realizado com sucesso');
  
        if (data.user.email === 'motorista@teste.com') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'DriverAccess' }],
          });
        } else if (data.user.email === 'travelmanager@teste.com') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'TravelManager' }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        }
      } else {
        console.log('Falha no login:', data.message || 'Falha no login');
        Alert.alert('Erro', data.message || 'Falha no login');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Erro ao tentar fazer login');
    }
  };
  

  const navigateToSignUp = () => navigation.navigate("SignUpScreen");
  const navigateToForgotPassword = () => navigation.navigate("ForgotPasswordScreen");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
          <View style={styles.container}>
            <Image source={logoImage} style={styles.logo} />
            <Text style={styles.welcomeMessage}>
              Seu aplicativo de transporte universitário!
            </Text>
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
                Não possui cadastro? <Text style={styles.linkTextHighlight}>Cadastre-se</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToForgotPassword} style={styles.forgotPassword}>
              <Text style={styles.linkText}>
                Esqueceu a senha? <Text style={styles.linkTextHighlight}>Clique aqui</Text>
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
