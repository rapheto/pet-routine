// ============================================================
// Prática 2 — Componente Card reutilizável
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Este componente é genérico — ele não sabe nada sobre Pet.
// Props tipadas, children: ReactNode, prop opcional `destacado`.
//
// Restrições:
//   • Sombra com `boxShadow` (uma string), não com shadow*/elevation
//   • Espaçamento interno com `gap`
//   • Nenhum hex ou número mágico — tudo vem do theme.ts
//
// Etapa 3: as cores passam a vir do tema Claro/Escuro via `useTheme`.
// ============================================================
import { type ReactNode, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '../context/theme-context';
import { espaco, type PaletaCores } from '../theme';

// Updated by AI.
type CardProps = {
  children: ReactNode;
  destacado?: boolean;
};

// Updated by AI.
export function Card({ children, destacado }: CardProps) {
  const { cores } = useTheme();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  return <View style={[styles.card, destacado && styles.cardDestacado]}>{children}</View>;
}

// Created by AI.
function criarEstilos(cores: PaletaCores) {
  return StyleSheet.create({
    card: {
      padding: espaco.md,
      borderRadius: espaco.sm,
      backgroundColor: cores.cartao,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      gap: espaco.sm,
    },
    cardDestacado: {
      borderWidth: 2,
      borderColor: cores.primaria,
    },
  });
}
