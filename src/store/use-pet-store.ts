// Created by AI.

// ============================================================
// Etapa 2 — Store global de pets (em memória)
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// A partir da Etapa 2 a lista de pets é usada por rotas diferentes
// (`(tabs)/index`, `(tabs)/stats`, `pet/[id]` e `foto-do-pet`), então
// o estado sai da tela e vira store global.
//
// Nesta etapa a origem dos dados ainda é o mock `src/data/pets.ts`.
// Na Etapa 4 as mesmas ações passam a conversar com o backend via
// `apiFetch`, sem que as telas precisem mudar.
//
// Todas as atualizações são imutáveis: nunca mutamos o pet recebido.
// ============================================================
import { create } from 'zustand';

import { PETS } from '../data/pets';
import type { AtualizacaoPet, NovoPet, Pet } from '../types/pet';

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

// O servidor é quem gera `id`, `criadoEm` e o status inicial. Enquanto não
// há backend nesta etapa, replicamos essa responsabilidade aqui.
// Created by AI.
function idLocal(): string {
  return `pet-${Date.now()}`;
}

// Created by AI.
export const usePetStore = create<PetStore>((set) => ({
  // O mock já entra carregado para a primeira renderização não piscar vazio.
  // Na Etapa 4 o estado começa vazio e `fetchPets` busca no backend.
  pets: PETS,
  isLoading: false,
  error: null,

  fetchPets: async () => {
    set({ isLoading: true, error: null });
    try {
      await new Promise((resolver) => setTimeout(resolver, 400));
      // Enquanto a origem é o mock, recarregar devolve a lista original.
      set({ pets: PETS, isLoading: false });
    } catch {
      set({ isLoading: false, error: 'Não foi possível carregar os pets. Tente novamente.' });
    }
  },

  addPet: async (novo) => {
    const pet: Pet = {
      ...novo,
      id: idLocal(),
      statusPasseio: 'pendente',
      criadoEm: new Date(),
    };
    set((estado) => ({ pets: [...estado.pets, pet] }));
  },

  togglePasseio: async (id) => {
    set((estado) => ({
      pets: estado.pets.map((pet) =>
        pet.id === id
          ? { ...pet, statusPasseio: pet.statusPasseio === 'concluido' ? 'pendente' : 'concluido' }
          : pet,
      ),
    }));
  },

  registrarPasseio: async (id, local, fotoUri) => {
    set((estado) => ({
      pets: estado.pets.map((pet) =>
        pet.id === id
          ? {
              ...pet,
              statusPasseio: 'concluido',
              // Sensores são opcionais: um passeio sem GPS/foto não deve
              // apagar o que já estava salvo.
              local: local ?? pet.local,
              fotoUri: fotoUri ?? pet.fotoUri,
            }
          : pet,
      ),
    }));
  },

  updatePet: async (id, dados) => {
    set((estado) => ({
      pets: estado.pets.map((pet) => (pet.id === id ? { ...pet, ...dados } : pet)),
    }));
  },

  removePet: async (id) => {
    set((estado) => ({ pets: estado.pets.filter((pet) => pet.id !== id) }));
  },

  clearPets: () => set({ pets: [], error: null }),
}));
