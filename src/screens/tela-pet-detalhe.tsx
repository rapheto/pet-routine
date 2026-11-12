// Created by AI.
// Updated by AI.

// ============================================================
// Etapa 5 — Tela de detalhe do pet (`/pet/[id]`) — UI reformulada
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Mostra todos os dados do pet, permite alternar o status do passeio,
// registrar o passeio com sensores (GPS + câmera), agendar o lembrete
// de notificação para 5s e excluir o pet.
//
// O estado vem da store global — a mesma usada pela lista e pelas
// estatísticas —, então tudo atualiza sem recarregar a tela.
//
// Etapa 3: cronômetro de passeio com cleanup e histórico local das
// sessões lido do SQLite (`passeio_logs`).
// ============================================================
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';

import { usePetStore } from '../store/use-pet-store';
import { agendarLembretePasseio } from '../services/notifications';
import { listarSessoesPasseio, type PasseioLog } from '../services/passeio-db';
import { formatarDuracao } from '../lib/duracao';
import { rotuloEspecie, rotuloPorte, rotuloStatusPasseio, type Pet } from '../types/pet';
import { useTheme } from '../context/theme-context';
import { TelaRegistro } from './tela-registro';
import { Badge, type TomBadge } from '../components/badge';
import { Button } from '../components/botao';
import { Card } from '../components/card';
import { Heading } from '../components/heading';
import { HStack } from '../components/hstack';
import { Text } from '../components/texto';
import { VStack } from '../components/vstack';
import { WalkTimer } from '../components/walk-timer';
import { espaco, type PaletaCores } from '../theme';

// Created by AI.
// Updated by AI.
type TelaPetDetalheProps = {
  petId?: string;
  iniciarRegistro?: boolean;
};

// Created by AI.
// Updated by AI.
const TOM_DO_STATUS: Record<Pet['statusPasseio'], TomBadge> = {
  pendente: 'ambar',
  concluido: 'verde',
  cancelado: 'rosa',
};

