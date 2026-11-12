// Created by AI.

// ============================================================
// Etapa 5 — Configuração do Tailwind/NativeWind
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// `darkMode: 'class'` permite controlar o tema claro/escuro pelo
// `colorScheme` do NativeWind, alinhado ao `useTheme` do app.
//
// As cores NÃO são declaradas aqui de propósito: elas vivem em
// `src/theme.ts` e chegam aos componentes pelo `useTheme()`.
// ============================================================

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      borderRadius: {
        pet: '16px',
      },
    },
  },
  plugins: [],
};
