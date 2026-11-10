// Created by AI.

// ============================================================
// Etapa 1 — Rota de captura/escolha da foto do pet
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Regra 15: este arquivo é uma ROTA. Ele pode conter lógica de tela,
// mas não deve exportar componentes reutilizáveis.
//
// Regras atendidas aqui:
//   10. "negada" (canAskAgain) e "bloqueada" (!canAskAgain) têm
//       mensagens diferentes, cada uma dizendo o que o TUTOR pode fazer.
//   14. Só a `uri` é usada — `base64` só quando for realmente usado.
//   18. Todo resultado do picker passa por `if (resultado.canceled) return;`.
//   19. `mediaTypes` é array (`['images']`), nunca `MediaTypeOptions`.
// ============================================================
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { usePetStore } from '../store/use-pet-store';
import { useTheme } from '../context/theme-context';
import { espaco, type PaletaCores, type TipografiaTema } from '../theme';

// Created by AI.
type FalhaCamera = 'camera-negada' | 'camera-bloqueada';

// Created by AI.
const MENSAGENS_FALHA: Record<FalhaCamera, string> = {
  'camera-negada':
    'Você negou o acesso à câmera. Toque em "Tirar foto" de novo e escolha "Permitir" quando o sistema perguntar.',
  'camera-bloqueada':
    'O acesso à câmera está bloqueado. Abra Ajustes > Permissões > Câmera e libere o app Pet Routine. Enquanto isso, use a galeria.',
};

// Opções comuns às duas origens: recorte quadrado (1:1) e qualidade 0.8.
// Created by AI.
const OPCOES_RECORTE: ImagePicker.ImagePickerOptions = {
  mediaTypes: ['images'],
  allowsEditing: true,
  aspect: [1, 1],
  quality: 0.8,
};

// Created by AI.
export default function TelaFotoDoPet() {
  const router = useRouter();
  const { petId } = useLocalSearchParams<{ petId?: string }>();
  const updatePet = usePetStore((estado) => estado.updatePet);
  const { cores, tipografia } = useTheme();
  const styles = useMemo(() => criarEstilos(cores, tipografia), [cores, tipografia]);
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [falha, setFalha] = useState<FalhaCamera | null>(null);
  const [erroGaleria, setErroGaleria] = useState('');

  // CONTRATO DE TRÊS TEMPOS — galeria
  //   1. PEDIR → requestMediaLibraryPermissionsAsync()
  //   2. LER   → launchImageLibraryAsync()
  //   3. PARAR → não se aplica: é uma leitura única, sem subscription para remover.
  async function escolherDaGaleria() {
    try {
      const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissao.granted) {
        setErroGaleria(
          permissao.canAskAgain
            ? 'Acesso às fotos negado. Toque em "Escolher da galeria" de novo e permita o acesso.'
            : 'Acesso às fotos bloqueado. Abra Ajustes > Permissões > Fotos e libere o app Pet Routine.',
        );
        return;
      }

      const resultado = await ImagePicker.launchImageLibraryAsync(OPCOES_RECORTE);
      if (resultado.canceled) return;

      setFotoUri(resultado.assets[0].uri);
      setErroGaleria('');
      setFalha(null);
    } catch {
      setErroGaleria('Não foi possível abrir a galeria. Tente novamente em instantes.');
    }
  }

  // CONTRATO DE TRÊS TEMPOS — câmera
  //   1. PEDIR → requestCameraPermissionsAsync()
  //   2. LER   → launchCameraAsync()
  //   3. PARAR → não se aplica: o seletor do sistema se fecha sozinho ao concluir ou cancelar.
  async function tirarFoto() {
    try {
      const permissao = await ImagePicker.requestCameraPermissionsAsync();
      if (!permissao.granted) {
        setFalha(permissao.canAskAgain ? 'camera-negada' : 'camera-bloqueada');
        return;
      }

      const resultado = await ImagePicker.launchCameraAsync(OPCOES_RECORTE);
      if (resultado.canceled) return;

      setFotoUri(resultado.assets[0].uri);
      setFalha(null);
      setErroGaleria('');
    } catch {
      setFalha(null);
      setErroGaleria('Não foi possível abrir a câmera. Confira se o aparelho possui uma câmera.');
    }
  }

  // Updated by AI.
  async function concluir() {
    if (!fotoUri) return;
    // Etapa 2: a store global guarda a foto, então nenhuma tela precisa
    // receber a URI por parâmetro de rota. Na Etapa 4 esta chamada vira
    // um `PUT /pets/${id}` dentro da própria store.
    if (petId) await updatePet(petId, { fotoUri });
    router.back();
  }

  return (
    <View style={styles.tela}>
      <Text style={tipografia.corpo}>
        Escolha uma foto quadrada para o seu pet. Você pode tirar uma nova foto ou usar uma da galeria.
      </Text>

      {fotoUri ? (
        <Image source={{ uri: fotoUri }} style={styles.previa} contentFit="cover" />
      ) : (
        <View style={[styles.previa, styles.previaVazia]}>
          <Text style={styles.textoPreviaVazia}>Nenhuma foto escolhida ainda</Text>
        </View>
      )}

      {falha !== null && <Text style={styles.erro}>{MENSAGENS_FALHA[falha]}</Text>}
      {erroGaleria !== '' && <Text style={styles.erro}>{erroGaleria}</Text>}

      <Pressable
        onPress={tirarFoto}
        accessibilityRole="button"
        style={({ pressed }) => [styles.botaoAcao, pressed && styles.pressionado]}
      >
        <Text style={styles.textoBotao}>Tirar foto</Text>
      </Pressable>

      <Pressable
        onPress={escolherDaGaleria}
        accessibilityRole="button"
        style={({ pressed }) => [styles.botaoAcao, pressed && styles.pressionado]}
      >
        <Text style={styles.textoBotao}>Escolher da galeria</Text>
      </Pressable>

      <Pressable
        onPress={concluir}
        disabled={!fotoUri}
        accessibilityRole="button"
        accessibilityState={{ disabled: !fotoUri }}
        style={({ pressed }) => [
          styles.botaoConcluir,
          !fotoUri && styles.botaoDesabilitado,
          pressed && fotoUri !== null && styles.pressionado,
        ]}
      >
        <Text style={styles.textoBotao}>Concluir</Text>
      </Pressable>
    </View>
  );
}

// Created by AI.
function criarEstilos(cores: PaletaCores, tipografia: TipografiaTema) {
  return StyleSheet.create({
    tela: {
      flex: 1,
      padding: espaco.lg,
      gap: espaco.md,
      backgroundColor: cores.fundo,
    },
    previa: {
      width: '100%',
      aspectRatio: 1,
      borderRadius: espaco.sm,
    },
    previaVazia: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: cores.cartao,
      borderWidth: 1,
      borderColor: cores.textoFraco,
    },
    textoPreviaVazia: {
      ...tipografia.legenda,
      textAlign: 'center',
    },
    erro: {
      ...tipografia.corpo,
      color: cores.erro,
    },
    botaoAcao: {
      backgroundColor: cores.primaria,
      padding: espaco.md,
      borderRadius: espaco.sm,
      alignItems: 'center',
    },
    botaoConcluir: {
      backgroundColor: cores.sucesso,
      padding: espaco.md,
      borderRadius: espaco.sm,
      alignItems: 'center',
    },
    botaoDesabilitado: {
      opacity: 0.4,
    },
    pressionado: {
      opacity: 0.7,
    },
    textoBotao: {
      color: cores.sobrePrimaria,
      fontWeight: 'bold',
    },
  });
}
