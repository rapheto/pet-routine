// Created by AI.
// Updated by AI.

// ============================================================
// Etapa 5 — Componente Badge do kit de UI
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Etiqueta semântica usada para status do passeio e espécie/porte.
//
// Design: cada tom é um "pastel" da paleta da marca preenchido com
// texto escuro da mesma família — é o mesmo padrão visual dos chips
// e das métricas. Isso substitui os antigos contornos cinza, que
// deixavam espécie, porte e status indistinguíveis entre si.
// ============================================================
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '../context/theme-context';
import type { PaletaCores } from '../theme';
import { Text, COR_DO_TOM, type TomTexto } from './texto';

// Updated by AI.
export type TomBadge =
  | 'primaria'
  | 'sucesso'
  | 'erro'
  | 'neutro'
  | 'ambar'
  | 'rosa'
  | 'verde'
  | 'azul';

// Created by AI.
type BadgeProps = {
  texto: string;
  tom?: TomBadge;
  className?: string;
};

// Updated by AI.
// Cada tom define fundo, borda e cor do texto. As chaves da paleta
// são resolvidas por `keyof PaletaCores`, sem hex solto aqui.
const ESTILO_DO_TOM: Record<
  TomBadge,
  { fundo: keyof PaletaCores; borda: keyof PaletaCores; texto: TomTexto }
> = {
  primaria: { fundo: 'azul', borda: 'azul', texto: 'sobreAzul' },
  sucesso: { fundo: 'verde', borda: 'verde', texto: 'sobreVerde' },
  erro: { fundo: 'rosa', borda: 'rosa', texto: 'sobreRosa' },
  neutro: { fundo: 'cartaoSuave', borda: 'borda', texto: 'fraco' },
  ambar: { fundo: 'ambar', borda: 'ambar', texto: 'sobreAmbar' },
  rosa: { fundo: 'rosa', borda: 'rosa', texto: 'sobreRosa' },
  verde: { fundo: 'verde', borda: 'verde', texto: 'sobreVerde' },
  azul: { fundo: 'azul', borda: 'azul', texto: 'sobreAzul' },
};

// Created by AI.
// Updated by AI.
export function Badge({ texto, tom = 'neutro', className }: BadgeProps) {
  const { cores } = useTheme();
  const estilos = useMemo(() => criarEstilos(cores, tom), [cores, tom]);

  return (
    <View
      className={`self-start rounded-full border px-2.5 py-1 ${className ?? ''}`}
      style={estilos.badge}
    >
      <Text className="text-xs font-semibold" style={estilos.texto}>
        {texto}
      </Text>
    </View>
  );
}

// Updated by AI.
function criarEstilos(cores: PaletaCores, tom: TomBadge) {
  const receita = ESTILO_DO_TOM[tom];

  return StyleSheet.create({
    badge: {
      borderColor: cores[receita.borda],
      backgroundColor: cores[receita.fundo],
    },
    texto: {
      color: cores[COR_DO_TOM[receita.texto]],
    },
  });
}
