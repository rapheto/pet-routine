// ============================================================
// Prática 2 — Formulário de cadastro/edição de Pet
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Dentro de um ScrollView, com padding no contentContainerStyle.
// Componentes permitidos: View, ScrollView, Text, TextInput,
//   Image, Button, Switch + StyleSheet.
//
// Restrições:
//   • Inputs controlados (value + onChangeText)
//   • Switch controlado (value + onValueChange)
//   • Button desabilitado quando o nome estiver vazio
//   • Pelo menos um estilo condicional (ex: borda vermelha no input vazio)
//   • Nenhuma cor ou espaçamento mágico — tudo vem do theme.ts
//   • Espaçamento entre irmãos com `gap`, não com `margin`
//
// Para testar: importe este componente em App.tsx temporariamente.
// ============================================================
import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

import { criarTipografia, espaco, paletaClara } from '../theme';

// Created by AI.
// Tela legada da Prática 2, fora da árvore de rotas do Expo Router.
// Como não é montada no app, mantém a paleta clara fixa — assim continua
// compilando sem exigir um provider de tema.
const cores = paletaClara;
const tipografia = criarTipografia(paletaClara);

// Updated by AI.
export default function PetForm() {
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [alertaVacina, setAlertaVacina] = useState(false);

  const nomeVazio = nome.trim() === '';

  return (
    <ScrollView
      style={styles.tela}
      // O padding fica em contentContainerStyle para acompanhar todo o conteúdo rolável.
      contentContainerStyle={styles.conteudo}
    >
      <Text style={styles.rotulo}>Nome do pet</Text>
      <TextInput style={[styles.input, nomeVazio && styles.inputInvalido]} placeholder="Ex: Rex" value={nome} onChangeText={setNome} />

      <Text style={styles.rotulo}>Raça</Text>
      <TextInput style={styles.input} placeholder="Ex: Golden Retriever" value={raca} onChangeText={setRaca} />

      <View style={styles.linha}>
        <Text style={styles.rotulo}>Alerta de vacina</Text>
        <Switch value={alertaVacina} onValueChange={setAlertaVacina} />
      </View>

      {/* O Button não aceita style — a View estilizada ao redor controla a aparência */}
      <View style={styles.areaBotao}>
        <Button title="Salvar" onPress={() => {}} disabled={nomeVazio} color={cores.primaria} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    padding: espaco.md,
    gap: espaco.md,
  },
  input: {
    borderWidth: 1,
    borderColor: cores.textoFraco,
    borderRadius: espaco.sm,
    padding: espaco.sm,
    fontSize: tipografia.corpo.fontSize,
  },
  inputInvalido: {
    borderColor: cores.erro,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rotulo: {
    ...tipografia.corpo,
  },
  areaBotao: {
    borderRadius: 8,
    overflow: 'hidden',
    // TODO P2.38: marginTop AQUI é legítima — é espaço extra em volta do grupo,
    //   não espaço entre irmãos. Use um token de espaco (ex: espaco.lg).
    marginTop: espaco.lg,
  },
});
