import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import Title from '../../components/Title';
import HairLine from '../../components/HairLine';

const backgroundImage = require('../../images/Group.png');

export default function TermsAndPolicies() {
  return (
    <ImageBackground 
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Title >Termos e Políticas</Title>
              <Text style={styles.subText}>
                Leia atentamente nossos termos e políticas. Ao utilizar nosso serviço, você concorda com os termos descritos abaixo:
              </Text>
              <HairLine style={styles.hairline} />
              <Text style={styles.policyText}>
                1. Aceitação dos Termos: Ao acessar ou usar nossos serviços, você concorda em cumprir e estar vinculado a estes termos.
              </Text>
              <HairLine style={styles.hairline} />
              <Text style={styles.policyText}>
                2. Uso Aceitável: Você concorda em não usar nossos serviços para atividades ilegais ou proibidas.
              </Text>
              <HairLine style={styles.hairline} />
              <Text style={styles.policyText}>
                3. Alterações: Reservamo-nos o direito de alterar estes termos a qualquer momento.
              </Text>
              <HairLine style={styles.hairline} />
              <Text style={styles.policyText}>
                4. Contato: Se você tiver dúvidas sobre estes termos, entre em contato conosco.
              </Text>
            </View>
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.buttonText}>Aceitar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#2B2B2B',
    borderRadius: 10,
    padding: 20,
    width: '100%',
  },
  cardContent: {
    alignItems: 'center',
  },
  title: {
    marginBottom: 15,
  },
  subText: {
    color: '#D4D4D8',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 10,
  },
  policyText: {
    color: '#D4D4D8',
    fontSize: 14,
    marginVertical: 10,
    textAlign: 'left',
    lineHeight: 20,
  },
  hairline: {
    height: 1,
    backgroundColor: '#D4D4D8',
    marginVertical: 10,
    width: '100%',
  },
  acceptButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
