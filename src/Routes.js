import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Text, View, TouchableOpacity} from 'react-native';

import Home from './pages/Home';
import Voting from './pages/Voting';
import Location from './pages/Location';
import Profile from './pages/Profile';
import ButtonNew from './components/ButtonNew';

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: 'black',
            borderTopColor: 'transparent',
            display: route.name === 'Localização' ? 'none' : 'flex', 
          },
          headerStyle: {
            backgroundColor: '#171717',
            shadowColor: 'transparent',
            elevation: 0,
            borderBottomWidth: 0,
            height: 100,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerBackVisible: true, 
          headerRight: () => (
            <Feather 
              name="bell" 
              size={24} 
              color="white" 
              style={{ marginRight: 15 }} 
              onPress={() => alert('Profile')} 
            />
          ),
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
        })}
      />
        
        <Tab.Screen 
          name="Novo" 
          component={ButtonNew}
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <ButtonNew size={size} color={color} focused={focused} />
            ),
            tabBarLabel: () => null,
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#ffffff' }}>
                  Novo
                </Text>
                <Feather name="chevron-right" size={18} color="#ffffff" style={{ marginLeft: 8 }} />
              </View>
            ),
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
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  Text: {
    fontSize: 20,
  },
});
