// Created by AI.
// Updated by AI.

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
//
// Revisão de design (paleta da marca):
//   • Títulos e logotipo: #019789 (verde-petróleo)
//   • Fundo: #FFFFFF
//   • Tons pastel de apoio: #FFEACB · #FDDAD8 · #DCEFDC · #D3EAFC
//   • Botões de ação: um verde mais fechado (#01786E) derivado do
//     primário — mesma família, sem repetir o tom dos títulos.
//   • Preto (#070302) como cor de complemento/texto.
// ============================================================
// Created by AI.
export type PaletaCores = {
  // ----- Superfícies -----
  fundo: string;
  cartao: string;
  // Superfície neutra com leve tinta verde (fundos de métricas,
  // miniaturas e estados vazios).
  cartaoSuave: string;
  borda: string;
  // Contorno de controles interativos (inputs, chips): mais escuro que
  // `borda` para que o limite do controle apareça sobre o fundo branco.
  bordaForte: string;

  // ----- Texto -----
  texto: string;
  textoFraco: string;
  // Cor de texto sobre fundos cheios (botões, selos escuros).
  sobrePrimaria: string;

  // ----- Marca -----
  // Títulos, logotipo, ícones ativos e contornos.
  primaria: string;
  // Botões preenchidos de ação: verde mais escuro da mesma família.
  primariaForte: string;

  // ----- Estados -----
  sucesso: string;
  erro: string;

  // ----- Tons pastel de apoio -----
  // Usados como fundo de selos, chips, métricas e botões suaves.
  ambar: string;
  rosa: string;
  verde: string;
  azul: string;
  // Texto de alto contraste sobre cada pastel.
  sobreAmbar: string;
  sobreRosa: string;
  sobreVerde: string;
  sobreAzul: string;

  // ----- Utilidades -----
  sobreposicao: string;
  destaqueSuave: string;
};

// Updated by AI.
export const paletaClara: PaletaCores = {
  fundo: '#FFFFFF',
  cartao: '#FFFFFF',
  cartaoSuave: '#F4FAF8',
  borda: '#E1EDEA',
  bordaForte: '#B7CFCA',

  texto: '#070302',
  textoFraco: '#5D6C69',
  sobrePrimaria: '#FFFFFF',

  primaria: '#019789',
  primariaForte: '#01786E',

  sucesso: '#01786E',
  erro: '#B4413A',

  ambar: '#FFEACB',
  rosa: '#FDDAD8',
  verde: '#DCEFDC',
  azul: '#D3EAFC',
  sobreAmbar: '#7A4E12',
  sobreRosa: '#8A3B45',
  sobreVerde: '#1F6B4A',
  sobreAzul: '#1D5C86',

  sobreposicao: 'rgba(7, 3, 2, 0.45)',
  destaqueSuave: '#DCEFDC',
};

// Created by AI.
// Updated by AI.
export const paletaEscura: PaletaCores = {
  fundo: '#0E1514',
  cartao: '#16211F',
  cartaoSuave: '#1C2927',
  borda: '#2A3A37',
  bordaForte: '#3F5752',

  texto: '#F5F8F7',
  textoFraco: '#A3B4B0',
  sobrePrimaria: '#FFFFFF',

  primaria: '#34C7B4',
  primariaForte: '#0E8C7E',

  sucesso: '#34C7B4',
  erro: '#F08A80',

  // No tema escuro os pastéis viram superfícies profundas com o
  // mesmo matiz, mantendo a identidade sem estourar o contraste.
  ambar: '#3A2C17',
  rosa: '#3A2326',
  verde: '#17332B',
  azul: '#16283A',
  sobreAmbar: '#FFEACB',
  sobreRosa: '#FDDAD8',
  sobreVerde: '#DCEFDC',
  sobreAzul: '#D3EAFC',

  sobreposicao: 'rgba(0, 0, 0, 0.65)',
  destaqueSuave: '#17332B',
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
// Títulos usam o verde da marca; o corpo usa o preto de complemento.
// ============================================================
// Created by AI.
export type TipografiaTema = {
  titulo: TextStyle;
  corpo: TextStyle;
  legenda: TextStyle;
};

// Created by AI.
// Updated by AI.
export function criarTipografia(cores: PaletaCores): TipografiaTema {
  return {
    titulo: { fontSize: 24, fontWeight: '700', color: cores.primaria },
    corpo: { fontSize: 16, fontWeight: '400', color: cores.texto },
    legenda: { fontSize: 12, fontWeight: '400', color: cores.textoFraco },
  };
}

// Updated by AI.
// `as const` preserva os tipos literais dos tokens; `StyleSheet.create` já retorna tipos válidos do React Native.
