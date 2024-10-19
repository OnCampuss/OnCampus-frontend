import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

import Home from './pages/Home';
import Voting from './pages/Voting';
import Location from './pages/Location';
import Profile from './pages/Profile';
import Settings from './pages/Settings'; // Importando a tela de Configurações
import Finance from './pages/Finance'; // Importando a tela de Finanças
import TermsPolicy from './pages/TermsPolicy'; // Importando a tela de Termos e Políticas
import ButtonNew from './components/ButtonNew';
import ButtonForm from './components/ButtonLarge';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const backgroundImage = require('./images/Group.png');
const vectorImage = require('./images/Vector.png');

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const validEmail = '1';
    const validPassword = '1';

    if (email === validEmail && password === validPassword) {
      onLogin();
    } else {
      Alert.alert('Erro', 'Email ou senha incorretos.');
    }
  };

  return (
    <ImageBackground 
      source={backgroundImage} 
      style={styles.background} 
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#fff"
        />
        <ButtonForm title="Login" onPress={handleLogin} />

        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.linkText}>Não possui cadastro? Cadastre-se</Text>
        </TouchableOpacity>

        <Text style={styles.socialLoginText}>Faça Login com:</Text>
        <View style={styles.iconContainer}></View>
      </View>

      <Image 
        source={vectorImage} 
        style={styles.vectorImage} 
        resizeMode="contain"
      />
    </ImageBackground>
  );
};

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopColor: 'transparent',
        },
        headerStyle: {
          backgroundColor: '#171717',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Inicio" 
        component={Home} 
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="home" size={size} color={color} />
          ),
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#ffffff' }}>
                Página Inicial
              </Text>
              <Feather name="chevron-right" size={18} color="#ffffff" style={{ marginLeft: 8 }} />
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="Localização" 
        component={Location} 
        options={({ navigation }) => ({
          tabBarIcon: ({ size, color }) => (
            <Feather name="map-pin" size={size} color={color} />
          ),
          headerShown: true,
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#ffffff' }}>
                Localização
              </Text>
              <Feather name="chevron-right" size={18} color="#ffffff" style={{ marginLeft: 8 }} />
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 16 }}>
              <Feather name="chevron-left" size={24} color="#ffffff" />
            </TouchableOpacity>
          ),
          tabBarStyle: { display: 'none' },
        })}
      />
      <Tab.Screen 
        name="Novo" 
        component={ButtonNew} 
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <ButtonNew size={size} color={color} focused={focused} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen 
        name="Votação" 
        component={Voting} 
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="list" size={size} color={color} />
          ),
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#ffffff' }}>
                Votação
              </Text>
              <Feather name="chevron-right" size={18} color="#ffffff" style={{ marginLeft: 8 }} />
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#ffffff' }}>
                Profile
              </Text>
              <Feather name="chevron-right" size={18} color="#ffffff" style={{ marginLeft: 8 }} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Routes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Login">
            {() => <LoginForm onLogin={handleLoginSuccess} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Finance" component={Finance} />
            <Stack.Screen name="Terms Policy" component={TermsPolicy} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    width: '100%', 
    height: '100%',
    backgroundColor: '#171717',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 60,
    borderColor: '#887E7E',
    backgroundColor: 'transparent',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
    borderRadius: 5,
    color: '#D3D3D8',
  },
  vectorImage: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    bottom: -140,
    width: '100%',
    height: 500,
  },
  linkText: {
    color: '#ffffff',
    marginTop: 12,
    textAlign: 'center',
  },
  socialLoginText: {
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
  icon: {
    marginHorizontal: 10,
  },
});
