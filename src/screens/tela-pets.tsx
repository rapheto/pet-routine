// Created by AI.

// ============================================================
// Tela de lista de pets (aba "Meus Pets")
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Etapa 1: saiu de App.tsx e virou tela; a navegação é do Expo Router.
// Etapa 2: o estado vem da store global e o toque no card abre
// `/pet/[id]`. O cadastro rápido acontece em um modal.
// Etapa 3: as cores acompanham o tema Claro/Escuro (useTheme).
//
// Restrições:
//   • Nenhuma ScrollView envolvendo a lista
//   • Nenhuma mutação de estado — toda mudança cria array novo (na store)
//   • Agrupamento e filtro moram em src/lib/, não aqui
// ============================================================
import { useCallback, useMemo, useState } from 'react';
import { Pressable, SectionList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { NovoPet, Pet } from '../types/pet';
import { agrupar, filtrarPorNome, type Secao } from '../lib/agrupar';
import { usePetStore } from '../store/use-pet-store';
import { useTheme } from '../context/theme-context';
import { FormularioPet } from '../components/formulario-pet';
import { ItemPet } from '../components/item-pet';
import { ListaVazia } from '../components/lista-vazia';
import { espaco, type PaletaCores, type TipografiaTema } from '../theme';

// Created by AI.
export function TelaPets() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { cores, tipografia } = useTheme();
  const styles = useMemo(() => criarEstilos(cores, tipografia), [cores, tipografia]);

  const pets = usePetStore((estado) => estado.pets);
  const fetchPets = usePetStore((estado) => estado.fetchPets);
  const addPet = usePetStore((estado) => estado.addPet);
  const removePet = usePetStore((estado) => estado.removePet);

  const [busca, setBusca] = useState('');
  const [atualizando, setAtualizando] = useState(false);
  const [formularioAberto, setFormularioAberto] = useState(false);

  // Created by AI.
  const abrirDetalhe = useCallback(
    (id: string) => {
      router.push({ pathname: '/pet/[id]', params: { id } });
    },
    [router],
  );

  // Created by AI.
  const abrirFoto = useCallback(
    (id: string) => {
      router.push({ pathname: '/foto-do-pet', params: { petId: id } });
    },
    [router],
  );

  // Created by AI.
  const removerPet = useCallback(
    (id: string) => {
      void removePet(id);
    },
    [removePet],
  );

  async function recarregar() {
    setAtualizando(true);
    try {
      await fetchPets();
      setBusca('');
    } finally {
      setAtualizando(false);
    }
  }

  // Created by AI.
  function salvarPet(novo: NovoPet) {
    void addPet(novo);
    setFormularioAberto(false);
  }

  // Created by AI.
  const renderItem = useCallback(
    ({ item }: { item: Pet }) => (
      <ItemPet
        pet={item}
        onAbrir={abrirDetalhe}
        onRemover={removerPet}
        onEscolherFoto={abrirFoto}
      />
    ),
    [abrirDetalhe, removerPet, abrirFoto],
  );

  const secoes = agrupar(filtrarPorNome(pets, busca));

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
              placeholderTextColor={cores.textoFraco}
              style={styles.busca}
            />
            <Pressable
              onPress={() => setFormularioAberto(true)}
              accessibilityRole="button"
              style={({ pressed }) => [styles.botaoNovoPet, pressed && styles.pressionado]}
            >
              <Text style={styles.textoBotao}>Cadastrar pet</Text>
            </Pressable>
          </View>
        }
        contentContainerStyle={[styles.conteudo, { paddingBottom: insets.bottom + espaco.lg }]}
      />

      <FormularioPet
        visivel={formularioAberto}
        onFechar={() => setFormularioAberto(false)}
        onSalvar={salvarPet}
      />
    </View>
  );
}

// Created by AI.
function criarEstilos(cores: PaletaCores, tipografia: TipografiaTema) {
  return StyleSheet.create({
    tela: {
      flex: 1,
      backgroundColor: cores.fundo,
    },
    cabecalho: {
      paddingHorizontal: espaco.md,
      paddingBottom: espaco.sm,
      gap: espaco.sm,
    },
    conteudo: {
      gap: espaco.sm,
      paddingHorizontal: espaco.md,
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
      color: cores.texto,
    },
    botaoNovoPet: {
      backgroundColor: cores.primaria,
      padding: espaco.sm,
      borderRadius: espaco.sm,
      alignItems: 'center',
    },
    textoBotao: {
      color: cores.sobrePrimaria,
      fontWeight: 'bold',
    },
    pressionado: {
      opacity: 0.7,
    },
  });
}
