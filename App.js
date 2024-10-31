import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import Routes from './src/routes/Routes';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula um tempo de carregamento de 2 segundos
    const timer = setTimeout(() => {
      setIsLoading(false); // Altera o estado para ocultar a tela de splash
    }, 2000);

    return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
  }, []);

  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Image
            source={require('./assets/logo.png')} // Imagem da tela de splash
            style={styles.splashImage}
            resizeMode="contain"
          />
          <ActivityIndicator size="large" color="#ffffff" /> 
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      ) : (
        <Routes />
      )}
      <StatusBar style="light" backgroundColor="#171717" hidden={isLoading} />
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171717', // Cor de fundo enquanto carrega
  },
  splashImage: {
    width: '80%', // Ajuste a largura conforme necessário
    height: '40%', // Ajuste a altura conforme necessário
    marginBottom: 20, // Espaçamento abaixo da imagem
  },
  loadingText: {
    color: '#ffffff', // Cor do texto
    fontSize: 20, // Tamanho do texto
    marginTop: 20, // Espaçamento acima do texto
  },
});
