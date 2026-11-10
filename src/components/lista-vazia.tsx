// ============================================================
// Prática 3 — Estado vazio da lista
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Toda lista tem ListEmptyComponent. Sem exceção.
// E o texto do estado vazio precisa AJUDAR o usuário:
//   - primeiro acesso → o que ele pode fazer
//   - busca sem resultado → o que ele pode tentar
//
// Etapa 3: as cores acompanham o tema Claro/Escuro.
// ============================================================
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../context/theme-context';
import { espaco, type PaletaCores, type TipografiaTema } from '../theme';

type ListaVaziaProps = {
  // TODO P3.12: uma prop que permita distinguir "primeiro acesso" de "busca sem resultado".
  termoBusca?: string;
};

// Updated by AI.
export function ListaVazia({ termoBusca = '', temPets = false }: ListaVaziaProps) {
  const { cores, tipografia } = useTheme();
  const styles = useMemo(() => criarEstilos(cores, tipografia), [cores, tipografia]);

  const termo = termoBusca.trim();
  let texto: string;
  if (!temPets) {
    texto = 'Nenhum pet cadastrado. Que tal adicionar um?';
  } else if (termo) {
    texto = `Nenhum pet encontrado para "${termo}".`;
  } else {
    texto = 'Nenhum pet para exibir no momento.';
  }
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        {texto}
      </Text>
    </View>
  );
}

// Created by AI.
function criarEstilos(cores: PaletaCores, tipografia: TipografiaTema) {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      padding: espaco.xl,
    },
    texto: {
      ...tipografia.corpo,
      color: cores.textoFraco,
      textAlign: 'center',
    },
  });
}
