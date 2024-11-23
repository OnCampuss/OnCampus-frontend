import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Bell } from 'lucide-react-native';
import Login from '../pages/auth/Login';
import Home from '../pages/home/Home';
import Profile from '../pages/home/Profile';
import Settings from '../pages/home/Settings';
import Voting from '../pages/home/Voting';
import Location from '../pages/location/Location';
import Finance from '../pages/finance/Finance';
import Terms from '../pages/commonPages/Terms';
import ButtonNew from '../components/ButtonNew';
import SignUpScreen from '../pages/auth/SignUpScreen';
import ForgotPassword from '../pages/auth/ForgotPassword';
import PaymentMethod from '../pages/finance/PaymentMethod';
import PixPayment from '../pages/finance/PixPayment';
import NotificationsScreen from '../pages/notifications/NotificationsScreen';
import UserData from '../pages/home/UserData';
import Documents from '../pages/personalData/Documents';
import DriverAccess from '../pages/admin/DriverAccess';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HeaderRightBell({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Notifications')}
      style={{ marginRight: 16 }}
    >
      <Bell color="#fff" size={24} />
    </TouchableOpacity>
  );
}

function HeaderWithIcon({ title }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>{title}</Text>
      <Feather
        name="chevron-right"
        size={20}
        color="#fff"
        style={{ marginLeft: 3, marginTop: 2 }}
      />
    </View>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: 'black', borderTopColor: 'transparent' },
        headerStyle: { backgroundColor: '#171717' },
        headerTintColor: '#fff',
        headerRight: () => <HeaderRightBell navigation={navigation} />,
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="home" size={size} color={color} />
          ),
          headerTitle: () => <HeaderWithIcon title="Página Inicial" />,
        }}
      />
      <Tab.Screen
        name="Localização"
        component={Location}
        options={({ navigation }) => ({
          tabBarIcon: ({ size, color }) => (
            <Feather name="map-pin" size={size} color={color} />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 16 }}>
              <Feather name="chevron-left" size={24} color="#ffffff" />
            </TouchableOpacity>
          ),
          tabBarStyle: { display: 'none' },
          headerTitle: () => <HeaderWithIcon title="Localização" />,
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
          headerTitle: () => <HeaderWithIcon title="Votação" />,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
          headerTitle: () => <HeaderWithIcon title="Perfil" />,
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
          <>
            <Stack.Screen name="Login">
              {(props) => <Login {...props} onLogin={handleLoginSuccess} />}
            </Stack.Screen>
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPassword} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={TabNavigator} />
            <Stack.Screen
              name="Finance"
              component={Finance}
              options={({ navigation }) => ({
                headerShown: true,
                headerStyle: { backgroundColor: '#171717' },
                headerTintColor: '#fff',
                headerTitle: () => <HeaderWithIcon title="Financeiro" />,
                headerRight: () => <HeaderRightBell navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="PaymentMethod"
              component={PaymentMethod}
              options={({ navigation }) => ({
                headerShown: true,
                headerStyle: { backgroundColor: '#171717' },
                headerTintColor: '#fff',
                headerTitle: () => <HeaderWithIcon title="Método de Pagamento" />,
                headerRight: () => <HeaderRightBell navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="PixPayment"
              component={PixPayment}
              options={({ navigation }) => ({
                headerShown: true,
                headerStyle: { backgroundColor: '#171717' },
                headerTintColor: '#fff',
                headerTitle: () => <HeaderWithIcon title="Pix" />,
                headerRight: () => <HeaderRightBell navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={({ navigation }) => ({
                headerShown: true,
                headerStyle: { backgroundColor: '#171717' },
                headerTintColor: '#fff',
                headerTitle: () => <HeaderWithIcon title="Configurações" />,
                headerRight: () => <HeaderRightBell navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="Terms"
              component={Terms}
              options={({ navigation }) => ({
                headerShown: true,
                headerStyle: { backgroundColor: '#171717' },
                headerTintColor: '#fff',
                headerTitle: () => <HeaderWithIcon title="Termos e Política" />,
                headerRight: () => <HeaderRightBell navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="UserData"
              component={UserData}
              options={({ navigation }) => ({
                headerShown: true,
                headerStyle: { backgroundColor: '#171717' },
                headerTintColor: '#fff',
                headerTitle: () => <HeaderWithIcon title="Dados Pessoais" />,
                headerRight: () => <HeaderRightBell navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="Documents"
              component={Documents}
              options={({ navigation }) => ({
                headerShown: true,
                headerStyle: { backgroundColor: '#171717' },
                headerTintColor: '#fff',
                headerTitle: () => <HeaderWithIcon title="Documentos" />,
                headerRight: () => <HeaderRightBell navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
              options={{
                headerShown: true,
                headerStyle: { backgroundColor: '#171717' },
                headerTintColor: '#fff',
                headerTitle: () => <HeaderWithIcon title="Notificações" />,
              }}
            />
            <Stack.Screen
              name="DriverAccess"
              component={DriverAccess}
              options={{
                headerShown: true,
                headerStyle: { backgroundColor: '#171717' },
                headerTintColor: '#fff',
                headerTitle: () => <HeaderWithIcon title="Acesso do Motorista" />,
                headerLeft: null,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
