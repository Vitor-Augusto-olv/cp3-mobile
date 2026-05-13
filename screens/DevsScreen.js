import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

const EQUIPE = [
  {
    id: 1,
    nome: 'Vitor Augusto Oliveira de Abreu',
    rm: 'RM: 564227',
    turma: '2TDSPJ',
    cargo: 'Developer',
    // foto: require('../assets/dev1.jpg'), // descomente e ajuste se tiver foto local
    foto: null,
    emoji: '👨‍💻',
  },
  {
    id: 2,
    nome: 'Andre Bellandi Vital Rodrigues',
    rm: 'RM: 000002',
    turma: '2TDSPJ',
    cargo: 'Developer',
    foto: null,
    emoji: '👩‍💻',
  },
  {
    id: 3,
    nome: 'Gabriel Garcia Mayo Delatore',
    rm: 'RM: 000003',
    turma: '2TDSPJ',
    cargo: 'Developer',
    foto: null,
    emoji: '🧑‍💻',
  },
];
// ─────────────────────────────────────────────────────────────

export default function DevsScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.tag}>CHECKPOINT 03 • 2TDS</Text>
        <Text style={styles.titulo}>Equipe de{'\n'}Desenvolvedores</Text>
        <Text style={styles.subtitulo}>
          Mobile Application Development — FIAP
        </Text>
      </View>

      {/* Cards da equipe */}
      {EQUIPE.map((dev, index) => (
        <View key={dev.id} style={[styles.card, index === 0 && styles.cardDestaque]}>
          {/* Número */}
          <Text style={styles.numero}>0{dev.id}</Text>

          <View style={styles.cardConteudo}>
            {/* Foto ou placeholder */}
            {dev.foto ? (
              <Image source={dev.foto} style={styles.foto} />
            ) : (
              <View style={[styles.fotoPlaceholder, index === 0 && styles.fotoDestaqueColor]}>
                <Text style={styles.fotoEmoji}>{dev.emoji}</Text>
              </View>
            )}

            <View style={styles.cardInfo}>
              <View style={styles.cargoBadge}>
                <Text style={styles.cargoTexto}>{dev.cargo}</Text>
              </View>
              <Text style={styles.devNome}>{dev.nome}</Text>
              <Text style={styles.devRm}>{dev.rm}</Text>
              <Text style={styles.devTurma}>{dev.turma} • FIAP</Text>
            </View>
          </View>

          {/* Linha decorativa */}
          <View style={[styles.linhaDeco, index === 0 && styles.linhaDecoDestaque]} />
        </View>
      ))}

      {/* Rodapé */}
      <View style={styles.rodape}>
        <Text style={styles.rodapeTexto}>
          Prof. Fernando Pinéo • Mobile Application Development
        </Text>
      </View>

      {/* Botão voltar */}
      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.botaoVoltarTexto}>← Voltar ao Cadastro</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0F0F' },
  content: { padding: 24, paddingBottom: 48 },

  header: { marginBottom: 32, marginTop: 8 },
  tag: {
    fontSize: 10,
    fontWeight: '700',
    color: '#E8193C',
    letterSpacing: 2,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: -1.5,
    lineHeight: 40,
  },
  subtitulo: { fontSize: 13, color: '#555', marginTop: 8 },

  card: {
    backgroundColor: '#141414',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#222',
    overflow: 'hidden',
    position: 'relative',
  },
  cardDestaque: {
    backgroundColor: '#1A0A0F',
    borderColor: '#3A1020',
  },

  numero: {
    position: 'absolute',
    top: 14,
    right: 18,
    fontSize: 48,
    fontWeight: '800',
    color: '#1E1E1E',
    lineHeight: 52,
  },

  cardConteudo: { flexDirection: 'row', alignItems: 'center' },

  foto: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 16,
  },
  fotoPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  fotoDestaqueColor: { backgroundColor: '#2A0D15' },
  fotoEmoji: { fontSize: 32 },

  cardInfo: { flex: 1 },
  cargoBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#1E1E1E',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 6,
  },
  cargoTexto: { fontSize: 10, color: '#777', fontWeight: '700', letterSpacing: 1 },

  devNome: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  devRm: { fontSize: 13, color: '#E8193C', fontWeight: '600', marginBottom: 2 },
  devTurma: { fontSize: 12, color: '#555' },

  linhaDeco: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: '#222',
  },
  linhaDecoDestaque: { backgroundColor: '#E8193C' },

  rodape: {
    marginTop: 8,
    marginBottom: 24,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1A1A1A',
    paddingTop: 20,
  },
  rodapeTexto: { fontSize: 11, color: '#444', textAlign: 'center' },

  botaoVoltar: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  botaoVoltarTexto: { color: '#AAA', fontSize: 14, fontWeight: '600' },
});
