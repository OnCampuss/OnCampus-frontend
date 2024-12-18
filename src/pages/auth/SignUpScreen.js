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
import { Mail, LockKeyhole, Eye, EyeOff } from "lucide-react-native";
import ButtonLarge from "../../components/ButtonLarge";

const backgroundImage = require("../../images/mixed.jpg");

const formatCPF = (cpf) => {
  return cpf
    .replace(/\D/g, "") 
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"); 
};

export default function SignUpScreen() {
  const [name, setName] = useState("");  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");  
  const [semestre, setSemestre] = useState("");  
  const [curso, setCurso] = useState("");  
  const [matricula, setMatricula] = useState("");  
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (!name || !email || !password || !cpf || !semestre || !curso || !matricula) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }
  
    console.log("Iniciando cadastro...");
    console.log("Dados enviados:", {
      name,
      email,
      password: "***",  
      cpf,
      semestre,
      curso,
      matricula,
    });
  
    try {
      const response = await fetch("http://18.231.68.185:2000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          cpf,
          semestre,
          curso,
          matricula, 
        }),
      });
  
      console.log("Resposta da API recebida:", response.status);
      const data = await response.json();
      console.log("Resposta do servidor:", data);
  
      if (response.ok) {
        console.log("Cadastro realizado com sucesso!");
        Alert.alert("Sucesso", "Usuário registrado com sucesso!");
        navigation.navigate("Login");
      } else {
        console.log("Erro ao registrar usuário:", data.message || "Erro desconhecido.");
        Alert.alert("Erro", data.message || "Erro desconhecido.");
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      Alert.alert("Erro", "Erro inesperado, tente novamente.");
    }
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  const handleCpfChange = (text) => {
    const formattedCpf = formatCPF(text);
    setCpf(formattedCpf);
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
            <Text style={styles.mensage}>Crie sua conta para começarmos!</Text>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                style={styles.input}
                placeholderTextColor="#fff"
              />
            </View>

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
                style={styles.eyeIconContainer}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#887E7E" />
                ) : (
                  <Eye size={20} color="#887E7E" />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="CPF"
                value={cpf}
                onChangeText={handleCpfChange}  
                keyboardType="numeric"
                maxLength={14}  
                style={styles.input}
                placeholderTextColor="#fff"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Semestre"
                value={semestre}
                onChangeText={setSemestre}
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor="#fff"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Curso"
                value={curso}
                onChangeText={setCurso}
                style={styles.input}
                placeholderTextColor="#fff"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Matrícula"
                value={matricula}
                onChangeText={setMatricula}
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor="#fff"
              />
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
  mensage: {
    color: "#d4d4d2",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
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
  eyeIconContainer: {
    marginLeft: 10,
    marginRight: 10,
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
