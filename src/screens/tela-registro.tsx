// Declaração: este arquivo foi desenvolvido com apoio de IA e revisado por mim.

// ============================================================
// Prática 3 — Tela de registro de passeio (sensores)
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Captura o CONTEXTO do passeio: onde aconteceu (GPS) e como ele
// se parecia (câmera). Navegação por condicional com useState —
// navegação real chega na Aula 7.
//
// CONTRATO DE TRÊS TEMPOS — preencha em cada bloco de sensor:
//   1. PEDIR   → ______________________________
//   2. LER     → ______________________________
//   3. PARAR   → ______________________________  (ou: "não se aplica, porque ___")
//
// Restrições:
//   • Sem useEffect, useRef — apenas useState + hooks das bibliotecas
//   • Sem navegação — a tela aparece por condicional em App.tsx
//   • Sem mapa — coordenada é texto
//   • Sem salvar na galeria e sem escolher do rolo
//   • Sem rede — foto vive no cache
// ============================================================
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import { CameraView, useCameraPermissions } from 'expo-camera';

import type { Pet } from '../types/pet';
import { useTheme } from '../context/theme-context';
import { espaco, type PaletaCores, type TipografiaTema } from '../theme';

type TelaRegistroProps = {
  pet: Pet;
  onSalvar: (local?: Pet['local'], fotoUri?: string) => void;
  onCancelar: () => void;
};

// Updated by AI.
export function TelaRegistro({ pet, onSalvar, onCancelar }: TelaRegistroProps) {
  const { cores, tipografia } = useTheme();
  const styles = useMemo(() => criarEstilos(cores, tipografia), [cores, tipografia]);

  const [local, setLocal] = useState<Pet['local'] | null>(null);
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [erro, setErro] = useState('');
  const [mostrarCamera, setMostrarCamera] = useState(false);

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

  function salvar() {
    onSalvar(local ?? undefined, fotoUri ?? undefined);
  }

  // ----- Renderização: câmera ativa -----
  if (mostrarCamera) {
    return (
      <View style={styles.tela}>
        <CameraView ref={setCameraRef} style={styles.camera} facing="back" />
        <View style={styles.acoes}>
          <Pressable
            onPress={tirarFoto}
            style={({ pressed }) => [styles.botaoAcao, pressed && styles.pressionado]}
          >
            <Text style={styles.textoBotao}>Tirar foto</Text>
          </Pressable>
          <Pressable
            onPress={() => setMostrarCamera(false)}
            style={({ pressed }) => [styles.botaoCancelar, pressed && styles.pressionado]}
          >
            <Text style={styles.textoBotao}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // ----- Renderização: tela principal de registro -----
  return (
    <View style={styles.tela}>
      <Text style={tipografia.titulo}>Registrar passeio de {pet.nome}</Text>

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      {/* Localização */}
      {local ? (
        <View style={styles.secao}>
          <Text style={tipografia.corpo}>
            {/* Formate lat/lng para HUMANOS, com precisão.
                Ex: "Local: -8.054, -34.871 (±12m)"
                Coordenada crua com 14 casas decimais não é informação. */}
            Local: {local.latitude.toFixed(3)}, {local.longitude.toFixed(3)} (±{Math.round(local.precisaoMetros)}m)
          </Text>
        </View>
      ) : (
        <Pressable
          onPress={obterLocalizacao}
          style={({ pressed }) => [styles.botaoAcao, pressed && styles.pressionado]}
        >
          <Text style={styles.textoBotao}>Obter localização</Text>
        </Pressable>
      )}

      {/* Foto */}
      {fotoUri ? (
        <Image
          source={{ uri: fotoUri }}
          style={styles.previa}
          contentFit="cover"
        />
      ) : (
        <Pressable
          onPress={abrirCamera}
          style={({ pressed }) => [styles.botaoAcao, pressed && styles.pressionado]}
        >
          <Text style={styles.textoBotao}>Tirar foto</Text>
        </Pressable>
      )}

      {/* Ações */}
      <View style={styles.acoes}>
        <Pressable
          onPress={salvar}
          style={({ pressed }) => [styles.botaoAcao, pressed && styles.pressionado]}
        >
          <Text style={styles.textoBotao}>Salvar</Text>
        </Pressable>
        <Pressable
          onPress={onCancelar}
          style={({ pressed }) => [styles.botaoCancelar, pressed && styles.pressionado]}
        >
          <Text style={styles.textoBotao}>Cancelar</Text>
        </Pressable>
      </View>
    </View>
  );
}

// Updated by AI.
function criarEstilos(cores: PaletaCores, tipografia: TipografiaTema) {
  return StyleSheet.create({
    tela: {
      flex: 1,
      padding: espaco.md,
      backgroundColor: cores.fundo,
      gap: espaco.md,
    },
    erro: { ...tipografia.corpo, color: cores.erro },
    secao: { gap: espaco.sm },
    camera: { flex: 1, borderRadius: espaco.sm },
    previa: { width: '100%', height: 200, borderRadius: espaco.sm },
    pressionado: { opacity: 0.7 },
    botaoAcao: {
      backgroundColor: cores.primaria,
      padding: espaco.md,
      borderRadius: espaco.sm,
      alignItems: 'center',
    },
    botaoCancelar: {
      backgroundColor: cores.textoFraco,
      padding: espaco.md,
      borderRadius: espaco.sm,
      alignItems: 'center',
      flex: 1,
    },
    textoBotao: { color: cores.sobrePrimaria, fontWeight: 'bold' },
    acoes: { flexDirection: 'row', gap: espaco.md },
  });
}
