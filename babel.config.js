// Created by AI.

// ============================================================
// Etapa 5 — Configuração do Babel com NativeWind
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// O `jsxImportSource: 'nativewind'` é o que permite usar `className`
// nos componentes React Native. O preset `nativewind/babel` faz a
// ponte entre as classes do Tailwind e os estilos nativos.
// ============================================================
module.exports = function (api) {
  api.cache(true);

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
  };
};
