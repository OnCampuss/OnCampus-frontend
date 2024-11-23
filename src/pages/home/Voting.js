import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import Line from '../../components/Line';
import Card from '../../components/Card';
import { SquareCheck, Timer } from 'lucide-react-native';

const backgroundImage = require('../../images/Group.png');

export default function Voting() {
  const [vote, setVote] = useState('');
  const [timeRemaining, setTimeRemaining] = useState('');
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [votes, setVotes] = useState([]); // Armazena votos existentes

  const userToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM2MzYyYmQxLTI3NjEtNGEzZS1hOTUzLTg2OTcxODNmOTdjZSIsImVtYWlsIjoidGVzdGUxMEB0ZXN0ZS5jb20iLCJpYXQiOjE3MzIzOTYwNjMsImV4cCI6MTczNDk4ODA2M30.RNwgS6ck6DyGwetXWdNB0rXnamztFSCdKMt-E9ccwH8';

    const handleVote = async () => {
      if (!vote) {
        Alert.alert('Atenção', 'Por favor, escolha uma opção antes de votar.');
        return;
      }
    
      // Mapear as opções de voto para os campos da API
      const voteMapping = {
        "Vou e volto": { vou: true, volto: true, naoVou: false },
        "Apenas vou": { vou: true, volto: false, naoVou: false },
        "Apenas volto": { vou: false, volto: true, naoVou: false },
        "Não vou hoje": { vou: false, volto: false, naoVou: true },
      };
    
      const votePayload = voteMapping[vote];
    
      try {
        const travelId = "edec26d1-9d61-4f3e-883e-9675643e846b"; // ID da viagem
        const response = await fetch(
          `http://192.168.15.13:2000/api/travels/${travelId}/votes`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify(votePayload),
          }
        );
    
        if (response.ok) {
          const data = await response.json();
          Alert.alert('Voto registrado', `Você votou: ${vote}`);
          setVotes([...votes, data.vote]);
        } else {
          const errorData = await response.json();
          console.error('Erro no servidor:', errorData);
          Alert.alert('Erro', 'Não foi possível registrar o voto.');
        }
      } catch (error) {
        console.error('Erro ao registrar o voto:', error);
        Alert.alert('Erro', 'Não foi possível registrar o voto.');
      }
    };
    
    

  const loadVotes = async () => {
    try {
      const response = await fetch('http://192.168.15.13:2000/api/votes', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setVotes(data.body || []);
      } else {
        const errorData = await response.json();
        console.error('Erro ao carregar votos:', errorData);
      }
    } catch (error) {
      console.error('Erro ao carregar votos:', error);
    }
  };

  const calculateTimeRemaining = () => {
    const now = new Date();
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 0, 0);

    if (now < end) {
      const diffInMilliseconds = end - now;
      const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
      const hours = Math.floor(diffInSeconds / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = diffInSeconds % 60;

      setSecondsRemaining(seconds);
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    return '00:00';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    loadVotes();

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <View style={{ marginBottom: 20 }}>
          <Card height={460} style={styles.card}>
            <View style={styles.textContainer}>
              <View style={styles.titleContainer}>
                <SquareCheck size={24} color="#D4D4D8" />
                <Text style={styles.title}>Votação do Dia</Text>
              </View>
              <Line />
              <Text style={styles.subtitle}>
                Ônibus Atitus - Passo Fundo - 06/06/2025
              </Text>
              <View style={styles.optionsContainer}>
                {['Vou e volto', 'Apenas vou', 'Apenas volto', 'Não vou hoje'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[styles.option, vote === option && styles.selectedOption]}
                    onPress={() => setVote(option)}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity style={styles.voteButton} onPress={handleVote}>
                <Text style={styles.voteButtonText}>Votar</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Card height={110}>
            <View style={styles.timerContainer}>
              <Timer size={20} color="#D4D4D8" />
              <Text style={styles.timerTitle}>Tempo restante para votação</Text>
            </View>
            <Line />
            <View style={styles.timerDisplay}>
              {timeRemaining === '00:00' ? (
                <Text style={styles.timerText}>Votação encerrada</Text>
              ) : (
                <>
                  <Text style={styles.timerText}>{timeRemaining}</Text>
                  <Text style={styles.secondsText}>
                    {secondsRemaining < 10 ? `:0${secondsRemaining}` : `:${secondsRemaining}`}
                  </Text>
                </>
              )}
            </View>
          </Card>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#171717',
  },
  card: {
    marginBottom: 90,
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 5,
  },
  optionsContainer: {
    width: '100%',
    marginTop: 20,
  },
  option: {
    backgroundColor: '#4A4A4A',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
  },
  optionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  voteButton: {
    marginTop: 20,
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '100%',
  },
  voteButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
  },
  timerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  timerDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 30,
    color: '#e63946',
    fontWeight: 'bold',
  },
  secondsText: {
    fontSize: 20,
    color: 'gray',
    marginLeft: 5,
  },
});
