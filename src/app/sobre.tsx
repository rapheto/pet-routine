// Created by AI.

// ============================================================
// Etapa 1 — Rota estática institucional "/sobre"
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Tela sem estado e sem efeitos: só apresenta o app, a equipe, a
// versão instalada e um resumo da arquitetura.
// Etapa 3: as cores acompanham o tema Claro/Escuro.
// ============================================================
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

import { useTheme } from '../context/theme-context';
import { espaco, type PaletaCores, type TipografiaTema } from '../theme';

// Created by AI.
const INTEGRANTES = ['Raphael Miranda'];

// Created by AI.
const ARQUITETURA = [
  'Expo Router com rotas em arquivo em src/app/ (Regra 15: só rotas e layouts).',
  'Telas maiores isoladas em src/screens/ e componentes reutilizáveis em src/components/.',
  'Tokens de design em src/theme.ts — nenhum componente declara cor ou espaçamento mágico.',
  'Tema Claro/Escuro em src/context/ e histórico de passeios em expo-sqlite.',
  'Regras de domínio tipadas em src/types/pet.ts, sem any e sem mutação de estado.',
];

// Created by AI.
export default function RotaSobre() {
  const { cores, tipografia } = useTheme();
  const styles = useMemo(() => criarEstilos(cores, tipografia), [cores, tipografia]);

  // `expoConfig` já traz a versão do app.json sem precisar de rede.
  const versao = Constants.expoConfig?.version ?? 'desconhecida';

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <View style={styles.bloco}>
        <Text style={tipografia.titulo}>Pet Routine</Text>
        <Text style={tipografia.legenda}>Versão {versao}</Text>
      </View>

      <View style={styles.bloco}>
        <Text style={styles.secao}>O que este app faz</Text>
        <Text style={tipografia.corpo}>
          Organiza a rotina dos seus pets: cadastro, status do passeio do dia, registro do passeio
          com localização e foto, e histórico das sessões de passeio no próprio aparelho.
        </Text>
      </View>

      <View style={styles.bloco}>
        <Text style={styles.secao}>Integrantes do grupo</Text>
        {INTEGRANTES.map((integrante) => (
          <Text key={integrante} style={tipografia.corpo}>
            {integrante}
          </Text>
        ))}
        <Text style={tipografia.legenda}>Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School</Text>
      </View>

      <View style={styles.bloco}>
        <Text style={styles.secao}>Arquitetura, em resumo</Text>
        {ARQUITETURA.map((linha) => (
          <Text key={linha} style={tipografia.corpo}>
            • {linha}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
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
      gap: espaco.lg,
    },
    bloco: {
      gap: espaco.sm,
    },
    secao: {
      ...tipografia.corpo,
      color: cores.primaria,
      fontWeight: '600',
    },
  });
}
