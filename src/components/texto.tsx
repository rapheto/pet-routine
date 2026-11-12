// Created by AI.
// Updated by AI.

// ============================================================
// Etapa 5 — Componente Text do kit de UI
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Tipografia e espaçamento vêm de classes NativeWind; a COR vem dos
// tokens de `src/theme.ts` pelo `useTheme`, porque o tema claro/escuro
// é uma preferência persistida do app (não o tema do sistema).
//
// A paleta da marca trouxe dois tons de verde: `primaria` (títulos e
// logotipo) e `primariaForte` (texto de links, rótulos e botões
// contornados), que tem contraste melhor em corpos pequenos.
// ============================================================
import { Text as TextoNativo, type TextProps as TextPropsNativo } from 'react-native';

import { useTheme } from '../context/theme-context';
import type { PaletaCores } from '../theme';

// Updated by AI.
export type TomTexto =
  | 'padrao'
  | 'fraco'
  | 'primaria'
  | 'primariaForte'
  | 'sucesso'
  | 'erro'
  | 'sobrePrimaria'
  | 'sobreAmbar'
  | 'sobreRosa'
  | 'sobreVerde'
  | 'sobreAzul';

// Updated by AI.
export const COR_DO_TOM: Record<TomTexto, keyof PaletaCores> = {
  padrao: 'texto',
  fraco: 'textoFraco',
  primaria: 'primaria',
  primariaForte: 'primariaForte',
  sucesso: 'sucesso',
  erro: 'erro',
  sobrePrimaria: 'sobrePrimaria',
  sobreAmbar: 'sobreAmbar',
  sobreRosa: 'sobreRosa',
  sobreVerde: 'sobreVerde',
  sobreAzul: 'sobreAzul',
};

// Created by AI.
type TextProps = TextPropsNativo & {
  className?: string;
  tom?: TomTexto;
};

// Created by AI.
export function Text({ className, tom = 'padrao', style, ...rest }: TextProps) {
  const { cores } = useTheme();

  return (
    <TextoNativo
      {...rest}
      className={className}
      style={[{ color: cores[COR_DO_TOM[tom]] }, style]}
    />
  );
}
