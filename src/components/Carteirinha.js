import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Modal, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import { BlurView } from 'expo-blur';

const userData = {
  title: 'Estudante',
  name: 'João Silva',
  cpf: '123.456.789-00',
  enrollmentNumber: '20231002',
  semester: '5º Semestre',
  status: 'Ativo',
  description: 'Aluno de Engenharia de Software',
  imageUrl: 'https://www.4devs.com.br/4devs_gerador_imagem.php?acao=gerar_imagem&txt_largura=654&txt_altura=756&extensao=png&fundo_r=0.06274509803921569&fundo_g=0.996078431372549&fundo_b=0.9568627450980393&texto_r=0&texto_g=0&texto_b=0&texto=Gerador%20Imagem%20%234Devs&tamanho_fonte=10',
};

const { width } = Dimensions.get('window');
const cardWidth = width > 380 ? 380 : width * 0.9;

export default function Carteirinha() {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <LinearGradient
        colors={['#0052D4', '#3B82F6', '#1E3A8A']}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={styles.carteirinhaContainer}
      >
        <View style={styles.infoContainer}>
          <Text style={styles.titleName}>Carteirinha - {userData.name}</Text>
          <Text style={styles.cpf}>CPF: {userData.cpf}</Text>
          <Text style={styles.enrollmentNumber}>Matrícula: {userData.enrollmentNumber}</Text>
          <Text style={styles.semester}>Semestre: {userData.semester}</Text>
          <Text style={styles.status}>Status: {userData.status}</Text>
          <Text style={styles.description}>{userData.description}</Text>
        </View>
        <View style={styles.qrImageContainer}>
          <Image source={{ uri: userData.imageUrl }} style={styles.profileImage} />
          <TouchableOpacity onPress={toggleModal}>
            <QRCode
              value={userData.enrollmentNumber}
              size={80}
              color='#ffffff'
              backgroundColor='transparent'
              style={styles.qrCode}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <BlurView intensity={700000} style={styles.modalContainer} overlayColor="green">
          <TouchableOpacity style={styles.modalOverlay} onPress={toggleModal}>
            <QRCode
              value={userData.enrollmentNumber}
              size={200}
              color='#000000'
              backgroundColor='transparent'
            />
          </TouchableOpacity>
        </BlurView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  carteirinhaContainer: {
    flexDirection: 'row',
    width: cardWidth,
    height: 250,
    alignItems: 'center',
    borderRadius: 15,
    padding: 20,
    marginVertical: 20,
    elevation: 5,
    backgroundColor: '#004AAD',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  infoContainer: {
    flex: 1,
    paddingRight: 20,
  },
  qrImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ffffff',
    marginBottom: 10,
  },
  qrCode: {
    marginTop: 10,
  },
  titleName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ECFEFF',
    marginBottom: 10,
  },
  cpf: {
    fontSize: 18,
    color: '#ffffff',
  },
  enrollmentNumber: {
    fontSize: 18,
    color: '#ffffff',
  },
  semester: {
    fontSize: 18,
    color: '#ffffff',
  },
  status: {
    fontSize: 18,
    color: '#FFDD57',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#ffffff',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