// Created by AI.
// Updated by AI.
// Updated by AI.
// Updated by AI.
export function TelaPetDetalhe({ petId, iniciarRegistro = false }: TelaPetDetalheProps) {
  const router = useRouter();
  const { cores } = useTheme();
  const estilos = useMemo(() => criarEstilos(cores), [cores]);

  const pets = usePetStore((estado) => estado.pets);
  const erroPet = usePetStore((estado) => estado.error);
  const togglePasseio = usePetStore((estado) => estado.togglePasseio);
  const registrarPasseio = usePetStore((estado) => estado.registrarPasseio);
  const atualizarPet = usePetStore((estado) => estado.updatePet);
  const removePet = usePetStore((estado) => estado.removePet);

  const [registrando, setRegistrando] = useState(iniciarRegistro);
  const [aviso, setAviso] = useState('');
  const [erroAcao, setErroAcao] = useState('');
  const [agendando, setAgendando] = useState(false);
  const [cancelando, setCancelando] = useState(false);
  const [removendo, setRemovendo] = useState(false);

  // Histórico local de sessões do cronômetro.
  const [historico, setHistorico] = useState<PasseioLog[]>([]);
  const [historicoErro, setHistoricoErro] = useState('');
  const [carregandoHistorico, setCarregandoHistorico] = useState(true);
  const [versaoHistorico, setVersaoHistorico] = useState(0);

  // Created by AI.
  useEffect(() => {
    if (!petId) {
      setCarregandoHistorico(false);
      return;
    }

    // `ativo` evita atualizar estado depois que a tela saiu da árvore.
    let ativo = true;
    setCarregandoHistorico(true);

    listarSessoesPasseio(petId)
      .then((logs) => {
        if (!ativo) return;
        setHistorico(logs);
        setHistoricoErro('');
      })
      .catch(() => {
        if (ativo) setHistoricoErro('Não foi possível ler o histórico local de passeios.');
      })
      .finally(() => {
        if (ativo) setCarregandoHistorico(false);
      });

    return () => {
      ativo = false;
    };
  }, [petId, versaoHistorico]);

  // Created by AI.
  const recarregarHistorico = useCallback(() => {
    setVersaoHistorico((versao) => versao + 1);
  }, []);

  const pet = petId ? pets.find((item) => item.id === petId) : undefined;

  if (!pet) {
    return (
      <>
        <Stack.Screen options={{ title: 'Pet' }} />
        <VStack className="flex-1 justify-center gap-4 p-6" style={estilos.tela}>
          <Text className="text-center text-base">
            Este pet não está mais na sua lista. Ele pode ter sido excluído em outro aparelho.
          </Text>
          <Button rotulo="Voltar para a lista" aoPressionar={() => router.back()} />
        </VStack>
      </>
    );
  }

  if (registrando) {
    return (
      <TelaRegistro
        pet={pet}
        onSalvar={async (local, fotoUri) => {
          const resultado = await registrarPasseio(pet.id, local, fotoUri);
          if (resultado.sucesso) {
            setRegistrando(false);
            setAviso('Passeio registrado!');
          }
          return resultado;
        }}
        onCancelar={() => setRegistrando(false)}
      />
    );
  }

  // Arrow functions (e não `function`) para o TypeScript manter o
  // estreitamento de tipo feito pelo `if (!pet)` acima.
  // Updated by AI.
  const lembrarPasseio = async () => {
    setAgendando(true);
    setAviso('');
    setErroAcao('');
    try {
      const agendamento = await agendarLembretePasseio(pet.id, pet.nome);
      if (agendamento.tipo === 'agendado') {
        setAviso('Lembrete agendado para daqui a 5 segundos.');
      } else if (agendamento.tipo === 'permissao-negada') {
        setErroAcao(
          'Permissão para notificações negada. Toque em “Lembrar do passeio” novamente e permita o acesso.',
        );
      } else {
        setErroAcao(
          'Permissão para notificações bloqueada. Libere o acesso em Ajustes > Permissões > Notificações.',
        );
      }
    } catch {
      setErroAcao('Não foi possível agendar o lembrete. Tente novamente.');
    } finally {
      setAgendando(false);
    }
  };

  // Updated by AI.
  const excluir = async () => {
    setRemovendo(true);
    setErroAcao('');
    try {
      const resultado = await removePet(pet.id);
      if (resultado.sucesso) router.back();
      else setErroAcao(resultado.erro);
    } finally {
      setRemovendo(false);
    }
  };

  // Created by AI.
  // Updated by AI.
  const cancelarPasseio = async () => {
    setCancelando(true);
    setAviso('');
    setErroAcao('');
    try {
      const resultado = await atualizarPet(pet.id, { statusPasseio: 'cancelado' });
      if (resultado.sucesso) setAviso('Passeio cancelado.');
      else setErroAcao(resultado.erro);
    } finally {
      setCancelando(false);
    }
  };

  // Created by AI.
  const confirmarCancelamento = () => {
    Alert.alert(
      'Cancelar passeio',
      `Tem certeza de que deseja cancelar o passeio de ${pet.nome}?`,
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', style: 'destructive', onPress: () => void cancelarPasseio() },
      ],
    );
  };

  // Created by AI.
  const confirmarExclusao = () => {
    Alert.alert(
      'Excluir pet',
      `Tem certeza de que deseja excluir ${pet.nome}? Esta ação não pode ser desfeita.`,
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', style: 'destructive', onPress: () => void excluir() },
      ],
    );
  };

  return (
    <ScrollView style={estilos.tela} contentContainerStyle={estilos.conteudo}>
      <Stack.Screen
        options={{
          title: pet.nome,
          headerRight: () => (
            <Pressable
              onPress={confirmarExclusao}
              disabled={removendo}
              accessibilityRole="button"
              accessibilityLabel={`Excluir ${pet.nome}`}
              accessibilityState={{ disabled: removendo }}
              hitSlop={10}
            >
              <Ionicons name="trash-outline" size={22} color={cores.erro} />
            </Pressable>
          ),
        }}
      />

      <Card>
        <VStack className="gap-1">
          <Heading nivel="pagina">{pet.nome}</Heading>
          <Text className="text-sm" tom="fraco">
            {rotuloEspecie(pet.especie)} · {rotuloPorte(pet.porte)} · {pet.idadeMeses} meses
          </Text>
        </VStack>

        <HStack className="flex-wrap gap-2">
          <Badge texto={`Passeio: ${rotuloStatusPasseio(pet.statusPasseio)}`} tom={TOM_DO_STATUS[pet.statusPasseio]} />
          <Badge texto={rotuloPorte(pet.porte)} tom="verde" />
        </HStack>

        <Text className="text-xs" tom="fraco">
          {pet.local
            ? `Último passeio: ${pet.local.latitude.toFixed(3)}, ${pet.local.longitude.toFixed(3)} (±${Math.round(pet.local.precisaoMetros)}m)`
            : 'Nenhum passeio registrado com localização ainda.'}
        </Text>
      </Card>

      {pet.fotoUri ? (
        <Image source={{ uri: pet.fotoUri }} style={estilos.foto} contentFit="cover" />
      ) : (
        <VStack
          className="w-full items-center justify-center gap-2 rounded-2xl"
          style={[estilos.foto, estilos.fotoVazia]}
        >
          <Text className="text-3xl">🐾</Text>
          <Text className="text-sm" tom="fraco">
            Este pet ainda não tem foto
          </Text>
          <Button
            rotulo="Adicionar foto"
            variante="primario"
            aoPressionar={() => router.push({ pathname: '/foto-do-pet', params: { petId: pet.id } })}
            compacto
          />
        </VStack>
      )}

      <WalkTimer petId={pet.id} onSessaoSalva={recarregarHistorico} />

      <Card>
        <Heading nivel="secao">Histórico local de passeios</Heading>

        {carregandoHistorico ? (
          <Text className="text-sm" tom="fraco">
            Carregando histórico...
          </Text>
        ) : historicoErro !== '' ? (
          <Text className="text-sm" tom="erro">
            {historicoErro}
          </Text>
        ) : historico.length === 0 ? (
          <Text className="text-sm" tom="fraco">
            Nenhuma sessão cronometrada ainda. Inicie o cronômetro e salve ao voltar do passeio.
          </Text>
        ) : (
          <VStack className="gap-2">
            {historico.map((log) => (
              <HStack key={log.id} className="justify-between">
                <Text className="text-sm font-semibold">{formatarDuracao(log.seconds)}</Text>
                <Text className="text-xs" tom="fraco">
                  {formatarData(log.createdAt)}
                </Text>
              </HStack>
            ))}
          </VStack>
        )}
      </Card>

      {aviso !== '' && (
        <Text className="text-sm" tom="sucesso">
          {aviso}
        </Text>
      )}
      {erroAcao !== '' && (
        <Text className="text-sm" tom="erro">
          {erroAcao}
        </Text>
      )}
      {erroPet !== null && erroAcao === '' && (
        <Text className="text-sm" tom="erro">
          {erroPet}
        </Text>
      )}

      <VStack className="gap-2">
        <Button
          rotulo={
            pet.statusPasseio === 'concluido'
              ? 'Reabrir passeio'
              : 'Marcar passeio como concluído'
          }
          aoPressionar={() => void togglePasseio(pet.id)}
        />

        <Button
          rotulo="Registrar passeio com GPS e foto"
          variante="primario"
          aoPressionar={() => {
            setAviso('');
            setErroAcao('');
            setRegistrando(true);
          }}
        />

        <Button
          rotulo={agendando ? 'Agendando...' : 'Lembrar do passeio em 5s'}
          variante="secundario"
          aoPressionar={() => void lembrarPasseio()}
          carregando={agendando}
        />

        <Button
          rotulo="Trocar foto"
          variante="secundario"
          aoPressionar={() => router.push({ pathname: '/foto-do-pet', params: { petId: pet.id } })}
        />

        {pet.statusPasseio !== 'cancelado' && (
          <Button
            rotulo={cancelando ? 'Cancelando...' : 'Cancelar passeio'}
            variante="perigo"
            aoPressionar={confirmarCancelamento}
            carregando={cancelando}
          />
        )}
      </VStack>
    </ScrollView>
  );
}

// Created by AI.
function formatarData(iso: string): string {
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return iso;
  return data.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

// Updated by AI.
function criarEstilos(cores: PaletaCores) {
  return StyleSheet.create({
    tela: {
      flex: 1,
      backgroundColor: cores.fundo,
    },
    conteudo: {
      padding: espaco.md,
      gap: espaco.md,
    },
    foto: {
      width: '100%',
      aspectRatio: 16 / 9,
      borderRadius: espaco.md,
    },
    fotoVazia: {
      backgroundColor: cores.cartaoSuave,
      borderWidth: 1,
      borderColor: cores.borda,
    },
  });
}
