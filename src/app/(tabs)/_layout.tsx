// Created by AI.

// ============================================================
// Etapa 2 — Navegação em abas
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Regra 15: layout de navegação. Nenhuma tela mora aqui.
// Regra 17: `Link` no JSX para o acesso às telas fora das abas.
// Etapa 3: abas acompanham o tema Claro/Escuro.
// ============================================================
import { useMemo } from 'react';
import { Link, Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useTheme } from '../../context/theme-context';
import { espaco, type PaletaCores, type TipografiaTema } from '../../theme';

// Created by AI.
export default function LayoutAbas() {
  const { cores, tipografia } = useTheme();
  const estilos = useMemo(() => criarEstilos(cores, tipografia), [cores, tipografia]);

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: cores.cartao },
        headerTintColor: cores.texto,
        headerTitleStyle: { color: cores.texto },
        tabBarActiveTintColor: cores.primaria,
        tabBarInactiveTintColor: cores.textoFraco,
        tabBarStyle: { backgroundColor: cores.cartao },
        sceneStyle: { backgroundColor: cores.fundo },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Meus Pets',
          tabBarIcon: ({ color, size }) => <Feather name="heart" size={size} color={color} />,
          headerRight: () => (
            <Link href="/sobre" style={estilos.linkCabecalho}>
              Sobre
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Estatísticas',
          tabBarIcon: ({ color, size }) => <Feather name="bar-chart-2" size={size} color={color} />,
          headerRight: () => (
            <Link href="/sobre" style={estilos.linkCabecalho}>
              Sobre
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}

// Created by AI.
function criarEstilos(cores: PaletaCores, tipografia: TipografiaTema) {
  return StyleSheet.create({
    linkCabecalho: {
      ...tipografia.corpo,
      color: cores.primaria,
      fontWeight: '600',
      paddingHorizontal: espaco.md,
      paddingVertical: espaco.xs,
    },
  });
}
