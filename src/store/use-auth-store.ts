// Created by AI.

// ============================================================
// Etapa 4 — Store de sessão persistida (Zustand + AsyncStorage)
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// `sessionToken` e `user` sobrevivem ao fechamento do app graças ao
// middleware `persist`. `isHydrated` NÃO é persistido: ele sinaliza
// que a leitura do disco terminou, para o Auth Guard não redirecionar
// para o login antes de saber se já existe uma sessão salva.
// ============================================================
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { AuthUser } from '../types/auth';

// Chave da sessão no disco.
// Created by AI.
export const CHAVE_SESSAO = '@petroutine:auth-session';

// Created by AI.
type AuthStore = {
  sessionToken: string | null;
  user: AuthUser | null;
  isHydrated: boolean;
  setSession: (sessionToken: string, user: AuthUser) => void;
  clearSession: () => void;
  setHydrated: (isHydrated: boolean) => void;
};

// Created by AI.
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      sessionToken: null,
      user: null,
      isHydrated: false,

      setSession: (sessionToken, user) => set({ sessionToken, user }),

      clearSession: () => set({ sessionToken: null, user: null }),

      setHydrated: (isHydrated) => set({ isHydrated }),
    }),
    {
      name: CHAVE_SESSAO,
      storage: createJSONStorage(() => AsyncStorage),
      // Só token e usuário vão para o disco.
      partialize: (estado) => ({
        sessionToken: estado.sessionToken,
        user: estado.user,
      }),
      // Roda depois da reidratação — inclusive quando ela falha.
      onRehydrateStorage: () => (estado, erro) => {
        if (erro) {
          useAuthStore.setState({ isHydrated: true });
          return;
        }
        estado?.setHydrated(true);
      },
    },
  ),
);
