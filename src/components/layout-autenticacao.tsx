// Created by AI.

// ============================================================
// Etapa 4 — Layout compartilhado das telas de autenticação
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Centraliza título, subtítulo, mensagem de erro e rodapé das telas
// públicas de Login e Cadastro, mantendo as duas visualmente coesas.
// Regra 15: componente reutilizável fora de src/app/.
// ============================================================
import { useMemo, type ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../context/theme-context';
import { espaco, type PaletaCores, type TipografiaTema } from '../theme';

// Created by AI.
type LayoutAutenticacaoProps = {
  titulo: string;
  subtitulo: string;
  erro?: string;
  children: ReactNode;
  rodape: ReactNode;
};

// Created by AI.
export function LayoutAutenticacao({
  titulo,
  subtitulo,
  erro = '',
  children,
  rodape,
}: LayoutAutenticacaoProps) {
  const { cores, tipografia } = useTheme();
  const styles = useMemo(() => criarEstilos(cores, tipografia), [cores, tipografia]);

  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.cabecalho}>
        <Text style={styles.marca}>🐾 Pet Routine</Text>
        <Text style={tipografia.titulo}>{titulo}</Text>
        <Text style={tipografia.legenda}>{subtitulo}</Text>
      </View>

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      {children}

      <View style={styles.rodape}>{rodape}</View>
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
      flexGrow: 1,
      justifyContent: 'center',
      padding: espaco.lg,
      gap: espaco.md,
    },
    cabecalho: {
      gap: espaco.xs,
    },
    marca: {
      ...tipografia.legenda,
      color: cores.primaria,
      fontWeight: '700',
    },
    erro: {
      ...tipografia.corpo,
      color: cores.erro,
    },
    rodape: {
      alignItems: 'center',
      gap: espaco.sm,
    },
  });
}
