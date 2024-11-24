import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Image, Text, Modal, TouchableOpacity, ScrollView, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Card from '../../components/Card';
import Title from '../../components/Title';
import HairLine from '../../components/HairLine';
import { UserRoundCogIcon, UserIcon, ChevronRight, LockKeyhole, ScrollText, FileUser, MapPinHouseIcon, LogOut } from 'lucide-react-native';
import { supabase } from '../../services/supabase';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

const backgroundImage = require('../../images/Group.png');
const bannerImage = require('../../images/banner.jpg');
const profileImage = require('../../images/profile.jpg');

export default function Config() {
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState(null); // Estado para armazenar os dados do usuário
  const navigation = useNavigation(); 

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Carregar dados do usuário ao iniciar a tela
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          setUserData(parsedUser); // Atualiza os dados do estado
        } else {
          console.log('Nenhum dado de usuário encontrado');
        }
      } catch (error) {
        console.error("Erro ao carregar os dados do usuário", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
      }
    };

    loadUserData();
  }, []);

  // Caso os dados do usuário ainda não tenham sido carregados, mostrar uma tela de carregamento
  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();  // Desloga o usuário
      navigation.dispatch(  // Redireciona para a tela de login
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],  // Redireciona para a tela de Login
        })
      );
      Alert.alert('Sucesso', 'Logout realizado com sucesso!');  // Exibe um alerta de sucesso
    } catch (error) {
      console.error('Erro ao deslogar:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao realizar o logout.');  // Exibe um alerta de erro
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.bannerContainer}>
          <ImageBackground source={bannerImage} style={styles.banner} resizeMode="cover" />
        </View>
        <View style={styles.profileContainer}>
          <Image source={profileImage} style={styles.profileImage} />
          <View style={styles.infoContainer}>
            <Text style={styles.titleName}>{userData.name}</Text>
            <Text style={styles.subtitle}>{userData.curso}</Text>
            <TouchableOpacity onPress={toggleModal}>
              <QRCode value={userData.enrollmentNumber} size={120} color='#ffffff' backgroundColor='transparent' style={styles.qrCode} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <Card height={240} style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.titleContainer}>
                <UserRoundCogIcon size={24} color="#D4D4D8" />
                <Title>Seus Dados</Title>
              </View>
              <Text style={styles.subText}>
                Edite suas informações de perfil abaixo. Mantenha seus dados atualizados para garantir uma experiência personalizada.
              </Text>

              <TouchableOpacity style={styles.headerContainer} onPress={() => navigation.navigate('UserData')}>
                <UserIcon size={24} color="#D4D4D8" />
                <Text style={styles.titleWithIcon}>Dados Pessoais</Text>
                <ChevronRight size={24} color="#D4D4D8" />
              </TouchableOpacity>
              <HairLine />


              <TouchableOpacity style={styles.headerContainer} onPress={() => navigation.navigate('Documents')}>
                <FileUser size={24} color="#D4D4D8" />
                <Text style={styles.titleWithIcon}>Documentos</Text>
                <ChevronRight size={24} color="#D4D4D8" />
              </TouchableOpacity>
              <HairLine />


              <TouchableOpacity onPress={handleLogout} style={styles.headerContainer}>
                <LogOut size={24} color="#D4D4D8" />
                <Text style={styles.titleWithIcon}>Sair do Aplicativo</Text>
                <ChevronRight size={24} color="#D4D4D8" />
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalOverlay} onPress={toggleModal}>
            <QRCode value={userData.enrollmentNumber} size={200} color='#fff' backgroundColor='transparent' />
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
  titleName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 10,
  },
  qrCode: {
    marginTop: 10,
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '90%',
    marginTop: 20,
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
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
    fontSize: 14,
    color: '#D4D4D8',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalOverlay: {
    backgroundColor: '#171717',
    padding: 20,
    borderRadius: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171717',
  },
});
