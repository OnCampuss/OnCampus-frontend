import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Title from '../../components/Title';
import HairLine from '../../components/HairLine';

const backgroundImage = require('../../images/Group.png');

export default function TermsAndPolicies() {
  const handleAccept = () => {
    Alert.alert("Obrigado!", "Você aceitou os termos e políticas.");
  };

  return (
    <ImageBackground 
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Title>Termos e Políticas</Title>
              <Text style={styles.subText}>
                Leia atentamente nossos termos e políticas. Ao utilizar nosso serviço, você concorda com os termos descritos abaixo:
              </Text>
              <HairLine style={styles.hairline} />
              <Text style={styles.policyText}>
                1. Uso do Aplicativo: O OnCampus é um aplicativo destinado a facilitar o transporte universitário. Você concorda em usar o aplicativo apenas para fins legais e de acordo com todas as leis aplicáveis.
              </Text>
              <HairLine style={styles.hairline} />
              <Text style={styles.policyText}>
                2. Registro e Conta de Usuário: Para usar algumas funcionalidades do aplicativo, você pode ser solicitado a criar uma conta. Você concorda em fornecer informações precisas e completas durante o registro e a manter essas informações atualizadas.
              </Text>
              <HairLine style={styles.hairline} />
              <Text style={styles.policyText}>
                3. Propriedade Intelectual: Todos os direitos de propriedade intelectual relacionados ao aplicativo e seu conteúdo são de propriedade do OnCampus ou de seus licenciadores. Você não pode reproduzir, modificar, distribuir ou criar trabalhos derivados sem permissão expressa.
              </Text>
              <HairLine style={styles.hairline} />
              <Text style={styles.policyText}>
                4. Informações Coletadas: Coletamos informações pessoais que você nos fornece ao criar uma conta, como nome, e-mail e informações de contato. Também podemos coletar dados de uso do aplicativo.
              </Text>
              <HairLine style={styles.hairline} />
              <Text style={styles.policyText}>
                5. Uso das Informações: As informações coletadas são usadas para: Melhorar a experiência do usuário, comunicar atualizações e novidades, realizar análises e pesquisas.
              </Text>
              <HairLine style={styles.hairline} />
              <Text style={styles.policyText}>
                6. Segurança: Adotamos medidas de segurança para proteger suas informações pessoais, mas não podemos garantir a segurança absoluta. Você é responsável por manter a confidencialidade de suas credenciais de acesso.
              </Text>
              <HairLine style={styles.hairline} />
              <Text style={styles.policyText}>
                7. Compartilhamento de Informações: Não vendemos ou alugamos suas informações pessoais a terceiros. Podemos compartilhar suas informações com prestadores de serviços que nos ajudam a operar o aplicativo, desde que esses terceiros concordem em manter essas informações confidenciais.
              </Text>
              <HairLine style={styles.hairline} />
              <Text style={styles.policyText}>
                8. Contato: Se você tiver dúvidas sobre estes Termos e Políticas, entre em contato com os nossos especialistas através do e-mail: oncampusbr@gmail.com.
              </Text>
            </View>
            <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
              <Text style={styles.buttonText}>Aceitar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#171717',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#2B2B2B',
    borderRadius: 10,
    padding: 20,
    width: '100%',
  },
  cardContent: {
    alignItems: 'center',
  },
  title: {
    marginBottom: 15,
  },
  subText: {
    color: '#D4D4D8',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 10,
  },
  policyText: {
    color: '#D4D4D8',
    fontSize: 14,
    marginVertical: 10,
    textAlign: 'left',
    lineHeight: 20,
  },
  hairline: {
    height: 1,
    backgroundColor: '#D4D4D8',
    marginVertical: 10,
    width: '100%',
  },
  acceptButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});