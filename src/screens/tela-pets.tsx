// Created by AI.
// Updated by AI.

// ============================================================
// Etapa 5 — Tela "Meus Pets" (UI reformulada)
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Reformulação: cabeçalho com título e contagem, busca com campo do
// kit de UI, CTA de cadastro e cabeçalhos de seção com badge de
// quantidade. Estados de carregamento, erro e vazio são distintos.
//
// Restrições:
//   • Nenhuma ScrollView envolvendo a lista
//   • Nenhuma mutação de estado — toda mudança cria array novo (na store)
//   • Agrupamento e filtro moram em src/lib/, não aqui
// ============================================================
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, SectionList, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { NovoPet, Pet } from '../types/pet';
import { agrupar, filtrarPorNome, type Secao } from '../lib/agrupar';
import { usePetStore } from '../store/use-pet-store';
import { useTheme } from '../context/theme-context';
import { Badge } from '../components/badge';
import { Button } from '../components/botao';
import { Card } from '../components/card';
import { Input } from '../components/campo-texto';
import { FormularioPet } from '../components/formulario-pet';
import { Heading } from '../components/heading';
import { HStack } from '../components/hstack';
import { ItemPet } from '../components/item-pet';
import { ListaVazia } from '../components/lista-vazia';
import { Text } from '../components/texto';
import { VStack } from '../components/vstack';
import { espaco, type PaletaCores } from '../theme';

// Created by AI.
// Updated by AI.
export function TelaPets() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { cores } = useTheme();
  const estilos = useMemo(() => criarEstilos(cores), [cores]);

  const pets = usePetStore((estado) => estado.pets);
  const fetchPets = usePetStore((estado) => estado.fetchPets);
  const addPet = usePetStore((estado) => estado.addPet);
  const removePet = usePetStore((estado) => estado.removePet);
  const erro = usePetStore((estado) => estado.error);
  const isLoading = usePetStore((estado) => estado.isLoading);

  const [busca, setBusca] = useState('');
  const [atualizando, setAtualizando] = useState(false);
  const [formularioAberto, setFormularioAberto] = useState(false);

  // Etapa 4: a lista nasce do backend. O efeito roda uma vez ao montar
  // a aba (já autenticada pelo Auth Guard).
  // Created by AI.
  useEffect(() => {
    void fetchPets();
  }, [fetchPets]);

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
  // Updated by AI.
  const removerPet = useCallback(
    (id: string) => {
      const pet = pets.find((item) => item.id === id);
      if (!pet) return;

      Alert.alert(
        'Excluir pet',
        `Tem certeza de que deseja excluir ${pet.nome}? Esta ação não pode ser desfeita.`,
        [
          { text: 'Não', style: 'cancel' },
          {
            text: 'Sim',
            style: 'destructive',
            onPress: () => {
              void removePet(id);
            },
          },
        ],
      );
    },
    [pets, removePet],
  );

  // Created by AI.
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

  // Created by AI.
  // Updated by AI.
  const renderCabecalhoSecao = useCallback(
    ({ section }: { section: Secao }) => (
      <HStack className="justify-between px-4 py-2.5" style={estilos.cabecalhoSecao}>
        <Heading nivel="secao">{section.title}</Heading>
        <Badge texto={String(section.data.length)} tom="azul" />
      </HStack>
    ),
    [estilos.cabecalhoSecao],
  );

  const secoes = agrupar(filtrarPorNome(pets, busca));
  const carregandoInicial = isLoading && pets.length === 0;

  return (
    <View className="flex-1" style={[estilos.tela, { paddingTop: insets.top }]}>
      {erro !== null && (
        <VStack className="px-4 pt-3">
          <Card className="border-2" style={estilos.cartaoErro}>
            <HStack className="justify-between gap-3">
              <Text className="flex-1 text-sm" tom="sobreRosa">
                {erro}
              </Text>
              <Button
                rotulo="Tentar"
                variante="fantasma"
                aoPressionar={() => void fetchPets()}
                compacto
              />
            </HStack>
          </Card>
        </VStack>
      )}

      {carregandoInicial ? (
        <VStack className="flex-1 items-center justify-center gap-3">
          <ActivityIndicator size="large" color={cores.primaria} />
          <Text className="text-base" tom="fraco">
            Carregando seus pets...
          </Text>
        </VStack>
      ) : (
        <SectionList<Pet, Secao>
          sections={secoes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={renderCabecalhoSecao}
          stickySectionHeadersEnabled
          ListEmptyComponent={
            <ListaVazia
              termoBusca={busca}
              temPets={pets.length > 0}
              aoCadastrar={() => setFormularioAberto(true)}
            />
          }
          refreshing={atualizando}
          onRefresh={recarregar}
          ListHeaderComponent={
            <VStack className="gap-3 px-4 pb-2">
              <VStack className="gap-1">
                <Heading nivel="pagina">Meus Pets</Heading>
                <Text className="text-sm" tom="fraco">
                  {pets.length === 0
                    ? 'Sua rotina pet começa aqui.'
                    : `${pets.length} ${pets.length === 1 ? 'pet cadastrado' : 'pets cadastrados'} · ${secoes.length} ${secoes.length === 1 ? 'grupo' : 'grupos'} de status`}
                </Text>
              </VStack>

              <Input
                valor={busca}
                aoMudar={setBusca}
                placeholder="Buscar pet por nome..."
                autoCapitalize="words"
              />

              <Button
                rotulo="Cadastrar pet"
                aoPressionar={() => setFormularioAberto(true)}
                rotuloAcessivel="Cadastrar um novo pet"
              />
            </VStack>
          }
          contentContainerStyle={[estilos.conteudo, { paddingBottom: insets.bottom + espaco.lg }]}
        />
      )}

      <FormularioPet
        visivel={formularioAberto}
        onFechar={() => setFormularioAberto(false)}
        onSalvar={salvarPet}
      />
    </View>
  );
}

// Updated by AI.
function criarEstilos(cores: PaletaCores) {
  return StyleSheet.create({
    tela: {
      backgroundColor: cores.fundo,
    },
    conteudo: {
      gap: espaco.sm,
      paddingTop: espaco.sm,
    },
    cabecalhoSecao: {
      backgroundColor: cores.fundo,
      borderBottomWidth: 1,
      borderBottomColor: cores.borda,
    },
    cartaoErro: {
      borderColor: cores.erro,
      backgroundColor: cores.rosa,
    },
  });
}
