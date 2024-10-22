import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TextInput, Text, Alert, StyleSheet, ImageBackground, TouchableOpacity, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import Home from './pages/Home';
import Voting from './pages/Voting';
import Location from './pages/Location';
import Profile from './pages/Profile';
import Settings from './pages/Settings'; 
import Finance from './pages/Finance'; 
import TermsPolicy from './pages/TermsPolicy'; 
import ButtonNew from './components/ButtonNew';
import Login from './pages/Login'; // Importar o componente Login

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Gerenciar estado de login

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Atualiza o estado quando o login é bem-sucedido
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? ( // Mostrar a tela de login se o usuário não estiver autenticado
          <Stack.Screen name="Login">
            {() => <Login onLogin={handleLoginSuccess} />} 
          </Stack.Screen>
        ) : ( // Mostrar a navegação de abas depois que o usuário fizer login
          <>
            <Stack.Screen name="Home" component={TabNavigator} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Finance" component={Finance} />
            <Stack.Screen name="Terms Policy" component={TermsPolicy} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
