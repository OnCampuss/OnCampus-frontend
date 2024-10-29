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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Mail, LockKeyhole, Eye, EyeOff } from "lucide-react-native"; // Importe os ícones
import { supabase } from "../../services/supabase"; // ajuste o caminho conforme necessário
import ButtonLarge from "../../components/ButtonLarge";

const backgroundImage = require("../../images/mixed.jpg");

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado para confirmação de senha
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar senha
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar confirmação de senha
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return; // Sai da função se as senhas não coincidirem
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert("Erro", error.message);
    } else {
      Alert.alert(
        "Verifique seu e-mail",
        "Cadastro realizado com sucesso! Verifique sua caixa de entrada para confirmar o e-mail."
      );

      // Redireciona para a tela de login após 2 segundos
      setTimeout(() => {
        navigation.navigate("Login");
      }, 2000); // Altere o tempo conforme necessário
    }
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
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
                secureTextEntry={!showPassword}
                style={styles.input}
                placeholderTextColor="#fff"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIconContainer} // Adicionando estilo aqui
              >
                {showPassword ? (
                  <EyeOff size={20} color="#887E7E" />
                ) : (
                  <Eye size={20} color="#887E7E" />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <LockKeyhole size={20} color="#887E7E" style={styles.icon} />
              <TextInput
                placeholder="Confirme a Senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                style={styles.input}
                placeholderTextColor="#fff"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeIconContainer} // Adicionando estilo aqui
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} color="#887E7E" />
                ) : (
                  <Eye size={20} color="#887E7E" />
                )}
              </TouchableOpacity>
            </View>
            <ButtonLarge title="Cadastrar" onPress={handleSignUp} />

            <TouchableOpacity onPress={navigateToLogin} style={styles.cad}>
              <Text style={styles.linkText}>
                Já possui cadastro?
                <Text style={styles.linkTextHighlight}> Faça Login</Text>
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
  eyeIconContainer: { // Novo estilo para o ícone de olho
    marginLeft: 10, // Espaço à esquerda do ícone
    marginRight: 10, // Espaço à direita do ícone
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
});
