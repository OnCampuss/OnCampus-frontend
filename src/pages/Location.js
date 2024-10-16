import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated, TouchableOpacity, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BusFront, MapPinCheck } from 'lucide-react-native';
import { Entypo } from '@expo/vector-icons';
import * as LocationAPI from 'expo-location'; 
import MapView, { Marker } from 'react-native-maps';
import Line from '../components/Line'; 

const busImage = require('../images/bus.webp');
const backgroundImage = require('../images/Group.png');

const TravelInfoCard = () => {
  return (
    <View style={styles.travelInfoContainer}>
      <View style={styles.departureContainer}>
        <BusFront size={24} color="#D4D4D8" style={styles.busIcon} />
        <Text style={styles.label}>
          Saída: <Text style={styles.value}>Hotel Plaza</Text>
        </Text>
      </View>
      <Text style={styles.tripInfo}>Viagem de 30 minutos (40 km)</Text>
      <View style={styles.dashedLine} />
      <View style={styles.destinationContainer}>
        <MapPinCheck size={20} color="#D4D4D8" style={styles.pinIcon} />
        <Text style={styles.label}>
          Destino: <Text style={styles.value}>Atitus Edu</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Horários</Text>
      </TouchableOpacity>
      <Line />
      <Text style={styles.tripDescription}>
        Saída do Hotel Plaza Sul com destino à Atitus Educação. Retorno previsto para as 22:20, com embarque na lateral da Atitus.
      </Text>
    </View>
  );
};

export default function Location() {
  const translateY = useRef(new Animated.Value(585)).current; 
  const [isPulled, setIsPulled] = useState(false); 
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const toggleCard = () => {
    const toValue = isPulled ? 585 : 0;
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
          {errorMsg ? (
            <Text style={styles.errorText}>{errorMsg}</Text>
          ) : location ? (
            <MapView
              style={styles.map}
              region={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.003,
                longitudeDelta: 0.002,
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
            </MapView>
          ) : (
            <Text style={styles.loadingText}>Carregando mapa...</Text>
          )}

          <Animated.View style={[styles.card, { transform: [{ translateY }] }]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Informações da Viagem</Text>
              <TouchableOpacity style={styles.iconContainer} onPress={toggleCard}>
                <Entypo name={isPulled ? "chevron-thin-down" : "chevron-thin-up"} size={20} color="#D4D4D8" />
              </TouchableOpacity>
            </View>

            <Line />

            <Text style={styles.cardSubtitle}>Ônibus da Viagem</Text>

            <Image 
              source={busImage} 
              style={styles.busImage}
            />

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
  dashedLine: {
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
    width: '100%',
    marginVertical: 10,
    borderStyle: 'dashed',
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
    alignItems: 'flex-start',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: 'center',
    flex: 1,
    left: 10,
  },
  cardSubtitle: {
    color: '#D4D4D8',
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
    width: '100%',
  },
  busImage: {
    width: 350,
    height: 250,
    borderRadius: 15,
    marginTop: 10,
  },
  travelInfoContainer: {
    marginTop: 20,
    width: '100%',
    padding: 20,
    backgroundColor: '#3B3B3F',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 4,
  },
  departureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  value: {
    fontWeight: 'bold',
    color: 'white',
  },
  tripInfo: {
    color: 'gray',
    fontSize: 14,
    marginBottom: 10,
  },
  destinationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  pinIcon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#007bff',
    borderRadius: 2,
    marginTop: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  tripDescription: {
    color: 'white',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
});
