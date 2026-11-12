// Created by AI.

// ============================================================
// Etapa 5 — Configuração do Metro com NativeWind
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// `withNativeWind` compila o `global.css` (diretivas do Tailwind) e
// injeta o CSS resultante no bundle do aplicativo.
// ============================================================
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
