// Declaração: este arquivo foi desenvolvido com apoio de IA e revisado por mim.

// ============================================================
// Prática 3 — Estado vazio da lista
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Toda lista tem ListEmptyComponent. Sem exceção.
// E o texto do estado vazio precisa AJUDAR o usuário:
//   - primeiro acesso → o que ele pode fazer
//   - busca sem resultado → o que ele pode tentar
// ============================================================
import { StyleSheet, Text, View } from 'react-native';

import { cores, espaco, tipografia } from '../theme';

// Updated by AI.
type ListaVaziaProps = {
  termoBusca?: string;
  temPets?: boolean;
};

// Updated by AI.
export function ListaVazia({ termoBusca = '', temPets = false }: ListaVaziaProps) {
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
      <Text style={styles.texto}>{texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
