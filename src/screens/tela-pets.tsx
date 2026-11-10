// Created by AI.

// ============================================================
// Etapa 1 — Tela de lista de pets (movida de App.tsx)
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Na Prática 3 esta tela vivia dentro de App.tsx e trocava de tela
// com um useState condicional. Agora ela é uma TELA de verdade e a
// navegação é assunto do Expo Router (Regra 17: `router.push` dentro
// de funções, `Link` no JSX).
//
// Restrições:
//   • Nenhuma ScrollView envolvendo a lista
//   • Nenhuma mutação de estado — toda mudança cria array novo
//   • Agrupamento e filtro moram em src/lib/, não aqui
// ============================================================
import { useCallback, useEffect, useState } from 'react';
import { SectionList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { Pet } from '../types/pet';
import { PETS } from '../data/pets';
import { agrupar, filtrarPorNome, type Secao } from '../lib/agrupar';
import { ItemPet } from '../components/item-pet';
import { ListaVazia } from '../components/lista-vazia';
import { TelaRegistro } from './tela-registro';
import { cores, espaco, tipografia } from '../theme';

// Created by AI.
export function TelaPets() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  // A rota `/foto-do-pet` devolve a foto escolhida por parâmetros de rota.
  // Isso é temporário: na Etapa 4 a store global assume essa responsabilidade.
  const { fotoPetId, fotoUri } = useLocalSearchParams<{
    fotoPetId?: string;
    fotoUri?: string;
  }>();

  const [pets, setPets] = useState<Pet[]>(PETS);
  const [busca, setBusca] = useState('');
  const [atualizando, setAtualizando] = useState(false);
  const [petRegistrando, setPetRegistrando] = useState<string | null>(null);

  // Created by AI.
  useEffect(() => {
    if (!fotoPetId || !fotoUri) return;
    setPets((anteriores) =>
      anteriores.map((pet) => (pet.id === fotoPetId ? { ...pet, fotoUri } : pet)),
    );
    // Limpa os parâmetros para a mesma foto não ser reaplicada a cada render.
    router.setParams({ fotoPetId: '', fotoUri: '' });
  }, [fotoPetId, fotoUri, router]);

  const alternarStatus = useCallback((id: string) => {
    setPets((anteriores) =>
      anteriores.map((pet) =>
        pet.id === id
          ? { ...pet, statusPasseio: pet.statusPasseio === 'concluido' ? 'pendente' : 'concluido' }
          : pet,
      ),
    );
  }, []);

  const removerPet = useCallback((id: string) => {
    setPets((anteriores) => anteriores.filter((pet) => pet.id !== id));
  }, []);

  // Created by AI.
  const abrirFoto = useCallback(
    (id: string) => {
      router.push({ pathname: '/foto-do-pet', params: { petId: id } });
    },
    [router],
  );

  async function recarregar() {
    setAtualizando(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setPets(PETS);
    setBusca('');
    setAtualizando(false);
  }

  function handleRegistro(local?: Pet['local'], foto?: string) {
    if (!petRegistrando) return;
    setPets((anteriores) =>
      anteriores.map((pet) =>
        pet.id === petRegistrando ? { ...pet, statusPasseio: 'concluido', local, fotoUri: foto } : pet,
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
        onEscolherFoto={abrirFoto}
      />
    ),
    [alternarStatus, removerPet, abrirFoto],
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
        contentContainerStyle={[styles.conteudo, { paddingBottom: insets.bottom + espaco.lg }]}
      />
    </View>
  );
}

// Created by AI.
const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  cabecalho: {
    paddingHorizontal: espaco.md,
    paddingBottom: espaco.sm,
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
  },
});
