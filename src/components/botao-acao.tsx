// Created by AI.

// ============================================================
// Etapa 4 — Botão de ação com estados de carregamento
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Regra 6: a ação fica em `onPress` e o feedback visual no `pressed`.
// Regra 15: componente reutilizável fora de src/app/.
// Enquanto `carregando`, o botão fica desabilitado e mostra o spinner.
// ============================================================
import { useMemo } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { useTheme } from '../context/theme-context';
import { espaco, type PaletaCores, type TipografiaTema } from '../theme';

// Created by AI.
export type VarianteBotao = 'primario' | 'neutro' | 'perigo';

// Created by AI.
type BotaoAcaoProps = {
  rotulo: string;
  aoPressionar: () => void;
  variante?: VarianteBotao;
  carregando?: boolean;
  desabilitado?: boolean;
};

// Created by AI.
export function BotaoAcao({
  rotulo,
  aoPressionar,
  variante = 'primario',
  carregando = false,
  desabilitado = false,
}: BotaoAcaoProps) {
  const { cores, tipografia } = useTheme();
  const styles = useMemo(() => criarEstilos(cores, tipografia), [cores, tipografia]);

  const bloqueado = carregando || desabilitado;

  return (
    <Pressable
      onPress={aoPressionar}
      disabled={bloqueado}
      accessibilityRole="button"
      accessibilityState={{ disabled: bloqueado, busy: carregando }}
      style={({ pressed }) => [
        styles.botao,
        styles[variante],
        bloqueado && styles.desabilitado,
        pressed && !bloqueado && styles.pressionado,
      ]}
    >
      {carregando ? (
        <ActivityIndicator color={cores.sobrePrimaria} />
      ) : (
        <Text style={styles.texto}>{rotulo}</Text>
      )}
    </Pressable>
  );
}

// Created by AI.
function criarEstilos(cores: PaletaCores, tipografia: TipografiaTema) {
  return StyleSheet.create({
    botao: {
      padding: espaco.md,
      borderRadius: espaco.sm,
      alignItems: 'center',
      justifyContent: 'center',
      // 48 é o alvo mínimo de toque recomendado pelas diretrizes de
      // acessibilidade (não é espaçamento de layout).
      minHeight: 48,
    },
    primario: {
      backgroundColor: cores.primaria,
    },
    neutro: {
      backgroundColor: cores.textoFraco,
    },
    perigo: {
      backgroundColor: cores.erro,
    },
    desabilitado: {
      opacity: 0.4,
    },
    pressionado: {
      opacity: 0.7,
    },
    texto: {
      ...tipografia.corpo,
      color: cores.sobrePrimaria,
      fontWeight: 'bold',
    },
  });
}
