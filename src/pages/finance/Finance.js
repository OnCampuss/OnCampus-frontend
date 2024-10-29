import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Card from '../../components/Card';
import Line from '../../components/Line';
import { Feather } from '@expo/vector-icons';

const backgroundImage = require('../../images/Group.png');

export default function Finance() {
  return (
    <ImageBackground 
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={{ marginBottom: 20 }}>
          <Card height={150} style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Vencimento da Fatura</Text>
              <Text style={styles.cardSubtitle}>Sua fatura vence em:</Text>
              <Text style={styles.cardDueDate}>30/10/2024</Text>
              <TouchableOpacity style={styles.paymentButton}>
                <Text style={styles.paymentButtonText}>Pagar Fatura</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Card height={150} style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Histórico de Faturas</Text>
              <Line />
              <Text style={styles.cardSubtitle}>Faturas pagas:</Text>
              <Text style={styles.cardHistory}>- Fatura de Setembro: R$ 100,00</Text>
              <Text style={styles.cardHistory}>- Fatura de Outubro: R$ 120,00</Text>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    marginBottom: 20,
    padding: 20,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#D3D3D8',
    textAlign: 'center',
    marginBottom: 5,
  },
  cardDueDate: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 15,
  },
  paymentButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: '60%',
  },
  paymentButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardHistory: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 5,
  },
});
