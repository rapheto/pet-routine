// Created by AI.

// ============================================================
// Etapa 2 — Tela de detalhe do pet (`/pet/[id]`)
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
// sessões lido do SQLite (`passeio_logs`). O tema Claro/Escuro é
// aplicado em toda a tela.
// ============================================================
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';

import { usePetStore } from '../store/use-pet-store';
import { agendarLembretePasseio } from '../services/notifications';
import { listarSessoesPasseio, type PasseioLog } from '../services/passeio-db';
import { formatarDuracao } from '../lib/duracao';
import { rotuloEspecie, rotuloStatusPasseio, type PortePet } from '../types/pet';
import { useTheme } from '../context/theme-context';
import { TelaRegistro } from './tela-registro';
import { Card } from '../components/card';
import { WalkTimer } from '../components/walk-timer';
import { espaco, type PaletaCores, type TipografiaTema } from '../theme';

// Created by AI.
type TelaPetDetalheProps = {
  petId?: string;
};

// Created by AI.
export function TelaPetDetalhe({ petId }: TelaPetDetalheProps) {
  const router = useRouter();
  const { cores, tipografia } = useTheme();
  const estilos = useMemo(() => criarEstilos(cores, tipografia), [cores, tipografia]);

  const pets = usePetStore((estado) => estado.pets);
  const togglePasseio = usePetStore((estado) => estado.togglePasseio);
  const registrarPasseio = usePetStore((estado) => estado.registrarPasseio);
  const removePet = usePetStore((estado) => estado.removePet);

  const [registrando, setRegistrando] = useState(false);
  const [aviso, setAviso] = useState('');
  const [agendando, setAgendando] = useState(false);

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
        <View style={estilos.tela}>
          <Text style={estilos.vazio}>
            Este pet não está mais na sua lista. Ele pode ter sido excluído em outro aparelho.
          </Text>
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            style={({ pressed }) => [estilos.botaoNeutro, pressed && estilos.pressionado]}
          >
            <Text style={estilos.textoBotao}>Voltar para a lista</Text>
          </Pressable>
        </View>
      </>
    );
  }

  if (registrando) {
    return (
      <TelaRegistro
        pet={pet}
        onSalvar={async (local, fotoUri) => {
          await registrarPasseio(pet.id, local, fotoUri);
          setRegistrando(false);
          setAviso('Passeio registrado!');
        }}
        onCancelar={() => setRegistrando(false)}
      />
    );
  }

  // Arrow functions (e não `function`) para o TypeScript manter o
  // estreitamento de tipo feito pelo `if (!pet)` acima.
  const lembrarPasseio = async () => {
    setAgendando(true);
    try {
      const agendamento = await agendarLembretePasseio(pet.id, pet.nome);
      setAviso(
        agendamento
          ? 'Lembrete agendado para daqui a 5 segundos.'
          : 'Notificações bloqueadas. Libere o acesso em Ajustes > Permissões > Notificações.',
      );
    } catch {
      setAviso('Não foi possível agendar o lembrete. Tente novamente.');
    } finally {
      setAgendando(false);
    }
  };

  const excluir = () => {
    void removePet(pet.id);
    router.back();
  };

  return (
    <ScrollView style={estilos.tela} contentContainerStyle={estilos.conteudo}>
      <Stack.Screen options={{ title: pet.nome }} />

      {pet.fotoUri ? (
        <Image source={{ uri: pet.fotoUri }} style={estilos.foto} contentFit="cover" />
      ) : (
        <View style={[estilos.foto, estilos.fotoVazia]}>
          <Text style={tipografia.legenda}>Este pet ainda não tem foto</Text>
        </View>
      )}

      <Card>
        <Text style={tipografia.titulo}>{pet.nome}</Text>
        <Text style={tipografia.corpo}>{rotuloEspecie(pet.especie)}</Text>
        <Text style={tipografia.corpo}>Porte: {rotuloPorte(pet.porte)}</Text>
        <Text style={tipografia.corpo}>Idade: {pet.idadeMeses} meses</Text>
        <Text style={tipografia.corpo}>
          Passeio de hoje: {rotuloStatusPasseio(pet.statusPasseio)}
        </Text>
        <Text style={tipografia.legenda}>
          {pet.local
            ? `Último passeio: ${pet.local.latitude.toFixed(3)}, ${pet.local.longitude.toFixed(3)} (±${Math.round(pet.local.precisaoMetros)}m)`
            : 'Nenhum passeio registrado com localização ainda.'}
        </Text>
      </Card>

      <WalkTimer petId={pet.id} onSessaoSalva={recarregarHistorico} />

      <Card>
        <Text style={estilos.rotuloSecao}>Histórico local de passeios</Text>

        {carregandoHistorico ? (
          <Text style={tipografia.legenda}>Carregando histórico...</Text>
        ) : historicoErro !== '' ? (
          <Text style={estilos.erro}>{historicoErro}</Text>
        ) : historico.length === 0 ? (
          <Text style={tipografia.legenda}>
            Nenhuma sessão cronometrada ainda. Inicie o cronômetro e salve ao voltar do passeio.
          </Text>
        ) : (
          historico.map((log) => (
            <View key={log.id} style={estilos.linhaHistorico}>
              <Text style={tipografia.corpo}>{formatarDuracao(log.seconds)}</Text>
              <Text style={tipografia.legenda}>{formatarData(log.createdAt)}</Text>
            </View>
          ))
        )}
      </Card>

      {aviso !== '' && <Text style={estilos.aviso}>{aviso}</Text>}

      <Pressable
        onPress={() => void togglePasseio(pet.id)}
        accessibilityRole="button"
        style={({ pressed }) => [estilos.botaoAcao, pressed && estilos.pressionado]}
      >
        <Text style={estilos.textoBotao}>
          {pet.statusPasseio === 'concluido' ? 'Reabrir passeio' : 'Marcar passeio como concluído'}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => setRegistrando(true)}
        accessibilityRole="button"
        style={({ pressed }) => [estilos.botaoAcao, pressed && estilos.pressionado]}
      >
        <Text style={estilos.textoBotao}>Registrar passeio com GPS e foto</Text>
      </Pressable>

      <Pressable
        onPress={() => void lembrarPasseio()}
        disabled={agendando}
        accessibilityRole="button"
        accessibilityState={{ disabled: agendando }}
        style={({ pressed }) => [
          estilos.botaoAcao,
          agendando && estilos.botaoDesabilitado,
          pressed && estilos.pressionado,
        ]}
      >
        <Text style={estilos.textoBotao}>
          {agendando ? 'Agendando...' : 'Lembrar do passeio em 5s'}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.push({ pathname: '/foto-do-pet', params: { petId: pet.id } })}
        accessibilityRole="button"
        style={({ pressed }) => [estilos.botaoNeutro, pressed && estilos.pressionado]}
      >
        <Text style={estilos.textoBotao}>Trocar foto</Text>
      </Pressable>

      <Pressable
        onPress={excluir}
        accessibilityRole="button"
        style={({ pressed }) => [estilos.botaoExcluir, pressed && estilos.pressionado]}
      >
        <Text style={estilos.textoBotao}>Excluir pet</Text>
      </Pressable>
    </ScrollView>
  );
}

