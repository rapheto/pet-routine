// ============================================================
// Prática 1.2 — Serviço mockado (arquivo 1 de 2)
// Leia o enunciado completo em `PRATICA.md` › "Prática 2".
//
// Antes de existir tela, existe a camada de dados. Aqui ela é falsa —
// mas a ASSINATURA das funções é propositalmente idêntica à que uma
// chamada HTTP real teria, para a troca do mock pela API ser indolor.
// ============================================================

import type { Pet } from '../types/pet';

// Deixe esta constante no código para conseguir testar o caminho de erro
// sem editar mais nada.
const SIMULAR_ERRO = false;

const ATRASO_MS = 1000; // para o estado de carregando ser visível

// Updated by AI.
const MOCK: Pet = {
  id: 'pet-123',
  nome: 'Rex',
  especie: 'cachorro',
  porte: 'medio',
  statusPasseio: 'pendente',
  idadeMeses: 24,
  criadoEm: new Date('2025-01-01T00:00:00Z'),
};

/**
 * Devolve o pet em destaque. Assinatura propositalmente idêntica
 * à que uma chamada HTTP real teria, para a troca ser indolor.
 */
// Updated by AI.
export async function buscarPetEmDestaque(): Promise<Pet> {
  // Mantém um atraso curto para que o estado de carregamento seja visível.
  await new Promise((r) => setTimeout(r, ATRASO_MS));

  if (SIMULAR_ERRO) {
    throw new Error('Não foi possível carregar os dados do pet. Verifique sua conexão e tente novamente.');
  }

  return MOCK;
}

/**
 * Registra o passeio do dia. Por enquanto só devolve o pet com o
 * status atualizado; persistência é assunto de aula futura.
 */
// Updated by AI.
export async function registrarPasseio(pet: Pet): Promise<Pet> {
  return { ...pet, statusPasseio: 'concluido' };
}
