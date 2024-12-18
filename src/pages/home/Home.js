// src/pages/home/Home.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Carteirinha from '../../components/Carteirinha';
import AdaptiveCard from '../../components/AdaptativeCard';
import { Newspaper, BellRing } from 'lucide-react-native';
import DailyVote from '../../components/DailyVote';
import FinanceCard from '../../components/FinanceCard'; 
import Title from '../../components/Title';

const backgroundImage = require('../../images/Group.png');

export default function Home() {
  const [showPrompt, setShowPrompt] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      const isRegistered = await AsyncStorage.getItem('isRegistered');
      if (!isRegistered) {
        setShowPrompt(true);
      }
    };

    checkRegistrationStatus();
  }, []);

  const handleRegistrationComplete = async () => {
    await AsyncStorage.setItem('isRegistered', 'true');
    setShowPrompt(false);
    Alert.alert('Cadastro completo!', 'Agora você pode acessar todas as funcionalidades.');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.container}>
        
        <Carteirinha />
        
        <View style={styles.titleContainer}>
          <Newspaper size={24} color="#D4D4D8" style={styles.titleIcon} />
          <Title>Seu Feed</Title>
        </View>

        <View style={styles.cardsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Votação')}> 
            <AdaptiveCard>
              <View style={styles.innerCard}>
                <DailyVote />
              </View>
            </AdaptiveCard>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Finance')}> 
            <AdaptiveCard>
              <View style={styles.innerCard}>
                <FinanceCard />
              </View>
            </AdaptiveCard>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <BellRing size={24} color="#D4D4D8" style={styles.titleIcon} />
            <Title>Ultimas notificações</Title>
          </View>

          <AdaptiveCard>
            <View style={styles.innerCard}>
              <Text style={{ color: '#FFFFFF' }}>Nenhuma notificação</Text>
            </View>
          </AdaptiveCard>

        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#171717',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 10,
  },
  cardsContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  innerCard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
