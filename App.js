import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
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
        <View style={styles.loadingContainer}>
          <Image
            source={require('./assets/logo.png')}
            style={styles.splashImage}
            resizeMode="contain"
          />
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      ) : (
        <Routes googleMapsApiKey={Constants.manifest?.extra?.googleMapsApiKey} />
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
    backgroundColor: '#171717',
  },
  splashImage: {
    width: '80%',
    height: '40%',
    marginBottom: 20,
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 20,
    marginTop: 20,
  },
});
