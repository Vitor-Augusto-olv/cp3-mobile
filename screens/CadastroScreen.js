import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../context/UserContext';

export default function CadastroScreen({ navigation }) {
  const { userData, atualizarDados } = useUser();
  const [carregandoCep, setCarregandoCep] = useState(false);
  const [erros, setErros] = useState({});

  // ── Câmera ──────────────────────────────────────────────
  const tirarFoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão negada',
          'Precisamos de acesso à câmera para capturar sua foto de perfil. Habilite nas configurações do dispositivo.'
        );
        return;
      }

      const resultado = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!resultado.canceled) {
        atualizarDados({ foto: resultado.assets[0].uri });
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível acessar a câmera. Tente novamente.');
    }
  };

  // ── ViaCEP ───────────────────────────────────────────────
  const buscarCep = async (cep) => {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;

    setCarregandoCep(true);
    setErros((prev) => ({ ...prev, cep: '' }));

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const dados = await response.json();

      if (dados.erro) {
        setErros((prev) => ({ ...prev, cep: 'CEP não encontrado.' }));
        atualizarDados({ logradouro: '', bairro: '', cidade: '', uf: '' });
      } else {
        atualizarDados({
          logradouro: dados.logradouro || '',
          bairro: dados.bairro || '',
          cidade: dados.localidade || '',
          uf: dados.uf || '',
        });
      }
    } catch (error) {
      setErros((prev) => ({
        ...prev,
        cep: 'Falha na conexão. Verifique sua internet.',
      }));
    } finally {
      setCarregandoCep(false);
    }
  };

  // ── Validação e salvar ───────────────────────────────────
  const validar = () => {
    const novosErros = {};
    if (!userData.nome.trim()) novosErros.nome = 'Nome é obrigatório.';
    if (!userData.rm.trim()) novosErros.rm = 'RM é obrigatório.';
    if (!userData.email.trim()) novosErros.email = 'E-mail é obrigatório.';
    else if (!/\S+@\S+\.\S+/.test(userData.email))
      novosErros.email = 'E-mail inválido.';
    if (!userData.cep.trim()) novosErros.cep = 'CEP é obrigatório.';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const salvar = () => {
    if (validar()) {
      navigation.navigate('Perfil');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.titulo}>Cadastro</Text>
          <Text style={styles.subtitulo}>Preencha seu perfil acadêmico</Text>
        </View>

        {/* Avatar / Câmera */}
        <TouchableOpacity style={styles.avatarContainer} onPress={tirarFoto}>
          {userData.foto ? (
            <Image source={{ uri: userData.foto }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarIcone}>📷</Text>
              <Text style={styles.avatarTexto}>Tirar Foto</Text>
            </View>
          )}
          <View style={styles.avatarBadge}>
            <Text style={styles.avatarBadgeTexto}>✎</Text>
          </View>
        </TouchableOpacity>

        {/* Dados Pessoais */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>DADOS PESSOAIS</Text>

          <Campo
            label="Nome Completo"
            value={userData.nome}
            onChangeText={(v) => atualizarDados({ nome: v })}
            placeholder="Seu nome completo"
            erro={erros.nome}
          />
          <Campo
            label="RM"
            value={userData.rm}
            onChangeText={(v) => atualizarDados({ rm: v })}
            placeholder="000000"
            keyboardType="numeric"
            erro={erros.rm}
          />
          <Campo
            label="E-mail"
            value={userData.email}
            onChangeText={(v) => atualizarDados({ email: v })}
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            erro={erros.email}
          />
          <Campo
            label="Turma"
            value={userData.turma}
            onChangeText={(v) => atualizarDados({ turma: v })}
            placeholder="Ex: 2TDS"
          />
        </View>

        {/* Endereço */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>ENDEREÇO</Text>

          <View style={styles.cepRow}>
            <View style={{ flex: 1 }}>
              <Campo
                label="CEP"
                value={userData.cep}
                onChangeText={(v) => {
                  atualizarDados({ cep: v });
                  if (v.replace(/\D/g, '').length === 8) buscarCep(v);
                }}
                placeholder="00000-000"
                keyboardType="numeric"
                maxLength={9}
                erro={erros.cep}
              />
            </View>
            {carregandoCep && (
              <ActivityIndicator
                color="#E8193C"
                style={styles.cepLoader}
                size="small"
              />
            )}
          </View>

          <Campo
            label="Logradouro"
            value={userData.logradouro}
            onChangeText={(v) => atualizarDados({ logradouro: v })}
            placeholder="Preenchido via CEP"
            editable={!carregandoCep}
          />
          <Campo
            label="Bairro"
            value={userData.bairro}
            onChangeText={(v) => atualizarDados({ bairro: v })}
            placeholder="Preenchido via CEP"
            editable={!carregandoCep}
          />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Campo
                label="Cidade"
                value={userData.cidade}
                onChangeText={(v) => atualizarDados({ cidade: v })}
                placeholder="Cidade"
                editable={!carregandoCep}
              />
            </View>
            <View style={{ width: 70 }}>
              <Campo
                label="UF"
                value={userData.uf}
                onChangeText={(v) => atualizarDados({ uf: v })}
                placeholder="SP"
                maxLength={2}
                autoCapitalize="characters"
                editable={!carregandoCep}
              />
            </View>
          </View>
        </View>

        {/* Botão Salvar */}
        <TouchableOpacity style={styles.botaoSalvar} onPress={salvar}>
          <Text style={styles.botaoSalvarTexto}>Salvar e Ver Perfil</Text>
        </TouchableOpacity>

        {/* Link para Devs */}
        <TouchableOpacity
          style={styles.linkDevs}
          onPress={() => navigation.navigate('Devs')}
        >
          <Text style={styles.linkDevsTexto}>Ver Equipe de Desenvolvedores →</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Componente reutilizável de campo
function Campo({ label, erro, ...props }) {
  return (
    <View style={styles.campoContainer}>
      <Text style={styles.campoLabel}>{label}</Text>
      <TextInput
        style={[styles.input, erro ? styles.inputErro : null]}
        placeholderTextColor="#999"
        {...props}
      />
      {erro ? <Text style={styles.erroTexto}>{erro}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0F0F' },
  content: { padding: 24, paddingBottom: 48 },

  header: { marginBottom: 28, marginTop: 8 },
  titulo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  subtitulo: { fontSize: 14, color: '#777', marginTop: 4 },

  avatarContainer: {
    alignSelf: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#E8193C',
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1A1A1A',
    borderWidth: 2,
    borderColor: '#333',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarIcone: { fontSize: 28 },
  avatarTexto: { fontSize: 11, color: '#666', marginTop: 4 },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#E8193C',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0F0F0F',
  },
  avatarBadgeTexto: { color: '#FFF', fontSize: 12 },

  secao: { marginBottom: 24 },
  secaoTitulo: {
    fontSize: 11,
    fontWeight: '700',
    color: '#E8193C',
    letterSpacing: 2,
    marginBottom: 12,
  },

  cepRow: { flexDirection: 'row', alignItems: 'center' },
  cepLoader: { marginLeft: 10, marginTop: 8 },
  row: { flexDirection: 'row' },

  campoContainer: { marginBottom: 14 },
  campoLabel: { fontSize: 12, color: '#AAA', marginBottom: 6, fontWeight: '600' },
  input: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 10,
    padding: 13,
    color: '#FFF',
    fontSize: 15,
  },
  inputErro: { borderColor: '#E8193C' },
  erroTexto: { color: '#E8193C', fontSize: 11, marginTop: 4 },

  botaoSalvar: {
    backgroundColor: '#E8193C',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoSalvarTexto: { color: '#FFF', fontSize: 16, fontWeight: '700' },

  linkDevs: { alignItems: 'center', marginTop: 20 },
  linkDevsTexto: { color: '#555', fontSize: 13 },
});
