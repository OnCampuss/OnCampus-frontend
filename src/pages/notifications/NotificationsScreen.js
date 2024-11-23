import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const NotificationsScreen = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      if (!Device.isDevice) {
        Alert.alert('Notificações não funcionam em simuladores!');
        return;
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert('Permissões para notificações foram negadas!');
        return;
      }

      const token = await Notifications.getExpoPushTokenAsync();
      setExpoPushToken(token.data);
      console.log('Expo Push Token:', token.data);
    };

    requestPermissions();

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
        body: "Esta é uma notificação local de teste!",
      },
      trigger: { seconds: 2 },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuração de Notificações</Text>
      {expoPushToken ? (
        <>
          <Text style={styles.text}>Token do Push:</Text>
          <Text style={styles.token}>{expoPushToken}</Text>
        </>
      ) : (
        <Text style={styles.text}>Obtendo token...</Text>
      )}
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
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  token: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
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
