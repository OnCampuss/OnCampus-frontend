import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Mail, LockKeyhole } from 'lucide-react-native';
import { supabase } from "../../services/supabase";
import ButtonLarge from "../../components/ButtonLarge"; 
import Icon from 'react-native-vector-icons/FontAwesome'; 

const backgroundImage = require('../../images/mixed.jpg');

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          Alert.alert("Erro", "Senha ou email incorretos. Tente novamente.");
        } else {
          Alert.alert("Erro", error.message);
        }
        return;
      }
      onLogin();
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      Alert.alert("Sucesso", "Cadastro realizado com sucesso! Você pode fazer login agora.");
    } catch (error) {
      if (error.message.includes("Email already exists")) {
        Alert.alert("Erro", "Você já possui uma conta com este email.");
      } else {
        Alert.alert("Erro", error.message);
      }
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUpScreen');
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
            <TouchableOpacity onPress={navigateToSignUp}>
              <Text style={styles.linkText}>
                Não possui cadastro? 
                <Text style={styles.linkTextHighlight}> Cadastre-se</Text>
              </Text>
            </TouchableOpacity>

            <Text style={styles.socialLoginText}>Faça Login com</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity style={styles.icon}>
                <View style={styles.ovalIcon}>
                  <Icon name="facebook" size={30} color="#fff" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon}>
                <View style={styles.ovalIcon}>
                  <Icon name="google" size={30} color="#fff" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon}>
                <View style={styles.ovalIcon}>
                  <Icon name="twitter" size={30} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.imageContainer}>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    width: '100%', 
    height: '100%',
    backgroundColor: '#171717',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#887E7E',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  input: {
    height: 60,
    flex: 1,
    paddingLeft: 10,
    color: '#D3D3D8',
  },
  icon: {
    marginLeft: 10,
  },
  vectorImage: {
    width: '100%',
    height: 500,
    bottom: -140,
    position: 'absolute',
  },
  imageContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  linkText: {
    color: '#ffffff',
    marginTop: 12,
    textAlign: 'center',
  },
  linkTextHighlight: {
    color: '#0093E9',
    fontWeight: 'bold',
  },
  socialLoginText: {
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 12,
  },
  ovalIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3B5998',
    justifyContent: 'center',
    alignItems: 'center',
  },
});