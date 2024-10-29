import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Image, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Card from '../../components/Card';
import Title from '../../components/Title';
import Line from '../../components/Line';
import HairLine from '../../components/HairLine';
import { UserRoundCogIcon, UserIcon, ChevronRight, LockKeyhole, ScrollText, FileUser, MapPinHouseIcon, LogOut } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const backgroundImage = require('../../images/Group.png');
const bannerImage = require('../../images/banner.jpg');
const profileImage = require('../../images/profile.jpg');

export default function Config() {
  const [modalVisible, setModalVisible] = useState(false);
  const userData = { enrollmentNumber: '123456789' };
  const navigation = useNavigation();
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <ImageBackground 
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.bannerContainer}>
          <ImageBackground 
            source={bannerImage}
            style={styles.banner}
            resizeMode="cover"
          />
        </View>
        <View style={styles.profileContainer}>
          <Image source={profileImage} style={styles.profileImage} />
          <View style={styles.infoContainer}>
            <Title>John Doe</Title>
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
        </View>

        <View style={styles.cardContainer}>
          <Card height={400} style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.titleContainer}>
                <UserRoundCogIcon size={24} color="#D4D4D8" />
                <Title>Seus Dados</Title>
              </View>
              <Text style={styles.subText}>
                Edite suas informações de perfil abaixo. Mantenha seus dados atualizados para garantir uma experiência personalizada.
              </Text>
              
              <TouchableOpacity onPress={() => navigation.navigate('PersonalData')} style={styles.headerContainer}>
                <UserIcon size={24} color="#D4D4D8" />
                <Text style={styles.titleWithIcon}>Dados Pessoais</Text>
                <View style={{ flex: 1 }} />
                <ChevronRight size={24} color="#D4D4D8" />
              </TouchableOpacity>
              <HairLine />

              <TouchableOpacity onPress={() => navigation.navigate('Password')} style={styles.headerContainer}>
                <LockKeyhole size={24} color="#D4D4D8" />
                <Text style={styles.titleWithIcon}>Senha</Text>
                <View style={{ flex: 1 }} />
                <ChevronRight size={24} color="#D4D4D8" />
              </TouchableOpacity>
              <HairLine />

              <TouchableOpacity onPress={() => navigation.navigate('ContractData')} style={styles.headerContainer}>
                <ScrollText size={24} color="#D4D4D8" />
                <Text style={styles.titleWithIcon}>Dados Contratuais</Text>
                <View style={{ flex: 1 }} />
                <ChevronRight size={24} color="#D4D4D8" />
              </TouchableOpacity>
              <HairLine />

              <TouchableOpacity onPress={() => navigation.navigate('Documents')} style={styles.headerContainer}>
                <FileUser size={24} color="#D4D4D8" />
                <Text style={styles.titleWithIcon}>Documentos</Text>
                <View style={{ flex: 1 }} />
                <ChevronRight size={24} color="#D4D4D8" />
              </TouchableOpacity>
              <HairLine />

              <TouchableOpacity onPress={() => navigation.navigate('Address')} style={styles.headerContainer}>
                <MapPinHouseIcon size={24} color="#D4D4D8" />
                <Text style={styles.titleWithIcon}>Endereço</Text>
                <View style={{ flex: 1 }} />
                <ChevronRight size={24} color="#D4D4D8" />
              </TouchableOpacity>
              <HairLine />

              <TouchableOpacity onPress={() => {/* Função para sair do aplicativo */}} style={styles.headerContainer}>
                <LogOut size={24} color="#D4D4D8" />
                <Text style={styles.titleWithIcon}>Sair do Aplicativo</Text>
                <View style={{ flex: 1 }} />
                <ChevronRight size={24} color="#D4D4D8" />
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </ScrollView>

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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
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
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
    bottom: 62.5,
  },
  profileImage: {
    width: 125,
    height: 125,
    borderRadius: 62.5,
    borderWidth: 2,
    borderColor: '#2563EB',
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'medium',
    color: '#ffffff',
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 5,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  titleWithIcon: {
    marginLeft: 8,
    color: '#D4D4D8',
    fontSize: 18,
  },
  subText: {
    color: '#D4D4D8',
    textAlign: 'center',
    marginHorizontal: 20,
    fontSize: 10,
    marginTop: 10,
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 5,
    paddingTop: 10,
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
