// Created by AI.

// ============================================================
// Etapa 4 — Tipos de autenticação
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Tipos espelham o contrato real de `/api/auth/*` do backend:
//   { token: string, user: { id, name, email } }
// Nenhum campo é `string` genérica: todos são literais/nomeados.
// ============================================================

// Created by AI.
// Updated by AI.
export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

// Created by AI.
export type RespostaAutenticacao = {
  token: string;
  user: AuthUser;
};