// Created by AI.
function rotuloPorte(porte: PortePet): string {
  switch (porte) {
    case 'pequeno':
      return 'Pequeno';
    case 'medio':
      return 'Médio';
    case 'grande':
      return 'Grande';
  }
}

// Created by AI.
function formatarData(iso: string): string {
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return iso;
  return data.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

// Created by AI.
function criarEstilos(cores: PaletaCores, tipografia: TipografiaTema) {
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
      borderRadius: espaco.sm,
    },
    fotoVazia: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: cores.cartao,
      borderWidth: 1,
      borderColor: cores.textoFraco,
    },
    aviso: {
      ...tipografia.corpo,
      color: cores.sucesso,
    },
    erro: {
      ...tipografia.corpo,
      color: cores.erro,
    },
    vazio: {
      ...tipografia.corpo,
      color: cores.texto,
      padding: espaco.md,
    },
    rotuloSecao: {
      ...tipografia.corpo,
      fontWeight: '600',
    },
    linhaHistorico: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    botaoAcao: {
      backgroundColor: cores.primaria,
      padding: espaco.md,
      borderRadius: espaco.sm,
      alignItems: 'center',
    },
    botaoNeutro: {
      backgroundColor: cores.textoFraco,
      padding: espaco.md,
      borderRadius: espaco.sm,
      alignItems: 'center',
    },
    botaoExcluir: {
      backgroundColor: cores.erro,
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
