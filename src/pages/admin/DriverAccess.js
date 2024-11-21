import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import * as LocationAPI from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '../../config/config';
import Title from '../../components/Title';
import Line from '../../components/Line';

export default function RouteScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showRoute, setShowRoute] = useState(false);
  const [routeInfo, setRouteInfo] = useState({ distance: null, duration: null });

  const startOptions = [
    {
      latitude: -28.287555,
      longitude: -52.793474,
      address: 'Av. Flores da Cunha, 4800 - Centro, Carazinho - RS, 99500-000',
    },
    {
      latitude: -28.281050,
      longitude: -52.789120,
      address: 'R. Alexandre da Motta, 724 - Centro, Carazinho - RS, 99500-000',
    },
  ];

  const destinationOptions = [
    {
      latitude: -28.262944,
      longitude: -52.408456,
      address: 'Atitus Educação, Passo Fundo - RS',
    },
    {
      latitude: -28.257222,
      longitude: -52.405500,
      address: 'Pobris, Passo Fundo - RS',
    },
  ];

  const [selectedStart, setSelectedStart] = useState(startOptions[0]);
  const [selectedDestination, setSelectedDestination] = useState(
    destinationOptions[0]
  );

  const [isStartModalVisible, setStartModalVisible] = useState(false);
  const [isDestinationModalVisible, setDestinationModalVisible] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await LocationAPI.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão de localização negada.');
        return;
      }

      const currentLocation = await LocationAPI.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };

    getLocation();
  }, []);

  const handleRouteReady = (result) => {
    setRouteInfo({
      distance: result.distance,
      duration: result.duration,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={
          location
            ? {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : undefined
        }
        showsUserLocation
      >
        <Marker
          coordinate={{
            latitude: selectedStart.latitude,
            longitude: selectedStart.longitude,
          }}
          title="Ponto de Partida"
          description={selectedStart.address}
        />
        <Marker
          coordinate={{
            latitude: selectedDestination.latitude,
            longitude: selectedDestination.longitude,
          }}
          title="Destino"
          description={selectedDestination.address}
        />

        {showRoute && (
          <MapViewDirections
            origin={{
              latitude: selectedStart.latitude,
              longitude: selectedStart.longitude,
            }}
            destination={{
              latitude: selectedDestination.latitude,
              longitude: selectedDestination.longitude,
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="blue"
            onReady={handleRouteReady}
          />
        )}
      </MapView>

      <View style={styles.card}>
        <Title>Configurar Rota</Title>
        <Line />
        <Text style={{ color: '#fff', marginBottom: 10, marginTop: 5 }}>
          Ponto de partida:
        </Text>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => setStartModalVisible(true)}
        >
          <Text style={styles.optionText}>
            {selectedStart.address || 'Escolher ponto de partida'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.subText}>Ponto de destino:</Text>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => setDestinationModalVisible(true)}
        >
          <Text style={styles.optionText}>
            {selectedDestination.address || 'Escolher destino'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowRoute(true)}
        >
          <Text style={styles.buttonText}>Iniciar Rota</Text>
        </TouchableOpacity>

        {routeInfo.distance && routeInfo.duration && (
          <View style={styles.routeInfo}>
            <Text style={styles.routeInfoText}>
              Informações: {' '} 
              <Text style={styles.distanceText}>{routeInfo.distance.toFixed(2)} km </Text> e {' '} 
              <Text style={styles.durationText}>{routeInfo.duration.toFixed(2)} minutos</Text>
            </Text>
          </View>
        )}
      </View>

      <Modal
        transparent={true}
        visible={isStartModalVisible}
        animationType="slide"
        onRequestClose={() => setStartModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha o ponto de partida:</Text>
            {startOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalOptionButton}
                onPress={() => {
                  setSelectedStart(option);
                  setStartModalVisible(false);
                }}
              >
                <Text style={styles.optionText}>{option.address}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setStartModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={isDestinationModalVisible}
        animationType="slide"
        onRequestClose={() => setDestinationModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha o destino:</Text>
            {destinationOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalOptionButton}
                onPress={() => {
                  setSelectedDestination(option);
                  setDestinationModalVisible(false);
                }}
              >
                <Text style={styles.optionText}>{option.address}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setDestinationModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  card: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#171717',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  routeInfo: {
    marginTop: 15,
    backgroundColor: '#27272a',
    padding: 10,
    borderRadius: 10,
  },
  routeInfoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  distanceText: {
    color: '#ff6347',
    fontWeight: 'bold',
  },
  durationText: {
    color: '#32cd32',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#171717',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  modalOptionButton: {
    padding: 10,
    backgroundColor: '#27272a',
    borderRadius: 5,
    marginBottom: 10,
  },
  modalCloseButton: {
    padding: 10,
    backgroundColor: '#ff6347',
    borderRadius: 5,
    marginTop: 10,
  },
  modalCloseButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
