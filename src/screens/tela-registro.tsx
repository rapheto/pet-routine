// Declaração: este arquivo foi desenvolvido com apoio de IA e revisado por mim.
// Updated by AI.

// ============================================================
// Etapa 5 — Tela de registro de passeio (sensores) — UI reformulada
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Captura o CONTEXTO do passeio: onde aconteceu (GPS) e como ele se
// parecia (câmera).
//
// CONTRATO DE TRÊS TEMPOS:
//   1. PEDIR   → requestForegroundPermissionsAsync / pedirPermissaoCamera
//   2. LER     → getCurrentPositionAsync / takePictureAsync
//   3. PARAR   → leitura única (GPS) e setMostrarCamera(false) (câmera)
//
// Restrições: sem mapa (coordenada é texto), sem salvar na galeria e
// sem rede. `Accuracy` justificada: High por equilíbrio precisão/bateria.
// ============================================================
import { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import { CameraView, useCameraPermissions } from 'expo-camera';

import type { Pet } from '../types/pet';
import type { ResultadoAcao } from '../store/use-pet-store';
import { useTheme } from '../context/theme-context';
import { Button } from '../components/botao';
import { Card } from '../components/card';
import { Heading } from '../components/heading';
import { HStack } from '../components/hstack';
import { Text } from '../components/texto';
import { VStack } from '../components/vstack';
import { espaco, type PaletaCores } from '../theme';

// Updated by AI.
type TelaRegistroProps = {
  pet: Pet;
  onSalvar: (local?: Pet['local'], fotoUri?: string) => Promise<ResultadoAcao>;
  onCancelar: () => void;
};

// Updated by AI.
export function TelaRegistro({ pet, onSalvar, onCancelar }: TelaRegistroProps) {
  const { cores } = useTheme();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  const [local, setLocal] = useState<Pet['local'] | null>(null);
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [erro, setErro] = useState('');
  const [mostrarCamera, setMostrarCamera] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const [permissaoCamera, pedirPermissaoCamera] = useCameraPermissions();

  const [cameraRef, setCameraRef] = useState<CameraView | null>(null);

  // ----- Localização -----
  // CONTRATO: 1. PEDIR → requestForegroundPermissionsAsync
  //           2. LER   → getCurrentPositionAsync
  //           3. PARAR → não se aplica (leitura única, sem subscription)
  async function obterLocalizacao() {
    try {
      const servico = await Location.hasServicesEnabledAsync();
      if (!servico) {
        setErro('GPS desligado. Ative a localização nas configurações.');
        return;
      }
      const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErro(canAskAgain
          ? 'Permissão de localização negada. Toque para tentar de novo.'
          : 'Permissão de localização bloqueada. Vá em Configurações > Permissões.');
        return;
      }
      const posicao = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setLocal({
        latitude: posicao.coords.latitude,
        longitude: posicao.coords.longitude,
        precisaoMetros: posicao.coords.accuracy ?? 0,
      });
      setErro('');
    } catch {
      setErro('Sensor de localização indisponível. Confira se o aparelho possui GPS.');
    }
  }

  // ----- Câmera -----
  // CONTRATO: 1. PEDIR → pedirPermissaoCamera()
  //           2. LER   → cameraRef.takePictureAsync()
  //           3. PARAR → setMostrarCamera(false) (fecha a view)
  async function abrirCamera() {
    try {
      const resultado = await pedirPermissaoCamera();
      if (resultado.status !== 'granted') {
        setErro(resultado.canAskAgain
          ? 'Permissão de câmera negada. Toque em Tirar foto para tentar de novo.'
          : 'Permissão de câmera bloqueada. Vá em Configurações > Permissões.');
        return;
      }
      setMostrarCamera(true);
      setErro('');
    } catch {
      setErro('Câmera indisponível. Confira se o aparelho possui uma câmera.');
    }
  }

  async function tirarFoto() {
    if (!cameraRef) {
      setErro('Câmera indisponível. Aguarde a câmera abrir e tente novamente.');
      return;
    }
    try {
      const foto = await cameraRef.takePictureAsync({ base64: false });
      if (foto) {
        setFotoUri(foto.uri);
        setMostrarCamera(false);
      }
    } catch {
      setErro('Não foi possível tirar a foto. Confira o sensor da câmera.');
    }
  }

  // Updated by AI.
  async function salvar() {
    if (salvando) return;
    setSalvando(true);
    setErro('');
    const resultado = await onSalvar(local ?? undefined, fotoUri ?? undefined);
    if (!resultado.sucesso) {
      setErro(resultado.erro);
      setSalvando(false);
    }
  }

  // ----- Renderização: câmera ativa -----
  if (mostrarCamera) {
    return (
      <VStack className="flex-1 gap-4 p-4" style={styles.tela}>
        <CameraView ref={setCameraRef} style={styles.camera} facing="back" />
        <HStack className="gap-3">
          <Button rotulo="Tirar foto" aoPressionar={() => void tirarFoto()} className="flex-1" />
          <Button
            rotulo="Cancelar"
            variante="secundario"
            aoPressionar={() => setMostrarCamera(false)}
            className="flex-1"
          />
        </HStack>
      </VStack>
    );
  }

  // ----- Renderização: tela principal de registro -----
  return (
    <VStack className="flex-1 gap-4 p-4" style={styles.tela}>
      <Heading nivel="pagina">Registrar passeio</Heading>
      <Text className="text-sm" tom="fraco">
        Contexto do passeio de {pet.nome}: localização e foto.
      </Text>

      {erro !== '' && (
        <Text className="text-sm" tom="erro">
          {erro}
        </Text>
      )}

      <Card>
        <Heading nivel="secao">Localização</Heading>
        {local ? (
          <Text className="text-sm">
            Local: {local.latitude.toFixed(3)}, {local.longitude.toFixed(3)} (±
            {Math.round(local.precisaoMetros)}m)
          </Text>
        ) : (
          <Button rotulo="Obter localização" aoPressionar={() => void obterLocalizacao()} />
        )}
      </Card>

      <Card>
        <Heading nivel="secao">Foto do passeio</Heading>
        {fotoUri ? (
          <Image
            source={{ uri: fotoUri }}
            style={styles.previa}
            contentFit="cover"
          />
        ) : (
          <Button rotulo="Tirar foto" variante="primario" aoPressionar={() => void abrirCamera()} />
        )}
        {permissaoCamera?.granted === false && (
          <Text className="text-xs" tom="fraco">
            Sem permissão de câmera, você ainda pode salvar o passeio com a localização.
          </Text>
        )}
      </Card>

      <HStack className="gap-3">
        <Button
          rotulo={salvando ? 'Salvando...' : 'Salvar'}
          aoPressionar={() => void salvar()}
          className="flex-1"
          carregando={salvando}
        />
        <Button
          rotulo="Cancelar"
          variante="secundario"
          aoPressionar={onCancelar}
          className="flex-1"
          desabilitado={salvando}
        />
      </HStack>
    </VStack>
  );
}

// Updated by AI.
function criarEstilos(cores: PaletaCores) {
  return StyleSheet.create({
    tela: {
      backgroundColor: cores.fundo,
    },
    camera: {
      flex: 1,
      borderRadius: espaco.sm,
    },
    previa: {
      width: '100%',
      height: 200,
      borderRadius: espaco.sm,
    },
  });
}
