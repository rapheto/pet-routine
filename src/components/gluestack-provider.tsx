// Created by AI.

// ============================================================
// Etapa 5 — GluestackUIProvider (tema + NativeWind)
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// O provider sincroniza o `colorScheme` do NativeWind com a
// preferência de tema do app (`useTheme`), então as variantes
// `dark:` das classes também acompanham o botão de tema.
// ============================================================
import { useEffect, type ReactNode } from 'react';
import { colorScheme } from 'nativewind';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider as GlueStackProvider } from '@gluestack-ui/themed/build/components/Provider';

import { useTheme } from '../context/theme-context';

// Created by AI.
type GluestackUIProviderProps = {
  children: ReactNode;
};

// Created by AI.
// Updated by AI.
export function GluestackUIProvider({ children }: GluestackUIProviderProps) {
  const { tema } = useTheme();
  const colorMode = tema === 'escuro' ? 'dark' : 'light';

  // Updated by AI.
  useEffect(() => {
    colorScheme.set(colorMode);
  }, [colorMode]);

  return (
    <GlueStackProvider config={config} colorMode={colorMode}>
      {children}
    </GlueStackProvider>
  );
}
