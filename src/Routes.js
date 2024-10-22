import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Home from './pages/Home';
import Voting from './pages/Voting';
import Location from './pages/Location';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Finance from './pages/Finance';
import Terms from './pages/Terms';
import ButtonNew from './components/ButtonNew';
import Login from './pages/Login';

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
        name="Perfil" 
        component={Profile} 
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#ffffff' }}>
                Perfil
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
            {() => <Login onLogin={handleLoginSuccess} />} 
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Home" component={TabNavigator} />
            <Stack.Screen 
              name="Finance" 
              component={Finance} 
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#171717',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 22,
                },
                headerTitle: () => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#ffffff' }}>
                      Perfil
                    </Text>
                    <Feather name="chevron-right" size={18} color="#ffffff" style={{ marginLeft: 8 }} />
                  </View>
                ),
                tabBarIcon: ({ size, color }) => (
                  <Feather name="user" size={size} color={color} />
                ),
              }} 
            />
            <Stack.Screen 
              name="Settings" 
              component={Settings} 
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#171717',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 22,
                },
                headerTitle: () => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#ffffff' }}>
                      Configurações
                    </Text>
                    <Feather name="chevron-right" size={18} color="#ffffff" style={{ marginLeft: 8 }} />
                  </View>
                ),
              }} 
            />
            <Stack.Screen 
              name="Terms" 
              component={Terms} 
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#171717',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 22,
                },
                headerTitle: () => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#ffffff' }}>
                      Termos e Política
                    </Text>
                    <Feather name="chevron-right" size={18} color="#ffffff" style={{ marginLeft: 8 }} />
                  </View>
                ),
              }} 
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}