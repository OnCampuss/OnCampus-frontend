import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MapPinPlus } from 'lucide-react-native';
import { Entypo } from '@expo/vector-icons';
import * as LocationAPI from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Line from '../../components/Line';
import Title from '../../components/Title';
import TravelInfoCard from '../../components/TravelInfoCard';
import { GOOGLE_MAPS_APIKEY } from '../../config/config';

const backgroundImage = require('../../images/Group.png');

const DESTINATION = {
  latitude: -28.2616,
  longitude: -52.4089,
};

export default function Location() {
  const translateY = useRef(new Animated.Value(590)).current;
  const [isPulled, setIsPulled] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showRoute, setShowRoute] = useState(false);

  const toggleCard = () => {
    const toValue = isPulled ? 581 : 0;
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
      <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
        <View style={styles.container}>
          {errorMsg ? (
            <Text style={styles.errorText}>{errorMsg}</Text>
          ) : location ? (
            <MapView
              style={styles.map}
              region={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
              }}
              showsUserLocation={true}
            >
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="Você está aqui"
              />
              <Marker coordinate={DESTINATION} title="Destino" description="R. Sen. Pinheiro, 304" />
              {showRoute && (
                <MapViewDirections
                  origin={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                  destination={DESTINATION}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={4}
                  strokeColor="blue"
                />
              )}
            </MapView>
          ) : (
            <Text style={styles.loadingText}>Carregando mapa...</Text>
          )}

          <TouchableOpacity style={styles.routeButton} onPress={() => setShowRoute(true)}>
            <MapPinPlus size={24} color="#fff" />
          </TouchableOpacity>

          <Animated.View style={[styles.card, { transform: [{ translateY }] }]}>
            <View style={styles.cardHeader}>
              <MapPinPlus size={24} color="#D4D4D8" style={styles.icon} />
              <Title style={styles.cardTitle}>Informações da Viagem</Title>
              <TouchableOpacity style={styles.iconContainer} onPress={toggleCard}>
                <Entypo name={isPulled ? "chevron-thin-down" : "chevron-thin-up"} size={20} color="#D4D4D8" />
              </TouchableOpacity>
            </View>

            <Line />

            <Text style={styles.cardSubtitle}>Ônibus da Viagem</Text>

            <TravelInfoCard />
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
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  loadingText: {
    fontSize: 18,
    color: 'white',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  routeButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    height: 650,
    backgroundColor: '#27272A',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 5,
    position: 'absolute',
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  iconContainer: {
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  cardSubtitle: {
    color: '#D4D4D8',
    fontSize: 16,
    marginTop: 5,
  },
});
