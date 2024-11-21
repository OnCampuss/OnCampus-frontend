import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

const TravelManager = () => {
  const [trips, setTrips] = useState([]);
  const [newTrip, setNewTrip] = useState({ destination: '', date: '', time: '' });
  const [activeTrip, setActiveTrip] = useState(null);

  const createTrip = () => {
    if (!newTrip.destination || !newTrip.date || !newTrip.time) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos para criar uma viagem.');
      return;
    }

    const newTripId = trips.length + 1;
    setTrips([
      ...trips,
      { id: newTripId, ...newTrip, votes: Math.floor(Math.random() * 100), active: false },
    ]);

    setNewTrip({ destination: '', date: '', time: '' });
    Alert.alert('Sucesso', 'Viagem criada com sucesso!');
  };

  const startTrip = (tripId) => {
    setTrips(trips.map(trip => ({
      ...trip,
      active: trip.id === tripId ? true : trip.active,
    })));
    setActiveTrip(tripId);
    Alert.alert('Viagem Iniciada', `A viagem ${tripId} está ativa.`);
  };

  const renderTrip = ({ item }) => (
    <View style={styles.tripCard}>
      <Text style={styles.tripTitle}>{item.destination}</Text>
      <Text>Data: {item.date}</Text>
      <Text>Hora: {item.time}</Text>
      <Text>Votos: {item.votes}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => startTrip(item.id)}
        disabled={item.active}
      >
        <Text style={styles.buttonText}>
          {item.active ? 'Rota Ativa' : 'Iniciar Rota'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Viagens</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Destino"
          value={newTrip.destination}
          onChangeText={(text) => setNewTrip({ ...newTrip, destination: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Data (DD/MM/AAAA)"
          value={newTrip.date}
          onChangeText={(text) => setNewTrip({ ...newTrip, date: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Hora (HH:MM)"
          value={newTrip.time}
          onChangeText={(text) => setNewTrip({ ...newTrip, time: text })}
        />
        <Button title="Criar Viagem" onPress={createTrip} />
      </View>


      <FlatList
        data={trips}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTrip}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma viagem criada.</Text>}
      />
    </View>
  );
};

export default TravelManager;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  tripCard: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
  },
});
