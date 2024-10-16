import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Image, Text, Modal, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Card from '../components/Card'

const backgroundImage = require('../images/Group.png');
const bannerImage = require('../images/banner.jpg'); 
const profileImage = require('../images/profile.jpg');
 

export default function Config() {
  const [modalVisible, setModalVisible] = useState(false);
  const userData = { enrollmentNumber: '123456789' }; 
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <ImageBackground 
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.bannerContainer}>
        <ImageBackground 
          source={bannerImage}
          style={styles.banner}
          resizeMode="cover"
        />
      </View>
      <Image source={profileImage} style={styles.profileImage} />
      
      <View style={styles.infoContainer}>
        <Text style={styles.title}>John Doe</Text>
        <Text style={styles.subtitle}>Ciência da Computação</Text>
        <TouchableOpacity onPress={toggleModal}>
          <QRCode
            value={userData.enrollmentNumber}
            size={120}
            color='#ffffff'
            backgroundColor='transparent'
            style={styles.qrCode}
          />
        </TouchableOpacity>
      </View>

      <Card height={420} style={styles.card}>
        
        </Card>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalOverlay} onPress={toggleModal}>
            <QRCode
              value={userData.enrollmentNumber}
              size={200}
              color='#fff'
              backgroundColor='transparent'
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#171717',
  },
  bannerContainer: {
    width: '100%',
    height: 150,
    position: 'absolute',
    top: 0,
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  profileImage: {
    width: 125,
    height: 125,
    borderRadius: 62.5,
    position: 'absolute',
    top: 85,
    left: '50%',
    marginLeft: -62.5,
    borderWidth: 2,
    borderColor: '#2563EB',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'medium',
    color: '#ffffff',
    marginBottom: 10,
  },
  qrCode: {
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
  },
  modalOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
