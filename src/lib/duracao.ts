// Created by AI.

// ============================================================
// Utilitário de duração — formata segundos como mm:ss
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Função pura, sem React: é usada pelo cronômetro e pelo histórico.
// ============================================================

// Created by AI.
export function formatarDuracao(segundos: number): string {
  const total = Math.max(0, Math.floor(segundos));
  const minutos = Math.floor(total / 60);
  const restantes = total % 60;
  return `${String(minutos).padStart(2, '0')}:${String(restantes).padStart(2, '0')}`;
}
