import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import * as LocationAPI from 'expo-location'; 
import MapView, { Marker } from 'react-native-maps';

const backgroundImage = require('../images/Group.png');

export default function Location() {
  const translateY = useRef(new Animated.Value(300)).current; 
  const [isPulled, setIsPulled] = useState(false); 
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const toggleCard = () => {
    const toValue = isPulled ? 300 : 0;
    Animated.timing(translateY, {
      toValue: toValue,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      setIsPulled(!isPulled);
    });
  };

  useEffect(() => {
    let locationSubscription = null;

    async function requestLocationPermissions() {
      try {
        const permissionResponse = await LocationAPI.requestForegroundPermissionsAsync();
        if (permissionResponse.status === 'granted') {
          locationSubscription = await LocationAPI.watchPositionAsync(
            {
              accuracy: LocationAPI.Accuracy.High,
              timeInterval: 10000,
              distanceInterval: 10,
            },
            (newLocation) => {
              setLocation(newLocation);
              console.log("Localização atualizada => ", newLocation);
            }
          );
        } else {
          setErrorMsg('Permissão de localização não concedida');
        }
      } catch (error) {
        setErrorMsg('Erro ao obter localização');
      }
    }

    requestLocationPermissions();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.flex}>
      <ImageBackground 
        source={backgroundImage}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <Text style={styles.text}>Localização</Text>

          {errorMsg ? (
            <Text style={styles.errorText}>{errorMsg}</Text>
          ) : location ? (
            <MapView
              style={styles.map}
              region={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="Você está aqui"
              />
            </MapView>
          ) : (
            <Text style={styles.loadingText}>Carregando mapa...</Text>
          )}

          <Animated.View style={[styles.card, { transform: [{ translateY }] }]}>
            <Text style={styles.cardText}>Este é um cartão puxável</Text>
            <TouchableOpacity style={styles.iconContainer} onPress={toggleCard}>
              <Entypo name={isPulled ? "arrow-down" : "arrow-up"} size={24} color="white" />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: '#171717',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'red',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  loadingText: {
    fontSize: 18,
    color: 'white',
  },
  card: {
    width: '98%',
    height: 400,
    backgroundColor: '#3B82F6',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    position: 'absolute', 
    bottom: 20, 
  },
  cardText: {
    color: 'white',
    fontSize: 18,
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: '#0052D4',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%', // Ocupa toda a altura disponível
  },
});
