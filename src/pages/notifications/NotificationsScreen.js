import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';

const NotificationsScreen = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    // Solicitar permissão para notificações
    const requestPermissions = async () => {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // Se não houver permissão, pergunte ao usuário
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert('Você precisa permitir notificações para usar este recurso!');
        return;
      }

      
      const token = await Notifications.getExpoPushTokenAsync();
      setExpoPushToken(token.data);
      console.log('Expo Push Token:', token.data); 
    };

    requestPermissions();

    // Listener para notificações recebidas
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      console.log('Notificação recebida:', notification);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Notificação Teste",
        body: 'Este é um teste de notificação no Expo!',
      },
      trigger: {
        seconds: 2, // A notificação será disparada em 2 segundos
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuração de Notificações</Text>
      <Text>Token do Push: {expoPushToken}</Text>
      <Button title="Enviar Notificação" onPress={sendNotification} />
      {notification && (
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationTitle}>Notificação Recebida:</Text>
          <Text>{notification.request.content.title}</Text>
          <Text>{notification.request.content.body}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notificationContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NotificationsScreen;
