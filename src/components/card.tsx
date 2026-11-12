// Created by AI.
// Updated by AI.

// ============================================================
// Etapa 5 — Componente Card do kit de UI (GlueStack + NativeWind)
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Componente genérico, sem conhecimento do domínio Pet.
//
// Restrições:
//   • Layout, espaçamento e raio via `className` (NativeWind)
//   • Sombra com `boxShadow` (Regra 4), nunca com o quarteto legado
//   • Espaçamento entre irmãos com `gap` (Regra 3)
//   • Nenhum hex solto — as cores vêm do `theme.ts` pelo `useTheme`
//
// Design: sobre o fundo branco o cartão ganha uma borda fina e uma
// sombra com tinta verde (não preta), então ele se destaca sem
// "sujar" a paleta.
// ============================================================
import { useMemo, type ReactNode } from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { useTheme } from '../context/theme-context';
import type { PaletaCores } from '../theme';

// Updated by AI.
type CardProps = ViewProps & {
  children: ReactNode;
  className?: string;
  destacado?: boolean;
};

// Updated by AI.
export function Card({ children, className, destacado, style, ...rest }: CardProps) {
  const { cores } = useTheme();
  const estilos = useMemo(() => criarEstilos(cores), [cores]);

  return (
    <View
      {...rest}
      className={`rounded-2xl p-4 gap-3 ${className ?? ''}`}
      style={[estilos.card, destacado && estilos.destacado, style]}
    >
      {children}
    </View>
  );
}

// Updated by AI.
function criarEstilos(cores: PaletaCores) {
  return StyleSheet.create({
    card: {
      backgroundColor: cores.cartao,
      borderWidth: 1,
      borderColor: cores.borda,
      boxShadow: '0 6px 18px rgba(1, 120, 110, 0.08)',
    },
    destacado: {
      borderWidth: 2,
      borderColor: cores.primaria,
    },
  });
}
