// Created by AI.
// Updated by AI.

// ============================================================
// Etapa 5 — Formulário de cadastro de pet (UI reformulada)
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Componente reutilizável (Regra 15: fora de `src/app/`).
// Controlado, com validação local e sem nenhum `any`.
// Reformulação: painel em formato de bottom sheet, campos do kit de
// UI e chips de seleção com estado selecionado acessível.
// ============================================================
import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import type { EspeciePet, NovoPet, PortePet } from '../types/pet';
import { rotuloEspecie, rotuloPorte } from '../types/pet';
import { useTheme } from '../context/theme-context';
import { espaco, type PaletaCores } from '../theme';
import { Button } from './botao';
import { Input } from './campo-texto';
import { Heading } from './heading';
import { HStack } from './hstack';
import { Text } from './texto';
import { VStack } from './vstack';

// Created by AI.
const ESPECIES: EspeciePet[] = ['cachorro', 'gato', 'ave', 'outro'];
// Created by AI.
const PORTES: PortePet[] = ['pequeno', 'medio', 'grande'];

// Created by AI.
type FormularioPetProps = {
  visivel: boolean;
  onFechar: () => void;
  onSalvar: (novo: NovoPet) => void;
};

// Created by AI.
type ChipProps = {
  rotulo: string;
  selecionado: boolean;
  aoSelecionar: () => void;
};

// Created by AI.
// Chip de seleção sempre preenchido: azul quando inativo e verde da
// marca quando selecionado. Antes o chip inativo era branco sobre o
// cartão branco e praticamente sumia.
function Chip({ rotulo, selecionado, aoSelecionar }: ChipProps) {
  const { cores } = useTheme();
  const estilos = useMemo(() => criarEstilosChip(cores), [cores]);
  const [pressionado, setPressionado] = useState(false);

  return (
    <Pressable
      onPress={aoSelecionar}
      onPressIn={() => setPressionado(true)}
      onPressOut={() => setPressionado(false)}
      accessibilityRole="button"
      accessibilityState={{ selected: selecionado }}
      className="min-h-[40px] items-center justify-center rounded-full border px-3.5 py-2"
      style={[
        estilos.chip,
        selecionado && estilos.chipSelecionado,
        pressionado && estilos.chipPressionado,
      ]}
    >
      <Text className="text-sm font-semibold" tom={selecionado ? 'sobrePrimaria' : 'sobreAzul'}>
        {rotulo}
      </Text>
    </Pressable>
  );
}

// Created by AI.
function criarEstilosChip(cores: PaletaCores) {
  return StyleSheet.create({
    chip: {
      borderColor: cores.azul,
      backgroundColor: cores.azul,
    },
    chipSelecionado: {
      borderColor: cores.primariaForte,
      backgroundColor: cores.primariaForte,
    },
    chipPressionado: {
      opacity: 0.78,
    },
  });
}

// Created by AI.
// Updated by AI.
export function FormularioPet({ visivel, onFechar, onSalvar }: FormularioPetProps) {
  const { cores } = useTheme();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState<EspeciePet>('cachorro');
  const [porte, setPorte] = useState<PortePet>('pequeno');
  const [idade, setIdade] = useState('');

  const nomeVazio = nome.trim() === '';
  const idadeNumero = Number(idade.trim());
  const idadeInvalida = idade.trim() !== '' && (!Number.isFinite(idadeNumero) || idadeNumero < 0);

  // Created by AI.
  function limpar() {
    setNome('');
    setEspecie('cachorro');
    setPorte('pequeno');
    setIdade('');
  }

  // Created by AI.
  function fechar() {
    limpar();
    onFechar();
  }

  // Created by AI.
  function salvar() {
    if (nomeVazio || idadeInvalida) return;
    onSalvar({
      nome: nome.trim(),
      especie,
      porte,
      idadeMeses: idade.trim() === '' ? 0 : Math.round(idadeNumero),
    });
    limpar();
  }

  return (
    <Modal visible={visivel} animationType="slide" transparent onRequestClose={fechar}>
      <View style={styles.fundo}>
        {/* Toque fora do painel fecha o formulário. Fica atrás do painel
            (irmão anterior), então não interfere nos controles internos. */}
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={fechar}
          accessibilityRole="button"
          accessibilityLabel="Fechar formulário"
        />
        <View style={styles.painel}>
          <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
            <VStack className="gap-1">
              <Heading nivel="pagina">Novo pet</Heading>
              <Text className="text-sm" tom="fraco">
                Preencha os dados para começar a acompanhar a rotina.
              </Text>
            </VStack>

            <Input
              rotulo="Nome"
              valor={nome}
              aoMudar={setNome}
              placeholder="Ex: Rex"
              autoCapitalize="words"
              invalido={nomeVazio && nome !== ''}
            />

            <VStack className="gap-2">
              <Text className="text-xs font-semibold uppercase" tom="fraco">
                Espécie
              </Text>
              <HStack className="flex-wrap gap-2">
                {ESPECIES.map((opcao) => (
                  <Chip
                    key={opcao}
                    rotulo={rotuloEspecie(opcao)}
                    selecionado={especie === opcao}
                    aoSelecionar={() => setEspecie(opcao)}
                  />
                ))}
              </HStack>
            </VStack>

            <VStack className="gap-2">
              <Text className="text-xs font-semibold uppercase" tom="fraco">
                Porte
              </Text>
              <HStack className="flex-wrap gap-2">
                {PORTES.map((opcao) => (
                  <Chip
                    key={opcao}
                    rotulo={rotuloPorte(opcao)}
                    selecionado={porte === opcao}
                    aoSelecionar={() => setPorte(opcao)}
                  />
                ))}
              </HStack>
            </VStack>

            <Input
              rotulo="Idade em meses"
              valor={idade}
              aoMudar={setIdade}
              placeholder="Ex: 24"
              tipoTeclado="number-pad"
              invalido={idadeInvalida}
            />
            {idadeInvalida && (
              <Text className="text-xs" tom="erro">
                Informe a idade em meses usando apenas números.
              </Text>
            )}

            <Button
              rotulo="Salvar pet"
              aoPressionar={salvar}
              desabilitado={nomeVazio || idadeInvalida}
            />
            <Button rotulo="Cancelar" variante="secundario" aoPressionar={fechar} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// Updated by AI.
function criarEstilos(cores: PaletaCores) {
  return StyleSheet.create({
    fundo: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: cores.sobreposicao,
    },
    painel: {
      maxHeight: '92%',
      borderTopLeftRadius: espaco.lg,
      borderTopRightRadius: espaco.lg,
      backgroundColor: cores.cartao,
    },
    conteudo: {
      padding: espaco.lg,
      gap: espaco.md,
    },
  });
}
