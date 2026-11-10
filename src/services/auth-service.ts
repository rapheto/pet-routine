// Created by AI.

// ============================================================
// Etapa 4 — Serviço de autenticação
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// As telas não conhecem token nem endpoints: chamam estas funções e
// recebem o usuário autenticado. A gravação da sessão na store
// persistida acontece aqui, em um único lugar.
// ============================================================
import { apiFetch } from './api';
import { useAuthStore } from '../store/use-auth-store';
import { usePetStore } from '../store/use-pet-store';
import type { AuthUser, RespostaAutenticacao } from '../types/auth';

// Created by AI.
export async function signupUser(
  name: string,
  email: string,
  password: string,
): Promise<AuthUser> {
  const resposta = await apiFetch<RespostaAutenticacao>('/api/auth/signup', {
    method: 'POST',
    body: { name, email, password },
  });

  useAuthStore.getState().setSession(resposta.token, resposta.user);
  return resposta.user;
}

// Created by AI.
export async function loginUser(email: string, password: string): Promise<AuthUser> {
  const resposta = await apiFetch<RespostaAutenticacao>('/api/auth/login', {
    method: 'POST',
    body: { email, password },
  });

  useAuthStore.getState().setSession(resposta.token, resposta.user);
  return resposta.user;
}

/**
 * Encerra a sessão. O `finally` garante que token e lista de pets em
 * memória sejam limpos mesmo se o backend estiver fora do ar.
 */
// Created by AI.
export async function logoutUser(): Promise<void> {
  try {
    await apiFetch('/api/auth/logout', { method: 'POST' });
  } catch {
    // O backend é stateless: mesmo com falha de rede, a sessão local
    // deve ser encerrada.
  } finally {
    useAuthStore.getState().clearSession();
    usePetStore.getState().clearPets();
  }
}
