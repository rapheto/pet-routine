// ============================================================
// Prática 2 — Sistema de tokens de design
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Tokens são VALORES (cores, espaçamentos, tipografia), nunca
// layouts prontos. Componentes consomem estes tokens — nunca o
// contrário. Nenhum componente deve ter um hex ou número mágico;
// tudo vem daqui.
//
// Regra: `as const` AQUI, nunca dentro de `StyleSheet.create`.
//
// ⚠️  Preencha este arquivo PRIMEIRO — os demais dependem dele.
// ============================================================
import type { TextStyle } from 'react-native';

// ============================================================
// Etapa 3 — Paletas Claro/Escuro
// As duas paletas têm EXATAMENTE as mesmas chaves. Quem consome os
// tokens usa `PaletaCores` e nunca um objeto de cor concreto, então
// trocar de tema não muda a estrutura dos componentes.
// ============================================================
// Created by AI.
export type PaletaCores = {
  fundo: string;
  cartao: string;
  texto: string;
  textoFraco: string;
  primaria: string;
  sucesso: string;
  erro: string;
  sobreposicao: string;
  destaqueSuave: string;
  // Cor de texto sobre a cor primária/sucesso/erro (botões cheios).
  sobrePrimaria: string;
};

// Updated by AI.
export const paletaClara: PaletaCores = {
  fundo: '#FEF7EE',
  cartao: '#FFFFFF',
  texto: '#333333',
  textoFraco: '#777777',
  primaria: '#FF8C00',
  sucesso: '#4CAF50',
  erro: '#F44336',
  sobreposicao: 'rgba(0, 0, 0, 0.45)',
  destaqueSuave: '#FDE7CC',
  sobrePrimaria: '#FFFFFF',
};

// Created by AI.
export const paletaEscura: PaletaCores = {
  fundo: '#121212',
  cartao: '#1F1F1F',
  texto: '#F4F4F4',
  textoFraco: '#A6A6A6',
  primaria: '#FFA94D',
  sucesso: '#66BB6A',
  erro: '#EF5350',
  sobreposicao: 'rgba(0, 0, 0, 0.65)',
  destaqueSuave: '#3D2C18',
  sobrePrimaria: '#1A1A1A',
};

// Updated by AI.
export const espaco = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

// ============================================================
// Etapa 3 — Tipografia derivada da paleta ativa
// Antes os estilos de texto traziam a cor fixa clara; agora a cor
// vem da paleta recebida, então o texto acompanha o tema.
// ============================================================
// Created by AI.
export type TipografiaTema = {
  titulo: TextStyle;
  corpo: TextStyle;
  legenda: TextStyle;
};

// Created by AI.
export function criarTipografia(cores: PaletaCores): TipografiaTema {
  return {
    titulo: { fontSize: 24, fontWeight: '600', color: cores.texto },
    corpo: { fontSize: 16, fontWeight: '400', color: cores.texto },
    legenda: { fontSize: 12, fontWeight: '400', color: cores.textoFraco },
  };
}

// TODO P2.4: por que este arquivo usa `as const` e o StyleSheet.create
//   do componente NÃO usa? Responda em um comentário de uma linha aqui.
// O as const permite inferência de tipos literais fortes para os tokens; StyleSheet.create já retorna tipos válidos pro RN e não precisa de cast literal.
