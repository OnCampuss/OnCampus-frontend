import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { supabase } from "../../services/supabase";
import ButtonLarge from "../../components/ButtonLarge";
import { Mail } from "lucide-react-native";
import Title from "../../components/Title";

const backgroundImage = require("../../images/mixed.jpg");

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      Alert.alert("Erro", error.message);
    } else {
      Alert.alert("Sucesso", "Verifique seu email para redefinir a senha.");
      navigation.navigate("Login");
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Title style={styles.title}>Esqueceu a senha?</Title>
        <View style={styles.spacing} />
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
        <ButtonLarge title="Enviar Email" onPress={handleForgotPassword} />
        <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.link}>
          <Text style={styles.linkText}>Voltar para Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  spacing: {
    height: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#887E7E",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
  },
  icon: {
    padding: 10,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    height: 60,
    color: "#D3D3D8",
    paddingLeft: 10,
    borderRadius: 5,
  },
  link: {
    marginTop: 12,
  },
  linkText: {
    fontWeight: "bold",
    marginTop: 12,
    color: "#0093E9",
    textAlign: "center",
  },
});
