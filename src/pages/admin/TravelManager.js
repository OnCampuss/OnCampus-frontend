import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ImageBackground, TextInput, FlatList } from 'react-native';
import { ClockArrowUp, SquarePlus } from 'lucide-react-native';
import Card from '../../components/Card';
import ButtonSmall from '../../components/ButtonSmall';
import Line from '../../components/Line';

const backgroundImage = require('../../images/Group.png');

export default function TravelManager({ navigation }) {
  const [nameViagem, setNameViagem] = useState("");
  const [destinoViagem, setDestinoViagem] = useState("");
  const [travels, setTravels] = useState([]);
  const [userId, setUserId] = useState(123);
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk4MzRmYTViLWMzMjAtNGZiNy05NzMxLWIyZDQwYmYyNjE2YiIsImVtYWlsIjoidHJhdmVsbWFuYWdlckB0ZXN0ZS5jb20iLCJpYXQiOjE3MzI0ODYwNjgsImV4cCI6MTczNTA3ODA2OH0.XZuBLFH_-dqkctXmZJiRD1DakG69VxGCz0CIqRce8Yw");

  useEffect(() => {
    fetch("http://18.231.68.185:2000/api/travels", {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => setTravels(data.travel))
      .catch(error => console.error(error));
  }, [token]);

  const handleCreateTrip = async () => {
    try {
      if (!nameViagem || !destinoViagem) {
        Alert.alert("Erro", "Por favor, preencha todos os campos");
        return;
      }

      const response = await fetch("http://18.231.68.185:2000/api/travels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          nameViagem,
          destinoViagem,
          userId
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Viagem criada com sucesso!");
        setNameViagem("");
        setDestinoViagem("");
        setTravels(prevTravels => [...prevTravels, data.travel]);
      } else {
        Alert.alert("Erro", data.message || "Ocorreu um erro ao criar a viagem.");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a viagem. Verifique sua conexão.");
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Card width={362} height={290} style={[styles.card, styles.topCard]}>
          <View style={styles.titleContainer}>
            <SquarePlus size={24} color="#fff" style={styles.icon} />
            <Text style={styles.title}>Criação de viagem</Text>
          </View>
          <Line />
          <View style={styles.inputContainer}>
            <TextInput
              value={nameViagem}
              onChangeText={setNameViagem}
              style={styles.input}
              placeholder="Nome e Data da viagem"
              placeholderTextColor="#aaa"
            />
            <TextInput
              value={destinoViagem}
              onChangeText={setDestinoViagem}
              style={styles.input}
              placeholder="Destino"
              placeholderTextColor="#aaa"
            />
          </View>
          <View style={styles.createContainer}>
            <ButtonSmall title="Criar viagem" onPress={handleCreateTrip} />
          </View>
        </Card>

        <Card width={362} height={330} style={styles.card}>
          <View style={styles.titleContainer}>
            <ClockArrowUp size={24} color="#fff" style={styles.icon} />
            <Text style={styles.title}>Histórico de viagens</Text>
          </View>
          <Line />
          <FlatList
            data={travels}
            renderItem={({ item }) => (
              <View style={styles.cardHistorico}>
                <View style={styles.cardContent}>
                  <ClockArrowUp size={24} color="#fff" style={styles.iconHistorico} />
                  <View>
                    <Text style={styles.textHistoricoTitle}>{item.nameViagem}</Text>
                    <Text style={styles.textHistoricoDestino}>Destino: {item.destinoViagem}</Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </Card>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  background: {
    flex: 1,
    backgroundColor: '#171717',
  },
  card: {
    alignItems: 'center',
    padding: 20,
    marginVertical: 30,
  },
  topCard: {
    marginTop: 50,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#2E2E2E',
    color: '#fff',
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#555',
    padding: 10,
    marginVertical: 10,
    width: '90%',
  },
  createContainer: {
    alignItems: 'center',
    width: '100%',
  },
  cardHistorico: {
    backgroundColor: '#2E2E2E',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  iconHistorico: {
    marginRight: 15,
  },
  textHistoricoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  textHistoricoDestino: {
    fontSize: 14,
    color: '#aaa',
  },
});
