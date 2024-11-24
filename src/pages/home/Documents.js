import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { BookOpenCheck } from 'lucide-react-native';
import Card from '../../components/Card';
import Line from '../../components/Line';

const backgroundImage = require('../../images/Group.png');

export default function Documents() {
    const handleSelectFile = async () => {
        try {
            const result = await DocumentPicker.pickSingle({
                type: DocumentPicker.types.allFiles,
            });
            Alert.alert('Arquivo Selecionado', 'Seu arquivo foi selecionado com sucesso!');
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                Alert.alert('Cancelado', 'Nenhum arquivo foi selecionado.');
            } else {
                console.error(err);
                Alert.alert('Erro', 'Ocorreu um erro ao selecionar o arquivo.');
            }
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
                            Adicione seus documentos para facilitar o envio e gerenciamento de arquivos diretamente pelo app. 
                            Selecione o arquivo que deseja incluir e siga as instruções.
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSelectFile}>
                        <Text style={styles.buttonText}>Selecionar Arquivo</Text>
                    </TouchableOpacity>
                </Card>
            </View>
        </ImageBackground>
    );
}

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
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});
