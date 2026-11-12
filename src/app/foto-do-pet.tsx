// Created by AI.
// Updated by AI.

// ============================================================
// Etapa 1/5 — Rota de captura/escolha da foto do pet (UI reformulada)
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
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { usePetStore } from '../store/use-pet-store';
import { useTheme } from '../context/theme-context';
import { Button } from '../components/botao';
import { Card } from '../components/card';
import { Heading } from '../components/heading';
import { Text } from '../components/texto';
import { VStack } from '../components/vstack';
import { espaco, type PaletaCores } from '../theme';

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
// Updated by AI.
export default function TelaFotoDoPet() {
  const router = useRouter();
  const { petId } = useLocalSearchParams<{ petId?: string }>();
  const updatePet = usePetStore((estado) => estado.updatePet);
  const { cores } = useTheme();
  const estilos = useMemo(() => criarEstilos(cores), [cores]);
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [falha, setFalha] = useState<FalhaCamera | null>(null);
  const [erroGaleria, setErroGaleria] = useState('');
  const [erroSalvar, setErroSalvar] = useState('');
  const [salvando, setSalvando] = useState(false);

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
      setErroSalvar('');
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
      setErroSalvar('');
    } catch {
      setFalha(null);
      setErroGaleria('Não foi possível abrir a câmera. Confira se o aparelho possui uma câmera.');
    }
  }

  // Updated by AI.
  async function concluir() {
    if (!fotoUri || salvando) return;
    if (petId) {
      setSalvando(true);
      try {
        const resultado = await updatePet(petId, { fotoUri });
        if (resultado.sucesso) {
          router.back();
        } else {
          setErroSalvar(resultado.erro);
        }
      } finally {
        setSalvando(false);
      }
      return;
    }
    router.back();
  }

  return (
    <VStack className="flex-1 gap-4 p-6" style={estilos.tela}>
      <Heading nivel="pagina">Foto do pet</Heading>
      <Text className="text-sm" tom="fraco">
        Escolha uma foto quadrada para o seu pet. Você pode tirar uma nova foto ou usar uma da galeria.
      </Text>

      {fotoUri ? (
        <Image
          source={{ uri: fotoUri }}
          style={estilos.previa}
          contentFit="cover"
        />
      ) : (
        <VStack className="w-full items-center justify-center gap-2 rounded-2xl" style={[estilos.previa, estilos.previaVazia]}>
          <Text className="text-4xl">📷</Text>
          <Text className="text-sm" tom="fraco">
            Nenhuma foto escolhida ainda
          </Text>
        </VStack>
      )}

      {falha !== null && (
        <Card className="border-2" style={estilos.cartaoErro}>
          <Text className="text-sm" tom="sobreRosa">
            {MENSAGENS_FALHA[falha]}
          </Text>
        </Card>
      )}
      {erroGaleria !== '' && (
        <Card className="border-2 py-3" style={estilos.cartaoErro}>
          <Text className="text-sm" tom="sobreRosa">
            {erroGaleria}
          </Text>
        </Card>
      )}
      {erroSalvar !== '' && (
        <Card className="border-2 py-3" style={estilos.cartaoErro}>
          <Text className="text-sm" tom="sobreRosa">
            {erroSalvar}
          </Text>
        </Card>
      )}

      <VStack className="gap-2">
        <Button rotulo="Tirar foto" aoPressionar={() => void tirarFoto()} />
        <Button
          rotulo="Escolher da galeria"
          variante="secundario"
          aoPressionar={() => void escolherDaGaleria()}
        />
        <Button
          rotulo={salvando ? 'Salvando...' : 'Concluir'}
          aoPressionar={() => void concluir()}
          desabilitado={fotoUri === null}
          carregando={salvando}
        />
      </VStack>
    </VStack>
  );
}

// Updated by AI.
function criarEstilos(cores: PaletaCores) {
  return StyleSheet.create({
    tela: {
      backgroundColor: cores.fundo,
    },
    previa: {
      width: '100%',
      aspectRatio: 1,
      borderRadius: espaco.md,
    },
    previaVazia: {
      backgroundColor: cores.cartaoSuave,
      borderWidth: 1,
      borderColor: cores.borda,
    },
    cartaoErro: {
      borderColor: cores.erro,
      backgroundColor: cores.rosa,
    },
  });
}
