import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import Line from '../components/Line';
import Card from '../components/Card';
import { SquareCheck, Timer } from 'lucide-react-native';

const backgroundImage = require('../images/Group.png');

export default function Voting() {
  const [vote, setVote] = useState('');
  const [timeRemaining, setTimeRemaining] = useState('');
  const [secondsRemaining, setSecondsRemaining] = useState('');

  const handleVote = () => {
    if (vote) {
      Alert.alert('Voto registrado', `Você votou: ${vote}`);
    } else {
      Alert.alert('Atenção', 'Por favor, escolha uma opção antes de votar.');
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
      return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    } else {
      return '00:00';
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    setTimeRemaining(calculateTimeRemaining());

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground 
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={{ marginBottom: 20 }}>
          <Card height={460} style={styles.card}>
            <View style={styles.textContainer}>
              <View style={styles.titleContainer}>
                <SquareCheck size={24} color="#D4D4D8" />
                <Text style={styles.title}>Votação do Dia</Text>
              </View>
              <Line />
              <Text style={styles.subtitle}>Ônibus Atitus - Passo fundo - 06/06/2025</Text>
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
                  <Text style={styles.secondsText}>{secondsRemaining < 10 ? `:0${secondsRemaining}` : `:${secondsRemaining}`}</Text>
                </>
              )}
            </View>
            <Line />
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
    justifyContent: 'flex-start',
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
    textAlign: 'center',
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
    marginBottom: 5,
    textAlign: 'center',
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
