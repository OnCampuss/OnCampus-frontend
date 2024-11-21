import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Clipboard, Alert, ImageBackground, Share } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Card from '../../components/Card'; 
import Title from '../../components/Title';

const backgroundImage = require('../../images/Group.png');

const generateRandomPixCode = () => Math.random().toString(36).substring(2, 15);

export default function PixPayment() {
  const [pixCode, setPixCode] = useState(generateRandomPixCode());

  const copyToClipboard = () => {
    Clipboard.setString(pixCode);
    Alert.alert('Código Copiado!', 'O código Pix foi copiado para a área de transferência.');
  };

  const sharePixCode = async () => {
    try {
      await Share.share({
        message: `Use este código Pix para realizar o pagamento: ${pixCode}`,
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível compartilhar o código Pix.');
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Card  height={480}>
          <View style={styles.cardContent}>
            <Title>Pagamento Pix</Title>
            <Text style={styles.description}>
              Escaneie o QR Code ou copie o código abaixo para realizar o pagamento.
            </Text>
            <View style={styles.qrCodeContainer}>
              <QRCode value={pixCode} size={200} />
            </View>
            <Text style={styles.pixCode}>{pixCode}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button} onPress={copyToClipboard}>
                <Text style={styles.buttonText}>Copiar Código</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={sharePixCode}>
                <Text style={styles.buttonText}>Compartilhar</Text>
              </TouchableOpacity>
            </View>
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
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  description: {
    color: '#A1A1AA',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  qrCodeContainer: {
    backgroundColor: '#1E1E22',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  pixCode: {
    color: '#D4D4D8',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    backgroundColor: '#4A4A4A',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
