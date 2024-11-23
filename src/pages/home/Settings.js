import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { Bell, Bolt, ChevronRight, Handshake, History } from 'lucide-react-native';
import Card from '../../components/Card';
import ButtonSmall from '../../components/ButtonSmall';
import Line from '../../components/Line';

const backgroundImage = require('../../images/Group.png');

const Settings = ({ navigation }) => {
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Você tem certeza que deseja sair?",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel"
        },
        { text: "Sair", onPress: () => navigation.navigate('Login') }
      ]
    );
  };

  return (
    <ImageBackground 
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Card width={362} height={478} style={styles.card}>
          <View style={styles.titleContainer}>
            <Bolt size={24} color="#fff" style={styles.icon} />
            <Text style={styles.title}>Configurações e Ajustes</Text>
          </View>
          <Line />
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.option}>
              <View style={styles.optionContent}>
                <Bell size={24} color="#fff" style={styles.icon} />
                <Text style={styles.optionText}>Notificações</Text>
                <ChevronRight size={24} color="#fff" style={styles.Icon} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
              <View style={styles.optionContent}>
                <History size={24} color="#fff" style={styles.icon} />
                <Text style={styles.optionText}>Versões do app</Text>
                <ChevronRight size={24} color="#fff" style={styles.Icon} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
              <View style={styles.optionContent}>
                <Handshake size={24} color="#fff" style={styles.icon} />
                <Text style={styles.optionText}>Termos e políticas</Text>
                <ChevronRight size={24} color="#fff" style={styles.Icon} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.logoutContainer}>
            <ButtonSmall title="Fazer Logout" onPress={handleLogout} />
          </View>
        </Card>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  background: {
    flex: 1,
    backgroundColor: '#171717'
  },
  card: {
    alignItems: 'center',
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#4A4A4A',
    width: 321,
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 15,
    marginVertical: 8,
    alignItems: 'center',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  optionsContainer: {
    width: '100%',
    marginTop: 40,
    marginBottom: 60,
    alignItems: 'center',
  },
  optionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 5,
    flex: 1,
  },
  Icon: {
    marginLeft: 'auto',
  },
  logoutContainer: {
    alignItems: 'center',
    width: '100%',
  },
});

export default Settings;