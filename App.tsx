// Declaração: este arquivo foi desenvolvido com apoio de IA e revisado por mim.

// ============================================================
// Prática 3 — Tela principal: lista de pets + registro de passeio
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Na Prática 2 esta tela mostrava um pet em destaque.
// Agora mostra uma lista de verdade com SectionList, toque
// interativo e registro de passeio com sensores.
//
// Restrições:
//   • Nenhuma ScrollView envolvendo a lista
//   • Nenhuma mutação de estado — toda mudança cria array novo
//   • Agrupamento e filtro moram em src/lib/, não aqui
//   • Sem useEffect para sensores (cleanup é assunto da Aula 6)
// ============================================================
import { useCallback, useState } from 'react';
import { SectionList, StyleSheet, Text, TextInput, View } from 'react-native';

import type { Pet } from './src/types/pet';
import { PETS } from './src/data/pets';
import { agrupar, filtrarPorNome, type Secao } from './src/lib/agrupar';
import { ItemPet } from './src/components/item-pet';
import { ListaVazia } from './src/components/lista-vazia';
import { TelaRegistro } from './src/screens/tela-registro';
import { cores, espaco, tipografia } from './src/theme';

// Updated by AI.
export default function App() {
  const [pets, setPets] = useState<Pet[]>(PETS);
  const [busca, setBusca] = useState('');
  const [atualizando, setAtualizando] = useState(false);
  const [petRegistrando, setPetRegistrando] = useState<string | null>(null);

  // Updated by AI.
  const alternarStatus = useCallback((id: string) => {
    setPets((anteriores) =>
      anteriores.map((pet) =>
        pet.id === id
          ? { ...pet, statusPasseio: pet.statusPasseio === 'concluido' ? 'pendente' : 'concluido' }
          : pet,
      ),
    );
  }, []);

  // Updated by AI.
  const removerPet = useCallback((id: string) => {
    setPets((anteriores) => anteriores.filter((pet) => pet.id !== id));
  }, []);

  async function recarregar() {
    setAtualizando(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setPets(PETS);
    setBusca('');
    setAtualizando(false);
  }

  function handleRegistro(local?: Pet['local'], fotoUri?: string) {
    if (!petRegistrando) return;
    setPets((anteriores) =>
      anteriores.map((pet) =>
        pet.id === petRegistrando ? { ...pet, statusPasseio: 'concluido', local, fotoUri } : pet,
      ),
    );
    setPetRegistrando(null);
  }

  // Created by AI.
  const renderItem = useCallback(
    ({ item }: { item: Pet }) => (
      <ItemPet
        pet={item}
        onAlternar={alternarStatus}
        onRemover={removerPet}
        onRegistrar={setPetRegistrando}
      />
    ),
    [alternarStatus, removerPet],
  );

  const petAlvo = pets.find((pet) => pet.id === petRegistrando);
  if (petAlvo) {
    return (
      <TelaRegistro
        pet={petAlvo}
        onSalvar={handleRegistro}
        onCancelar={() => setPetRegistrando(null)}
      />
    );
  }

  const secoes = agrupar(filtrarPorNome(pets, busca));
  //   Explique no README por que filtrar antes de agrupar.

  return (
    <View style={styles.tela}>
      <SectionList<Pet, Secao>
        sections={secoes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section }) => (
          <Text style={styles.cabecalhoSecao}>{section.title}</Text>
        )}
        stickySectionHeadersEnabled
        ListEmptyComponent={<ListaVazia termoBusca={busca} temPets={pets.length > 0} />}
        refreshing={atualizando}
        onRefresh={recarregar}
        ListHeaderComponent={
          <View style={styles.cabecalho}>
            <TextInput
              value={busca}
              onChangeText={setBusca}
              placeholder="Buscar pet por nome..."
              style={styles.busca}
            />
          </View>
        }
        contentContainerStyle={styles.conteudo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    paddingTop: 48,
    backgroundColor: cores.fundo,
  },
  cabecalho: {
    paddingHorizontal: espaco.md,
    paddingBottom: espaco.sm,
  },
  conteudo: {
    gap: espaco.sm,
    paddingHorizontal: espaco.md,
    paddingBottom: espaco.lg,
  },
  cabecalhoSecao: {
    ...tipografia.titulo,
    backgroundColor: cores.fundo,
    paddingVertical: espaco.sm,
    paddingHorizontal: espaco.md,
  },
  busca: {
    borderWidth: 1,
    borderColor: cores.textoFraco,
    borderRadius: espaco.sm,
    padding: espaco.sm,
    fontSize: tipografia.corpo.fontSize,
    backgroundColor: cores.cartao,
  },
});
