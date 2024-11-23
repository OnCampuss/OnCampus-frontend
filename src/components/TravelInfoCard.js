import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BusFront, MapPinCheck } from 'lucide-react-native';
import Line from './Line';

const busImage = require('../images/bus.webp'); 

export default function TravelInfoCard() {
  const travelTime = '30 minutos'; 

  return (
    <View style={styles.travelInfoContainer}>
      <Image source={busImage} style={styles.busImage} />
      <View style={styles.plateContainer}>
        <Text style={styles.plateText}>XYZ-1234</Text>
      </View>
      <View style={styles.departureContainer}>
        <BusFront size={24} color="#D4D4D8" style={styles.busIcon} />
        <Text style={styles.label}>
          Saída: <Text style={styles.value}>Hotel Plaza</Text>
        </Text>
      </View>
      <Text style={styles.tripInfo}>
        {travelTime ? `Viagem de ${travelTime}` : 'Carregando...'}
      </Text>
      <View style={styles.dashedLine} />
      <View style={styles.destinationContainer}>
        <MapPinCheck size={24} color="#D4D4D8" style={styles.pinIcon} />
        <Text style={styles.label}>
          Destino: <Text style={styles.value}>Atitus Edu</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Horários</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 10 }}>
        <Line />
      </View>
      <Text style={styles.tripDescription}>
        Saída do Hotel Plaza Sul com destino à Atitus Educação. Retorno previsto para as 22:20, com embarque na lateral da Atitus.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  travelInfoContainer: {
    marginTop: 20,
    width: '100%',
    padding: 20,
    backgroundColor: '#3B3B3F',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 4,
  },
  busImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  plateContainer: {
    backgroundColor: '#333',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 15,
  },
  plateText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
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
  dashedLine: {
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
    width: '100%',
    marginVertical: 10,
    borderStyle: 'dashed',
  },
  tripDescription: {
    color: 'white',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
});
