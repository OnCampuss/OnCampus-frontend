// src/screens/ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { useNavigation } from "@react-navigation/native";
import { View, Text, ActivityIndicator } from "react-native";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setAuthenticated(true);
      } else {
        navigation.navigate("Login"); // Redireciona para login
      }
      setLoading(false);
    };
    checkSession();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!authenticated) {
    return (
      <View>
        <Text>Você não tem permissão para acessar esta tela.</Text>
      </View>
    );
  }

  return children;
}
