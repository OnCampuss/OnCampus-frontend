import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ImageBackground, Modal, TextInput } from 'react-native';
import { Mail, UserRoundPen } from 'lucide-react-native';
import Card from '../../components/Card';
import Line from '../../components/Line';
import HairLine from '../../components/HairLine';

const backgroundImage = require('../../images/Group.png');

const UserData = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [fullName, setFullName] = useState('João Silva');
    const [email, setEmail] = useState('joaosilva@gmail.com');

    const handleUpdate = () => {
        setModalVisible(false);
        Alert.alert("Sucesso", "Informações atualizadas com sucesso.");
    };

    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Card width={362} height={240} style={styles.card}>
                    <View style={styles.titleContainer}>
                        <UserRoundPen size={24} color="#fff" style={styles.icon} />
                        <Text style={styles.title}>Identidade</Text>
                    </View>
                    <Line />
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Nome completo:</Text>
                        <Text style={[styles.text, styles.subText]}>{fullName}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>CPF:</Text>
                        <Text style={[styles.text, styles.subText]}>000.000.000-00</Text>
                    </View>
                    <HairLine />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                            <Text style={styles.buttonText}>Alterar</Text>
                        </TouchableOpacity>
                    </View>
                </Card>
                <Card width={362} height={180} style={styles.card}>
                    <View style={styles.titleContainer}>
                        <Mail size={24} color="#fff" style={styles.icon} />
                        <Text style={styles.title}>Seu Email</Text>
                    </View>
                    <Line />
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Email cadastrado:</Text>
                        <Text style={[styles.text, styles.subText]}>{email}</Text>
                    </View>
                    <HairLine />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                            <Text style={styles.buttonText}>Alterar</Text>
                        </TouchableOpacity>
                    </View>
                </Card>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalCard}>
                            <Text style={styles.modalTitle}>Alterar Informações</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nome completo"
                                value={fullName}
                                onChangeText={setFullName}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                            />
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={[styles.button, styles.confirmButton]}
                                    onPress={handleUpdate}
                                >
                                    <Text style={styles.buttonText}>Confirmar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.cancelButton]}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.buttonText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
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
        gap: 40,
    },
    background: {
        flex: 1,
        backgroundColor: '#171717',
    },
    card: {
        alignItems: 'center',
        padding: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    icon: {
        marginRight: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    textContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 15,
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'left',
    },
    subText: {
        fontSize: 16,
        fontWeight: 'normal',
        marginTop: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    button: {
        backgroundColor: '#4A90E2',
        borderRadius: 5,
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalCard: {
        width: 300,
        backgroundColor: '#2C2C2C',
        borderRadius: 10,
        borderColor: "#FFFFFF",
        borderWidth: 1,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '100%',
        backgroundColor: '#fff',
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    confirmButton: {
        backgroundColor: '#4A90E2',
    },
    cancelButton: {
        backgroundColor: '#FF3D00',
        marginLeft: 10,
    },
});

export default UserData;
