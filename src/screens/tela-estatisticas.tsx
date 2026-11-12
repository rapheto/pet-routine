// Created by AI.
// Updated by AI.

// ============================================================
// Etapa 5 — Tela de Estatísticas (UI reformulada)
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Reformulação: métricas em grade 2×2, barra de progresso do dia,
// controles nativos (@expo/ui) e verificação de atualização OTA.
//
// Contadores calculados em tempo real a partir da store global.
// Conta, tema, "Sobre" e logout passaram para a aba Configurações.
// ============================================================
import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { usePetStore } from '../store/use-pet-store';
import { useAuthStore } from '../store/use-auth-store';
import { useTheme } from '../context/theme-context';
import { Card } from '../components/card';
import { Heading } from '../components/heading';
import { HStack } from '../components/hstack';
import { OtaStatusCard } from '../components/ota-status-card';
import { Text } from '../components/texto';
import { VStack } from '../components/vstack';
import { espaco, type PaletaCores } from '../theme';

// Created by AI.
// Updated by AI.
type TomMetrica = 'azul' | 'verde' | 'ambar' | 'rosa';

// Created by AI.
// Updated by AI.
type MetricaProps = {
  rotulo: string;
  valor: string;
  tom: TomMetrica;
};

// Created by AI.
// Updated by AI.
// Cada métrica usa um pastel da paleta e o tom escuro correspondente,
// então o número (concluídos, pendentes…) fica legível e colorido sem
// sair da identidade visual.
const ESTILO_DO_TOM: Record<
  TomMetrica,
  { fundo: keyof PaletaCores; texto: 'sobreAzul' | 'sobreVerde' | 'sobreAmbar' | 'sobreRosa' }
> = {
  azul: { fundo: 'azul', texto: 'sobreAzul' },
  verde: { fundo: 'verde', texto: 'sobreVerde' },
  ambar: { fundo: 'ambar', texto: 'sobreAmbar' },
  rosa: { fundo: 'rosa', texto: 'sobreRosa' },
};

// Created by AI.
// Updated by AI.
function Metrica({ rotulo, valor, tom }: MetricaProps) {
  const { cores } = useTheme();
  const receita = ESTILO_DO_TOM[tom];

  return (
    <VStack
      className="flex-1 items-center gap-1 rounded-xl py-3"
      style={{ backgroundColor: cores[receita.fundo] }}
    >
      <Text className="text-2xl font-bold" tom={receita.texto}>
        {valor}
      </Text>
      <Text className="text-xs font-semibold" tom={receita.texto}>
        {rotulo}
      </Text>
    </VStack>
  );
}

// Created by AI.
// Updated by AI.
export function TelaEstatisticas() {
  const insets = useSafeAreaInsets();
  const pets = usePetStore((estado) => estado.pets);
  const user = useAuthStore((estado) => estado.user);
  const { cores } = useTheme();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  const total = pets.length;
  const concluidos = pets.filter((pet) => pet.statusPasseio === 'concluido').length;
  const pendentes = pets.filter((pet) => pet.statusPasseio === 'pendente').length;
  const cancelados = pets.filter((pet) => pet.statusPasseio === 'cancelado').length;

  // O status do passeio representa o passeio de hoje: por isso a
  // porcentagem concluída é a fração dos pets já passeados hoje.
  const percentualConcluido = total === 0 ? 0 : Math.round((concluidos / total) * 100);

  return (
    <ScrollView
      style={[styles.tela, { paddingTop: insets.top }]}
      contentContainerStyle={styles.conteudo}
    >
      <VStack className="gap-1">
        <Heading nivel="pagina">Estatísticas</Heading>
        <Text className="text-sm" tom="fraco">
          Olá, {user?.name ?? 'tutor'}! Acompanhe a rotina dos seus pets.
        </Text>
      </VStack>

      <Card>
        <Heading nivel="secao">Resumo da rotina</Heading>
        <HStack className="gap-2">
          <Metrica rotulo="Pets" valor={String(total)} tom="azul" />
          <Metrica rotulo="Concluídos" valor={String(concluidos)} tom="verde" />
        </HStack>
        <HStack className="gap-2">
          <Metrica rotulo="Pendentes" valor={String(pendentes)} tom="ambar" />
          <Metrica rotulo="Cancelados" valor={String(cancelados)} tom="rosa" />
        </HStack>
      </Card>

      <Card destacado>
        <Text className="text-sm font-semibold">Passeios concluídos hoje</Text>
        <HStack className="gap-2">
          <Text className="text-4xl font-bold" tom="sucesso">
            {percentualConcluido}%
          </Text>
          <Text className="text-xs" tom="fraco">
            {concluidos} de {total} {total === 1 ? 'pet' : 'pets'}
          </Text>
        </HStack>

        <HStack className="h-3 w-full overflow-hidden rounded-full" style={styles.trilhaProgresso}>
          <View style={[styles.preenchimentoProgresso, { flex: percentualConcluido }]} />
          <View style={{ flex: 100 - percentualConcluido }} />
        </HStack>
      </Card>

      <OtaStatusCard />
    </ScrollView>
  );
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
      paddingBottom: espaco.xl,
      gap: espaco.md,
    },
    trilhaProgresso: {
      backgroundColor: cores.destaqueSuave,
    },
    preenchimentoProgresso: {
      height: '100%',
      backgroundColor: cores.sucesso,
    },
  });
}
