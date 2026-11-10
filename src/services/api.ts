// Created by AI.

// ============================================================
// Etapa 4 — Cliente HTTP centralizado
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Toda chamada à API passa por aqui. O helper:
//   • monta a URL a partir de EXPO_PUBLIC_API_URL;
//   • injeta `Authorization: Bearer <sessionToken>` automaticamente;
//   • desloga o tutor quando o backend responde 401/403;
//   • interpreta JSON e texto e lança `Error` com a mensagem do backend.
//
// Nenhuma tela chama `fetch` diretamente.
// ============================================================
import { useAuthStore } from '../store/use-auth-store';

// Created by AI.
export const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

// Created by AI.
type MetodoHttp = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// Created by AI.
export type OpcoesApi = {
  method?: MetodoHttp;
  body?: unknown;
};

// Type guard sem `as`: valida a forma do corpo antes de acessar campos.
// Created by AI.
function ehObjeto(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === 'object' && valor !== null;
}

/**
 * Extrai a mensagem de erro no formato `{ error: string }` devolvido pelo
 * backend. Corpos inesperados caem no fallback da tela.
 */
// Created by AI.
function extrairMensagem(dados: unknown): string | null {
  if (ehObjeto(dados) && typeof dados.error === 'string' && dados.error.trim() !== '') {
    return dados.error;
  }
  return null;
}

// Created by AI.
export async function apiFetch<T>(caminho: string, opcoes: OpcoesApi = {}): Promise<T> {
  const { method = 'GET', body } = opcoes;
  const token = useAuthStore.getState().sessionToken;

  const headers: Record<string, string> = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  const resposta = await fetch(`${BASE_URL}${caminho}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  // Sessão inválida/expirada: limpa o token para o Auth Guard devolver
  // o tutor à tela de login.
  if (resposta.status === 401 || resposta.status === 403) {
    useAuthStore.getState().clearSession();
  }

  const texto = await resposta.text();
  let dados: unknown = null;

  if (texto !== '') {
    try {
      dados = JSON.parse(texto);
    } catch {
      // Respostas em texto puro (ex.: erro de proxy) continuam legíveis.
      dados = texto;
    }
  }

  if (!resposta.ok) {
    const mensagem =
      extrairMensagem(dados) ??
      (typeof dados === 'string' && dados.trim() !== ''
        ? dados
        : `Falha na requisição (HTTP ${resposta.status}).`);
    throw new Error(mensagem);
  }

  // O contrato da resposta é garantido pelos tipos de domínio; validar
  // cada campo em tempo de execução duplicaria o trabalho da API.
  return dados as T;
}
