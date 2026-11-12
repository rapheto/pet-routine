// Created by AI.

// ============================================================
// Etapa 3 — Contexto global de Tema Claro/Escuro
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// O tema é a primeira preferência global do app e precisa sobreviver
// ao fechamento do aplicativo. Por isso:
//   • o valor corrente vive em um `createContext` + `useState`;
//   • a preferência é lida do `AsyncStorage` no primeiro `useEffect`;
//   • toda troca é persistida de volta no `AsyncStorage`.
//
// `useTheme` valida se está dentro do provider para evitar um
// `undefined` silencioso em tempo de execução.
// ============================================================
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  criarTipografia,
  paletaClara,
  paletaEscura,
  type PaletaCores,
  type TipografiaTema,
} from '../theme';

// Created by AI.
export type Tema = 'claro' | 'escuro';

// Chave única da preferência — o prefixo evita colisão com outras libs.
// Created by AI.
const CHAVE_TEMA = '@petroutine:theme';

// Created by AI.
type ThemeContextValue = {
  tema: Tema;
  cores: PaletaCores;
  tipografia: TipografiaTema;
  alternarTema: () => void;
};

// Created by AI.
const ThemeContext = createContext<ThemeContextValue | null>(null);

// Created by AI.
type ThemeProviderProps = {
  children: ReactNode;
};

// Created by AI.
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [tema, setTema] = useState<Tema>('claro');
  // `carregado` evita gravar o padrão 'claro' por cima da preferência
  // salva antes que a leitura do disco termine.
  const [carregado, setCarregado] = useState(false);

  // Created by AI.
  useEffect(() => {
    let ativo = true;

    async function carregarPreferencia() {
      try {
        const salvo = await AsyncStorage.getItem(CHAVE_TEMA);
        if (ativo && (salvo === 'claro' || salvo === 'escuro')) setTema(salvo);
      } catch {
        // Sem acesso ao disco, o app segue no tema claro padrão.
      } finally {
        if (ativo) setCarregado(true);
      }
    }

    void carregarPreferencia();

    // Evita `setState` depois que o provider saiu da árvore.
    return () => {
      ativo = false;
    };
  }, []);

  // Persiste sempre que o tema muda — e só depois da hidratação inicial.
  // Created by AI.
  useEffect(() => {
    if (!carregado) return;
    AsyncStorage.setItem(CHAVE_TEMA, tema).catch(() => {
      // Falha de escrita não deve impedir o uso do app.
    });
  }, [tema, carregado]);

  // Created by AI.
  const alternarTema = useCallback(() => {
    setTema((anterior) => (anterior === 'claro' ? 'escuro' : 'claro'));
  }, []);

  const cores = tema === 'escuro' ? paletaEscura : paletaClara;

  // `useMemo` evita recriar o objeto de contexto (e os estilos de texto)
  // a cada render dos filhos.
  // Created by AI.
  const valor = useMemo<ThemeContextValue>(
    () => ({ tema, cores, tipografia: criarTipografia(cores), alternarTema }),
    [tema, cores, alternarTema],
  );

  return <ThemeContext.Provider value={valor}>{children}</ThemeContext.Provider>;
}

// Created by AI.
export function useTheme(): ThemeContextValue {
  const contexto = useContext(ThemeContext);
  if (!contexto) {
    throw new Error('useTheme precisa ser usado dentro de <ThemeProvider>.');
  }
  return contexto;
}
