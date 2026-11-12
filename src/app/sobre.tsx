// Created by AI.
// Updated by AI.

// ============================================================
// Etapa 1/5 — Rota estática institucional "/sobre" (UI reformulada)
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Tela sem estado e sem efeitos: só apresenta o app, a equipe, a
// versão instalada e um resumo da arquitetura.
// ============================================================
import { useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { useTheme } from '../context/theme-context';
import { Badge } from '../components/badge';
import { Card } from '../components/card';
import { Heading } from '../components/heading';
import { HStack } from '../components/hstack';
import { Text } from '../components/texto';
import { VStack } from '../components/vstack';
import { espaco, type PaletaCores } from '../theme';

// Created by AI.
const INTEGRANTES = ['Raphael Miranda'];

// Created by AI.
const ARQUITETURA = [
  'Expo Router com rotas em arquivo em src/app/ (Regra 15: só rotas e layouts).',
  'Telas maiores isoladas em src/screens/ e componentes reutilizáveis em src/components/.',
  'Tokens de design em src/theme.ts — nenhum componente declara cor ou espaçamento mágico.',
  'Tema Claro/Escuro em src/context/ e histórico de passeios em expo-sqlite.',
  'UI com NativeWind + componentes no estilo GlueStack e controles nativos do @expo/ui.',
];

// Created by AI.
export default function RotaSobre() {
  const { cores } = useTheme();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  // `expoConfig` já traz a versão do app.json sem precisar de rede.
  const versao = Constants.expoConfig?.version ?? 'desconhecida';

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <VStack className="gap-1">
        <Heading nivel="destaque">🐾 Pet Routine</Heading>
        <HStack className="gap-2">
          <Badge texto={`Versão ${versao}`} tom="primaria" />
          <Badge texto="Expo + Router" />
        </HStack>
      </VStack>

      <Card>
        <Heading nivel="secao">O que este app faz</Heading>
        <Text className="text-sm">
          Organiza a rotina dos seus pets: cadastro, status do passeio do dia, registro do passeio
          com localização e foto, e histórico das sessões de passeio no próprio aparelho.
        </Text>
      </Card>

      <Card>
        <Heading nivel="secao">Integrantes do grupo</Heading>
        {INTEGRANTES.map((integrante) => (
          <Text key={integrante} className="text-sm">
            {integrante}
          </Text>
        ))}
        <Text className="text-xs" tom="fraco">
          Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
        </Text>
      </Card>

      <Card>
        <Heading nivel="secao">Arquitetura, em resumo</Heading>
        {ARQUITETURA.map((linha) => (
          <Text key={linha} className="text-sm" tom="fraco">
            • {linha}
          </Text>
        ))}
      </Card>
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
      gap: espaco.lg,
    },
  });
}
