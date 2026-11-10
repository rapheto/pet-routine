// Created by AI.

// ============================================================
// Etapa 2 — Formulário de cadastro de pet em modal
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Componente reutilizável (Regra 15: fora de `src/app/`).
// Controlado, com validação local e sem nenhum `any`.
// O espaçamento entre irmãos vem de `gap`, nunca de `margin`.
//
// Etapa 3: as cores acompanham o tema Claro/Escuro.
// ============================================================
import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import type { EspeciePet, NovoPet, PortePet } from '../types/pet';
import { rotuloEspecie } from '../types/pet';
import { useTheme } from '../context/theme-context';
import { espaco, type PaletaCores, type TipografiaTema } from '../theme';

// Created by AI.
const ESPECIES: EspeciePet[] = ['cachorro', 'gato', 'ave', 'outro'];
// Created by AI.
const PORTES: PortePet[] = ['pequeno', 'medio', 'grande'];
// Created by AI.
const ROTULOS_PORTE: Record<PortePet, string> = {
  pequeno: 'Pequeno',
  medio: 'Médio',
  grande: 'Grande',
};

// Created by AI.
type FormularioPetProps = {
  visivel: boolean;
  onFechar: () => void;
  onSalvar: (novo: NovoPet) => void;
};

// Created by AI.
export function FormularioPet({ visivel, onFechar, onSalvar }: FormularioPetProps) {
  const { cores, tipografia } = useTheme();
  const styles = useMemo(() => criarEstilos(cores, tipografia), [cores, tipografia]);

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

  function fechar() {
    limpar();
    onFechar();
  }

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
        <View style={styles.painel}>
          <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
            <Text style={tipografia.titulo}>Novo pet</Text>

            <Text style={styles.rotulo}>Nome</Text>
            <TextInput
              value={nome}
              onChangeText={setNome}
              placeholder="Ex: Rex"
              style={[styles.input, nomeVazio && styles.inputInvalido]}
            />

            <Text style={styles.rotulo}>Espécie</Text>
            <View style={styles.opcoes}>
              {ESPECIES.map((opcao) => (
                <Pressable
                  key={opcao}
                  onPress={() => setEspecie(opcao)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: especie === opcao }}
                  style={({ pressed }) => [
                    styles.chip,
                    especie === opcao && styles.chipSelecionado,
                    pressed && styles.pressionado,
                  ]}
                >
                  <Text style={[styles.textoChip, especie === opcao && styles.textoChipSelecionado]}>
                    {rotuloEspecie(opcao)}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.rotulo}>Porte</Text>
            <View style={styles.opcoes}>
              {PORTES.map((opcao) => (
                <Pressable
                  key={opcao}
                  onPress={() => setPorte(opcao)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: porte === opcao }}
                  style={({ pressed }) => [
                    styles.chip,
                    porte === opcao && styles.chipSelecionado,
                    pressed && styles.pressionado,
                  ]}
                >
                  <Text style={[styles.textoChip, porte === opcao && styles.textoChipSelecionado]}>
                    {ROTULOS_PORTE[opcao]}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.rotulo}>Idade em meses</Text>
            <TextInput
              value={idade}
              onChangeText={setIdade}
              placeholder="Ex: 24"
              keyboardType="number-pad"
              style={[styles.input, idadeInvalida && styles.inputInvalido]}
            />
            {idadeInvalida && (
              <Text style={styles.erro}>Informe a idade em meses usando apenas números.</Text>
            )}

            <Pressable
              onPress={salvar}
              disabled={nomeVazio || idadeInvalida}
              accessibilityRole="button"
              accessibilityState={{ disabled: nomeVazio || idadeInvalida }}
              style={({ pressed }) => [
                styles.botaoSalvar,
                (nomeVazio || idadeInvalida) && styles.botaoDesabilitado,
                pressed && styles.pressionado,
              ]}
            >
              <Text style={styles.textoBotao}>Salvar pet</Text>
            </Pressable>

            <Pressable
              onPress={fechar}
              accessibilityRole="button"
              style={({ pressed }) => [styles.botaoCancelar, pressed && styles.pressionado]}
            >
              <Text style={styles.textoBotao}>Cancelar</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// Created by AI.
// Updated by AI.
function criarEstilos(cores: PaletaCores, tipografia: TipografiaTema) {
  return StyleSheet.create({
    fundo: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: cores.sobreposicao,
    },
    painel: {
      maxHeight: '90%',
      borderTopLeftRadius: espaco.md,
      borderTopRightRadius: espaco.md,
      backgroundColor: cores.cartao,
    },
    conteudo: {
      padding: espaco.md,
      gap: espaco.sm,
    },
    rotulo: {
      ...tipografia.corpo,
      fontWeight: '600',
    },
    input: {
      borderWidth: 1,
      borderColor: cores.textoFraco,
      borderRadius: espaco.sm,
      padding: espaco.sm,
      fontSize: tipografia.corpo.fontSize,
      backgroundColor: cores.cartao,
      color: cores.texto,
    },
    inputInvalido: {
      borderColor: cores.erro,
    },
    erro: {
      ...tipografia.legenda,
      color: cores.erro,
    },
    opcoes: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: espaco.sm,
    },
    chip: {
      borderWidth: 1,
      borderColor: cores.textoFraco,
      borderRadius: espaco.sm,
      paddingVertical: espaco.xs,
      paddingHorizontal: espaco.sm,
    },
    chipSelecionado: {
      borderColor: cores.primaria,
      backgroundColor: cores.destaqueSuave,
    },
    textoChip: {
      ...tipografia.legenda,
      color: cores.texto,
    },
    textoChipSelecionado: {
      color: cores.primaria,
      fontWeight: '600',
    },
    botaoSalvar: {
      backgroundColor: cores.primaria,
      padding: espaco.md,
      borderRadius: espaco.sm,
      alignItems: 'center',
    },
    botaoCancelar: {
      backgroundColor: cores.textoFraco,
      padding: espaco.md,
      borderRadius: espaco.sm,
      alignItems: 'center',
    },
    botaoDesabilitado: {
      opacity: 0.4,
    },
    pressionado: {
      opacity: 0.7,
    },
    textoBotao: {
      color: cores.sobrePrimaria,
      fontWeight: 'bold',
    },
  });
}
