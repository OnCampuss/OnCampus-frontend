import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Routes from './src/routes/Routes';
import Constants from 'expo-constants';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <LinearGradient
          colors={['#171717', '#171616']} 
          style={styles.loadingContainer}
        >
          <StatusBar style="light" backgroundColor="#171717" />
          <Image
            source={require('./assets/logo.png')}
            style={styles.splashImage}
            resizeMode="contain"
          />
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </LinearGradient>
      ) : (
        <>
          <StatusBar style="light" backgroundColor="#171717" />
          <Routes googleMapsApiKey={Constants.manifest?.extra?.googleMapsApiKey} />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: '80%',
    height: '40%',
    marginBottom: 20,
    // Adicionando sombra à imagem
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 5,
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 24, // Aumentando o tamanho da fonte
    marginTop: 20,
    textShadowColor: '#000', // Adicionando sombra ao texto
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});
