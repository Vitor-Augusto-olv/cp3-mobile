import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useUser } from '../context/UserContext';

export default function PerfilScreen({ navigation }) {
  const { userData, limparDados } = useUser();

  const iniciais = userData.nome
    ? userData.nome
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : '?';

  const InfoRow = ({ icone, label, valor }) => {
    if (!valor) return null;
    return (
      <View style={styles.infoRow}>
        <Text style={styles.infoIcone}>{icone}</Text>
        <View style={styles.infoTextos}>
          <Text style={styles.infoLabel}>{label}</Text>
          <Text style={styles.infoValor}>{valor}</Text>
        </View>
      </View>
    );
  };

  const enderecoCompleto = [
    userData.logradouro,
    userData.bairro,
    userData.cidade && userData.uf
      ? `${userData.cidade} - ${userData.uf}`
      : userData.cidade || userData.uf,
    userData.cep,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero / Avatar */}
      <View style={styles.hero}>
        <View style={styles.heroBg} />
        {userData.foto ? (
          <Image source={{ uri: userData.foto }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.iniciais}>{iniciais}</Text>
          </View>
        )}
        <Text style={styles.nome}>{userData.nome || 'Sem nome'}</Text>
        {userData.turma ? (
          <View style={styles.badge}>
            <Text style={styles.badgeTexto}>{userData.turma}</Text>
          </View>
        ) : null}
      </View>

      {/* Card de informações */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>INFORMAÇÕES ACADÊMICAS</Text>
        <InfoRow icone="🎓" label="RM" valor={userData.rm} />
        <InfoRow icone="✉️" label="E-mail" valor={userData.email} />
        <InfoRow icone="🏫" label="Turma" valor={userData.turma} />
      </View>

      {enderecoCompleto ? (
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>ENDEREÇO</Text>
          <InfoRow icone="📍" label="Endereço completo" valor={enderecoCompleto} />
        </View>
      ) : null}

      {/* Botões de navegação */}
      <TouchableOpacity
        style={styles.botaoSecundario}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.botaoSecundarioTexto}>✎  Editar Cadastro</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoPrimario}
        onPress={() => navigation.navigate('Devs')}
      >
        <Text style={styles.botaoPrimarioTexto}>👨‍💻  Ver Equipe Dev</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoPerigo}
        onPress={() => {
          limparDados();
          navigation.navigate('Cadastro');
        }}
      >
        <Text style={styles.botaoPerigoTexto}>Limpar dados</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0F0F' },
  content: { paddingBottom: 48 },

  hero: { alignItems: 'center', paddingTop: 40, paddingBottom: 32, position: 'relative' },
  heroBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: '#1A0A0F',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: '#E8193C',
    marginBottom: 14,
  },
  avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#E8193C',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  iniciais: { fontSize: 36, fontWeight: '800', color: '#FFF' },
  nome: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: -0.5,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  badge: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#E8193C',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginTop: 10,
  },
  badgeTexto: { color: '#E8193C', fontSize: 12, fontWeight: '700', letterSpacing: 1 },

  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  cardTitulo: {
    fontSize: 10,
    fontWeight: '700',
    color: '#E8193C',
    letterSpacing: 2,
    marginBottom: 16,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  infoIcone: { fontSize: 18, marginRight: 12, marginTop: 2 },
  infoTextos: { flex: 1 },
  infoLabel: { fontSize: 11, color: '#666', marginBottom: 2, fontWeight: '600' },
  infoValor: { fontSize: 15, color: '#FFF' },

  botaoPrimario: {
    backgroundColor: '#E8193C',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 16,
  },
  botaoPrimarioTexto: { color: '#FFF', fontSize: 15, fontWeight: '700' },

  botaoSecundario: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  botaoSecundarioTexto: { color: '#CCC', fontSize: 15, fontWeight: '600' },

  botaoPerigo: { alignItems: 'center', marginTop: 20, paddingBottom: 8 },
  botaoPerigoTexto: { color: '#444', fontSize: 13 },
});
