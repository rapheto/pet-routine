// Created by AI.

// ============================================================
// Etapa 4 — Stack pública de autenticação
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Regra 15: só layout aqui. As telas ficam em src/screens/.
// ============================================================
import { Stack } from 'expo-router';

import { useTheme } from '../../context/theme-context';

// Created by AI.
export default function LayoutAutenticacao() {
  const { cores } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: cores.fundo },
      }}
    />
  );
}
