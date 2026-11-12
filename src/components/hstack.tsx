// Created by AI.

// ============================================================
// Etapa 5 — Componente HStack (base do kit de UI)
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Alinha os filhos na horizontal com `gap-*` via NativeWind e
// centralização vertical padrão (Regra 3: nada de `margin`).
// ============================================================
import { View, type ViewProps } from 'react-native';

// Created by AI.
type HStackProps = ViewProps & {
  className?: string;
};

// Created by AI.
export function HStack({ className, ...rest }: HStackProps) {
  return <View {...rest} className={`flex-row items-center ${className ?? ''}`} />;
}
