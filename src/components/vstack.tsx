// Created by AI.

// ============================================================
// Etapa 5 — Componente VStack (base do kit de UI)
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Empilha os filhos na vertical. O espaçamento entre irmãos vem de
// `gap-*` via NativeWind — nunca de `margin` em cada filho (Regra 3).
// ============================================================
import { View, type ViewProps } from 'react-native';

// Created by AI.
type VStackProps = ViewProps & {
  className?: string;
};

// Created by AI.
export function VStack({ className, ...rest }: VStackProps) {
  return <View {...rest} className={`flex-col ${className ?? ''}`} />;
}
