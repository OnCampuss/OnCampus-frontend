import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import Card from '../../components/Card';
import Title from '../../components/Title';
import HairLine from '../../components/HairLine';
import { Scroll, ChevronRight, CircleDollarSign } from 'lucide-react-native';

const backgroundImage = require('../../images/Group.png');

// Função simulada para buscar dados (substitua por sua lógica real de fetch)
const fetchInvoices = async () => {
  return [
    { id: 1, month: 'Setembro', amount: '100,00' },
    { id: 2, month: 'Outubro', amount: '120,00' },
  ];
};

export default function Finance() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const data = await fetchInvoices();
        setInvoices(data);
      } catch (error) {
        console.error('Erro ao carregar faturas:', error);
      } finally {
        setLoading(false);
      }
    };
    loadInvoices();
  }, []);

  return (
    <ImageBackground 
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Card height={165} style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.titleWithIcon}>
                <CircleDollarSign size={24} color="#D4D4D8" />
                <Title>Vencimento da Fatura</Title>
              </View>
              <Text style={styles.cardSubtitle}>Sua fatura vence em:</Text>
              <Text style={styles.cardDueDate}>30/10/2024</Text>
              <TouchableOpacity style={styles.paymentButton}>
                <Text style={styles.paymentButtonText}>Pagar Fatura</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        <View style={styles.cardContainer}>
          <Card height={300} style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.titleWithIcon}>
                <Scroll size={24} color="#D4D4D8" />
                <Title>Histórico de Faturas</Title>
              </View>
              <Text style={styles.subText}>
              Consulte aqui o resumo das suas últimas faturas e acompanhe facilmente os valores e vencimentos de cada mês.
              </Text>
              {loading ? (
                <ActivityIndicator size="large" color="#FFFFFF" />
              ) : (
                invoices.map((invoice) => (
                  <React.Fragment key={invoice.id}>
                    <TouchableOpacity style={styles.itemContainer}>
                      <Text style={styles.itemText}>Fatura de {invoice.month}: R$ {invoice.amount}</Text>
                      <ChevronRight size={24} color="#D4D4D8" />
                    </TouchableOpacity>
                    <HairLine />
                  </React.Fragment>
                ))
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardContainer: {
    marginBottom: 20,
  },
  subText: {
    color: '#D4D4D8',
    textAlign: 'center',
    marginHorizontal: 15,
    fontSize: 14,
    marginTop: 10,
  },
  card: {
    padding: 20,
  },
  cardContent: {
    alignItems: 'center',
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 10, // Adiciona um espaçamento acima do título
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});
