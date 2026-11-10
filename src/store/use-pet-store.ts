// Created by AI.

// ============================================================
// Etapa 4 — Store global de pets integrada ao backend REST
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// A store deixou de usar o mock `src/data/pets.ts`: todas as ações
// conversam com o backend via `apiFetch` (que injeta o Bearer token).
//
// Todas as atualizações são imutáveis: nunca mutamos o pet recebido.
// Erros de rede/API ficam em `error` para a tela exibir — nenhuma ação
// lança exceção, então `void addPet(...)` nas telas é seguro.
// ============================================================
import { create } from 'zustand';

import { apiFetch } from '../services/api';
import { mensagemDoErro } from '../lib/erro';
import type { AtualizacaoPet, NovoPet, Pet, PetDoServidor } from '../types/pet';

// Created by AI.
type PetStore = {
  pets: Pet[];
  isLoading: boolean;
  error: string | null;
  fetchPets: () => Promise<void>;
  addPet: (novo: NovoPet) => Promise<void>;
  togglePasseio: (id: string) => Promise<void>;
  registrarPasseio: (id: string, local?: Pet['local'], fotoUri?: string) => Promise<void>;
  updatePet: (id: string, dados: AtualizacaoPet) => Promise<void>;
  removePet: (id: string) => Promise<void>;
  clearPets: () => void;
};

// Created by AI.
function converterPet(dto: PetDoServidor): Pet {
  return { ...dto, criadoEm: new Date(dto.criadoEm) };
}

// Created by AI.
export const usePetStore = create<PetStore>((set) => ({
  pets: [],
  isLoading: false,
  error: null,

  fetchPets: async () => {
    set({ isLoading: true, error: null });
    try {
      const dados = await apiFetch<PetDoServidor[]>('/pets');
      set({ pets: dados.map(converterPet), isLoading: false });
    } catch (erro) {
      set({ isLoading: false, error: mensagemDoErro(erro) });
    }
  },

  addPet: async (novo) => {
    try {
      const criado = await apiFetch<PetDoServidor>('/pets', { method: 'POST', body: novo });
      set((estado) => ({ pets: [converterPet(criado), ...estado.pets], error: null }));
    } catch (erro) {
      set({ error: mensagemDoErro(erro) });
    }
  },

  togglePasseio: async (id) => {
    try {
      const atualizado = await apiFetch<PetDoServidor>(`/pets/${id}/toggle`, { method: 'PATCH' });
      set((estado) => ({
        pets: estado.pets.map((pet) => (pet.id === id ? converterPet(atualizado) : pet)),
        error: null,
      }));
    } catch (erro) {
      set({ error: mensagemDoErro(erro) });
    }
  },

  registrarPasseio: async (id, local, fotoUri) => {
    try {
      const atualizado = await apiFetch<PetDoServidor>(`/pets/${id}/passeio`, {
        method: 'PATCH',
        body: { statusPasseio: 'concluido', local, fotoUri },
      });
      set((estado) => ({
        pets: estado.pets.map((pet) => (pet.id === id ? converterPet(atualizado) : pet)),
        error: null,
      }));
    } catch (erro) {
      set({ error: mensagemDoErro(erro) });
    }
  },

  updatePet: async (id, dados) => {
    try {
      const atualizado = await apiFetch<PetDoServidor>(`/pets/${id}`, {
        method: 'PUT',
        body: dados,
      });
      set((estado) => ({
        pets: estado.pets.map((pet) => (pet.id === id ? converterPet(atualizado) : pet)),
        error: null,
      }));
    } catch (erro) {
      set({ error: mensagemDoErro(erro) });
    }
  },

  removePet: async (id) => {
    try {
      await apiFetch<{ success: boolean; id: string }>(`/pets/${id}`, { method: 'DELETE' });
      set((estado) => ({
        pets: estado.pets.filter((pet) => pet.id !== id),
        error: null,
      }));
    } catch (erro) {
      set({ error: mensagemDoErro(erro) });
    }
  },

  clearPets: () => set({ pets: [], error: null }),
}));
