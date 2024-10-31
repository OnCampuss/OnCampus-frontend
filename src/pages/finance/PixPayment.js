import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Clipboard, Alert, ImageBackground } from 'react-native';
import { DollarSign } from 'lucide-react-native';
import QRCode from 'react-native-qrcode-svg';
import Line from '../../components/Line';
import Card from '../../components/Card';
import Title from '../../components/Title';

const backgroundImage = require('../../images/Group.png'); // Imagem de fundo

const generateRandomPixCode = () => {
  // Gera um código Pix aleatório (exemplo simples)
  return Math.random().toString(36).substring(2, 15);
};

export default function PixPayment() {
  const [pixCode, setPixCode] = useState(generateRandomPixCode());

  const copyToClipboard = () => {
    Clipboard.setString(pixCode);
    Alert.alert('Código Copiado!', 'O código Pix foi copiado para a área de transferência.');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Card height={400} style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.titleContainer}>
              <DollarSign size={24} color="#D4D4D8" style={styles.icon} />
              <Title style={styles.title}>Forma de Pagamento</Title>
            </View>
            <Line style={styles.line} />
            <QRCode value={pixCode} size={200} style={styles.qrCode} />
            <Text style={styles.pixCode}>{pixCode}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
              <Text style={styles.copyButtonText}>Copiar Código</Text>
            </TouchableOpacity>
          </View>
        </Card>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: 20,
    backgroundColor: '#2D2D32',
    borderRadius: 15,
    alignItems: 'center',
    width: '100%', // Ajusta a largura do cartão
  },
  cardContent: {
    alignItems: 'center',
  },
  title: {
    color: '#D4D4D8',
    fontSize: 24,
    marginBottom: 10,
  },
  line: {
    marginBottom: 20, // Espaço entre a linha e o QR code
  },
  pixCode: {
    color: '#D4D4D8',
    fontSize: 18,
    marginTop: 20, // Espaçamento do texto do código Pix
  },
  qrCode: {
    marginTop: 20, // Aumentado para maior espaço acima
  },
  copyButton: {
    marginTop: 20,
    backgroundColor: '#4A4A4A',
    borderRadius: 10,
    padding: 10,
    width: '60%', // Ajusta a largura do botão
    alignItems: 'center', // Centraliza o texto no botão
  },
  copyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
