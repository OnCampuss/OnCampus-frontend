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
import { Mail, LockKeyhole } from "lucide-react-native";
import { supabase } from "../../services/supabase";
import ButtonLarge from "../../components/ButtonLarge";

const backgroundImage = require("../../images/mixed.jpg");

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert("Erro", error.message);
    } else {
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      navigation.navigate("Login");
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
                secureTextEntry
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
});
