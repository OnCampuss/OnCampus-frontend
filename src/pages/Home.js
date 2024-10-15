import React from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Carteirinha from '../components/Carteirinha';
import AdaptiveCard from '../components/AdaptativeCard';
import DailyVote from '../components/DailyVote';
import FinanceCard from '../components/FinanceCard'; 
const backgroundImage = require('../images/Group.png');

export default function Home() {
  return (
    <ImageBackground 
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover" 
    >
      <View style={styles.container}>
        <Carteirinha />
        
        <View style={styles.titleContainer}>
          <Feather name="book" size={24} color="#FFFFFF" style={styles.titleIcon} />
          <Text style={styles.title}>Seu Feed</Text>
        </View>

        <View style={styles.cardsContainer}>
          <AdaptiveCard>
            <View style={styles.innerCard}>
              <DailyVote />
            </View>
          </AdaptiveCard>

          <AdaptiveCard>
            <View style={styles.innerCard}>
              <FinanceCard />
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
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  titleIcon: {},
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
