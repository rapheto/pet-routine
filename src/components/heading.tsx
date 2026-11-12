// Created by AI.
// Updated by AI.

// ============================================================
// Etapa 5 — Componente Heading do kit de UI
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Hierarquia visual em três níveis (página, seção e destaque). O
// tamanho/peso vem do NativeWind; a cor vem do tema persistido.
//
// Design: todo título fala a "voz" da marca em verde. Títulos de
// página/destaque usam `primaria` (#019789); títulos de seção usam o
// verde mais fechado (`primariaForte`) porque em 18px o tom claro da
// marca perde contraste sobre o fundo branco.
// ============================================================
import { Text as TextoNativo, type TextProps as TextPropsNativo } from 'react-native';

import { useTheme } from '../context/theme-context';
import { COR_DO_TOM, type TomTexto } from './texto';

// Created by AI.
export type NivelHeading = 'pagina' | 'secao' | 'destaque';

// Created by AI.
const CLASSE_DO_NIVEL: Record<NivelHeading, string> = {
  pagina: 'text-2xl font-bold',
  secao: 'text-lg font-semibold',
  destaque: 'text-3xl font-bold',
};

// Created by AI.
// Tom padrão de cada nível: o chamador pode sobrescrever via `tom`.
const TOM_DO_NIVEL: Record<NivelHeading, TomTexto> = {
  pagina: 'primaria',
  secao: 'primariaForte',
  destaque: 'primaria',
};

// Created by AI.
type HeadingProps = TextPropsNativo & {
  className?: string;
  nivel?: NivelHeading;
  tom?: TomTexto;
};

// Created by AI.
// Updated by AI.
export function Heading({
  className,
  nivel = 'pagina',
  tom,
  style,
  ...rest
}: HeadingProps) {
  const { cores } = useTheme();
  const tomFinal = tom ?? TOM_DO_NIVEL[nivel];

  return (
    <TextoNativo
      {...rest}
      className={`${CLASSE_DO_NIVEL[nivel]} ${className ?? ''}`}
      style={[{ color: cores[COR_DO_TOM[tomFinal]] }, style]}
    />
  );
}
