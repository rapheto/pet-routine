// Created by AI.

// ============================================================
// Utilitário de mensagens de erro para o tutor
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Função pura e compartilhada entre store e telas: qualquer erro
// desconhecido vira uma mensagem legível, nunca um stack trace.
// ============================================================

// Created by AI.
const MENSAGEM_PADRAO = 'Não foi possível concluir a operação. Tente novamente.';

// Created by AI.
export function mensagemDoErro(erro: unknown, padrao: string = MENSAGEM_PADRAO): string {
  if (erro instanceof Error && erro.message.trim() !== '') return erro.message;
  return padrao;
}
