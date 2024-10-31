// src/pages/finance/PaymentMethod.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, Text } from 'react-native'; 
import { CheckCircle, DollarSign } from 'lucide-react-native';
import Card from '../../components/Card';
import Title from '../../components/Title';
import Line from '../../components/Line';
import SubText from '../../components/SubText'; 

const backgroundImage = require('../../images/Group.png');

export default function PaymentMethod({ navigation }) {
  const paymentMethods = [
    { id: 1, name: 'Cartão de Crédito' },
    { id: 2, name: 'Cartão de Débito' },
    { id: 3, name: 'Transferência Bancária' },
    { id: 4, name: 'Pix' },
  ];

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Card height={400} style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.titleContainer}>
                <DollarSign size={24} color="#D4D4D8" style={styles.icon} />
                <Title style={styles.title}>Forma de Pagamento</Title>
              </View>
              <Line />
              <SubText>
                Aqui você pode visualizar e gerenciar suas formas de pagamento. Escolha uma opção para continuar.
              </SubText>
              
              <View style={styles.methodsContainer}>
                {paymentMethods.map((method) => (
                  <TouchableOpacity 
                    key={method.id} 
                    style={styles.methodButton}
                    onPress={() => 
                      method.name === 'Pix' 
                        ? navigation.navigate('PixPayment') 
                        : navigation.navigate('PaymentDetail', { method: method.name })
                    }
                  >
                    <CheckCircle size={24} color="#D4D4D8" />
                    <Text style={styles.methodText}>{method.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
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
  cardContainer: {
    marginBottom: 20,
  },
  card: {
    padding: 20,
    backgroundColor: '#2D2D32',
    borderRadius: 15,
  },
  cardContent: {
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 10, 
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#D4D4D8',
    marginLeft: 10,
  },
  methodsContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  methodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A4A4A',
    borderRadius: 10,
    padding: 15,
    width: '90%',
    marginVertical: 5,
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  methodText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});
