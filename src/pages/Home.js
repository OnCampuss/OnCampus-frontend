import React from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Carteirinha from '../components/Carteirinha';
import AdaptiveCard from '../components/AdaptativeCard';
import { Newspaper, BellRing } from 'lucide-react-native';
import DailyVote from '../components/DailyVote';
import FinanceCard from '../components/FinanceCard'; 
import Title from '../components/Title';

const backgroundImage = require('../images/Group.png');

export default function Home() {
  const navigation = useNavigation();

  return (
    <ImageBackground 
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover" 
    >
      <View style={styles.container}>
        <Carteirinha />
        
        <View style={styles.titleContainer}>
          <Newspaper size={24} color="#FFFFFF" style={styles.titleIcon} />
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

          <AdaptiveCard>
            <View style={styles.innerCard}>
              <FinanceCard />
            </View>
          </AdaptiveCard>

          <View style={styles.titleContainer}>
            <BellRing size={24} color="#FFFFFF" style={styles.titleIcon} />
            <Title>Ultimas notificações</Title>
          </View>

          <AdaptiveCard>
            <View style={styles.innerCard}>
              <Text style={{ color: '#FFFFFF' }}>Nenhuma notificação</Text>
            </View>
          </AdaptiveCard>


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
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },titleContainer: {
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
