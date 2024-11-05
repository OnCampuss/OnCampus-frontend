import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Modal, TextInput, Alert } from 'react-native';
import { IdCard, ChevronRight, BookOpenCheck, File } from 'lucide-react-native';
import Card from '../../components/Card';
import Line from '../../components/Line';
import HairLine from '../../components/HairLine';

const backgroundImage = require('../../images/Group.png');

export default function Documents() {
    const [modalVisible, setModalVisible] = useState(false);
    const [fileName, setFileName] = useState('');
    const [currentDocument, setCurrentDocument] = useState('');

    const handleOpenModal = (documentType) => {
        setCurrentDocument(documentType);
        setModalVisible(true);
    };

    const handleUpload = () => {
        if (fileName) {
            Alert.alert("Sucesso", `Arquivo "${fileName}" enviado com sucesso para ${currentDocument}!`);
            setModalVisible(false);
            setFileName('');
        } else {
            Alert.alert("Erro", "Por favor, insira o nome do arquivo.");
        }
    };

    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Card width={362} height={300} style={styles.card}>
                    <View style={styles.titleContainer}>
                        <BookOpenCheck size={24} color="#fff" style={styles.icon} />
                        <Text style={styles.title}>Seus Documentos</Text>
                    </View>
                    <Line />
                    <View style={styles.textContainer}>
                        <Text style={[styles.text, styles.subText]}>
                            Adicione seus documentos para facilitar o envio e gerenciamento de arquivos diretamente pelo app. Selecione o arquivo que deseja incluir e siga as instruções.
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.headerContainer} onPress={() => handleOpenModal("Carteira de identidade ou CNH")}>
                            <IdCard size={24} color="#D4D4D8" />
                            <Text style={styles.titleWithIcon}>Carteira de identidade ou CNH</Text>
                            <View style={{ flex: 1 }} />
                            <ChevronRight size={24} color="#D4D4D8" />
                        </TouchableOpacity>
                        <HairLine />
                        <TouchableOpacity style={styles.headerContainer} onPress={() => handleOpenModal("Comprovante de matrícula")}>
                            <IdCard size={24} color="#D4D4D8" />
                            <Text style={styles.titleWithIcon}>Comprovante de matrícula</Text>
                            <View style={{ flex: 1 }} />
                            <ChevronRight size={24} color="#D4D4D8" />
                        </TouchableOpacity>
                        <HairLine />
                    </View>
                </Card>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalCard}>
                            <Text style={styles.modalTitle}>Upload de Documento</Text>
                            <Text style={styles.modalSubtitle}>Documento: {currentDocument}</Text>
                            <View style={styles.inputContainer}>
                                <File size={24} color="#A1A1A1" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Insira o nome do arquivo"
                                    placeholderTextColor="#A1A1A1"
                                    value={fileName}
                                    onChangeText={setFileName}
                                />
                            </View>
                            <View style={styles.buttonRow}>
                                <TouchableOpacity style={styles.button} onPress={handleUpload}>
                                    <Text style={styles.buttonText}>Concluído</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
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
    icon: {
        marginRight: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
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
        margin: 10,
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'left',
    },
    subText: {
        fontSize: 14,
        fontWeight: 'normal',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 5,
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    titleWithIcon: {
        marginLeft: 8,
        color: '#D4D4D8',
        fontSize: 18,
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
        fontSize: 20,
        color: '#fff',
        marginBottom: 10,
    },
    modalSubtitle: {
        fontSize: 16,
        color: '#A1A1A1',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 40,
        backgroundColor: '#3E3E3E',
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    inputIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        color: '#fff',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: '#3B82F6',
        borderRadius: 5,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#FF3D00',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
