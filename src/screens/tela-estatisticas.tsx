// Created by AI.

// ============================================================
// Etapa 2 — Tela de Estatísticas e Perfil
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Contadores calculados em tempo real a partir da store global.
//
// Etapa 3: a tela consome o contexto de tema, aplica as cores no modo
// claro/escuro e oferece o controle que alterna a preferência (que é
// persistida no AsyncStorage pelo ThemeProvider).
// ============================================================
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { Link } from 'expo-router';

import { usePetStore } from '../store/use-pet-store';
import { useTheme } from '../context/theme-context';
import { Card } from '../components/card';
import { espaco, type PaletaCores, type TipografiaTema } from '../theme';

// Created by AI.
type MetricaProps = {
  rotulo: string;
  valor: string;
};

// Created by AI.
type Estilos = ReturnType<typeof criarEstilos>;

// Created by AI.
function Metrica({ rotulo, valor, styles }: MetricaProps & { styles: Estilos }) {
  const { tipografia } = useTheme();

  return (
    <View style={styles.metrica}>
      <Text style={styles.valorMetrica}>{valor}</Text>
      <Text style={tipografia.legenda}>{rotulo}</Text>
    </View>
  );
}

// Created by AI.
export function TelaEstatisticas() {
  const pets = usePetStore((estado) => estado.pets);
  const { tema, cores, tipografia, alternarTema } = useTheme();
  const styles: Estilos = useMemo(() => criarEstilos(cores, tipografia), [cores, tipografia]);

  const total = pets.length;
  const concluidos = pets.filter((pet) => pet.statusPasseio === 'concluido').length;
  const pendentes = pets.filter((pet) => pet.statusPasseio === 'pendente').length;
  const cancelados = pets.filter((pet) => pet.statusPasseio === 'cancelado').length;

  // O status do passeio representa o passeio de hoje: por isso a
  // porcentagem concluída é a fração dos pets já passeados hoje.
  const percentualConcluido = total === 0 ? 0 : Math.round((concluidos / total) * 100);

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <Card>
        <Text style={tipografia.titulo}>Resumo da rotina</Text>
        <View style={styles.linhaMetricas}>
          <Metrica rotulo="Pets" valor={String(total)} styles={styles} />
          <Metrica rotulo="Concluídos" valor={String(concluidos)} styles={styles} />
        </View>
        <View style={styles.linhaMetricas}>
          <Metrica rotulo="Pendentes" valor={String(pendentes)} styles={styles} />
          <Metrica rotulo="Cancelados" valor={String(cancelados)} styles={styles} />
        </View>
      </Card>

      <Card destacado>
        <Text style={styles.rotuloSecao}>Passeios concluídos hoje</Text>
        <Text style={styles.percentual}>{percentualConcluido}%</Text>
        <Text style={tipografia.legenda}>
          {concluidos} de {total} {total === 1 ? 'pet' : 'pets'} já passearam hoje.
        </Text>
      </Card>

      <Card>
        <Text style={styles.rotuloSecao}>Aparência</Text>
        <View style={styles.linhaTema}>
          <View style={styles.textoTema}>
            <Text style={tipografia.corpo}>Tema escuro</Text>
            <Text style={tipografia.legenda}>
              Preferência salva no aparelho: {tema === 'escuro' ? 'escuro' : 'claro'}.
            </Text>
          </View>
          <Switch
            value={tema === 'escuro'}
            onValueChange={alternarTema}
            accessibilityLabel="Alternar entre tema claro e escuro"
            trackColor={{ false: cores.textoFraco, true: cores.primaria }}
          />
        </View>
      </Card>

      <Card>
        <Text style={styles.rotuloSecao}>Sobre o app</Text>
        <Text style={tipografia.corpo}>
          Pet Routine organiza a rotina dos seus pets: status do passeio do dia, registro com
          localização e foto, e histórico das sessões de passeio no aparelho.
        </Text>
        <Link href="/sobre" style={styles.link}>
          Ver informações do app e da equipe
        </Link>
      </Card>
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
      padding: espaco.md,
      gap: espaco.md,
    },
    linhaMetricas: {
      flexDirection: 'row',
      gap: espaco.sm,
    },
    metrica: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: espaco.sm,
      borderRadius: espaco.sm,
      backgroundColor: cores.fundo,
      gap: espaco.xs,
    },
    valorMetrica: {
      fontSize: 24,
      fontWeight: '700',
      color: cores.primaria,
    },
    rotuloSecao: {
      ...tipografia.corpo,
      fontWeight: '600',
    },
    percentual: {
      fontSize: 32,
      fontWeight: '700',
      color: cores.sucesso,
    },
    linhaTema: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: espaco.md,
    },
    textoTema: {
      flex: 1,
      gap: espaco.xs,
    },
    link: {
      ...tipografia.corpo,
      color: cores.primaria,
      fontWeight: '600',
    },
  });
}
