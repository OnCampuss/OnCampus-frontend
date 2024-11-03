import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Bell, ChevronRight, CheckCircle } from 'lucide-react-native';
import Title from '../../components/Title';

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Nova Atualização Disponível', message: 'Atualize o aplicativo para a versão mais recente.', read: false },
    { id: 2, title: 'Promoção Especial', message: 'Descontos exclusivos para você!', read: false },
    { id: 3, title: 'Pagamento Confirmado', message: 'Seu pagamento foi processado com sucesso.', read: true },
  ]);

  // Função para marcar todas as notificações como lidas
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
    Alert.alert('Notificações', 'Todas as notificações foram marcadas como lidas.');
  };

  // Função para marcar uma notificação específica como lida
  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };

  // Simulação de recebimento de nova notificação
  const addNotification = () => {
    const newNotification = {
      id: notifications.length + 1,
      title: 'Nova Notificação',
      message: 'Esta é uma nova notificação recebida.',
      read: false,
    };
    setNotifications([newNotification, ...notifications]); // Adiciona ao topo
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title>Notificações</Title>
        <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
          <Text style={styles.markAllText}>Marcar todas como lidas</Text>
          <CheckCircle size={20} color="#2563EB" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationCard,
              notification.read ? styles.read : styles.unread,
            ]}
            onPress={() => {
              Alert.alert(notification.title, notification.message);
              markAsRead(notification.id); // Marca como lida
            }}
          >
            <View style={styles.iconContainer}>
              <Bell size={24} color={notification.read ? "#6B7280" : "#2563EB"} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
            </View>
            <ChevronRight size={24} color="#D4D4D8" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Botão para simular nova notificação */}
      <TouchableOpacity style={styles.newNotificationButton} onPress={addNotification}>
        <Text style={styles.newNotificationText}>Simular Nova Notificação</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  markAllText: {
    color: '#2563EB',
    fontSize: 16,
    marginRight: 5,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27272A',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#D4D4D8',
    marginTop: 5,
  },
  unread: {
    backgroundColor: '#1F2937',
  },
  read: {
    backgroundColor: '#27272A',
  },
  newNotificationButton: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2563EB',
    margin: 20,
    borderRadius: 8,
  },
  newNotificationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
