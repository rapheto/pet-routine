// Created by AI.
// Updated by AI.

// ============================================================
// Etapa 2 — Navegação em abas
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Regra 15: layout de navegação. Nenhuma tela mora aqui.
// Etapa 3: abas acompanham o tema Claro/Escuro.
//
// Revisão de UI: os cabeçalhos nativos das abas foram removidos. Cada
// tela já tem o próprio título no conteúdo e o "Sobre" passou a morar
// na aba de Configurações, então o header só duplicava informação.
// ============================================================
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';

import { useTheme } from '../../context/theme-context';

// Created by AI.
// Updated by AI.
export default function LayoutAbas() {
  const { cores } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: cores.primaria,
        tabBarInactiveTintColor: cores.textoFraco,
        tabBarStyle: {
          backgroundColor: cores.cartao,
          borderTopColor: cores.borda,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        sceneStyle: { backgroundColor: cores.fundo },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Meus Pets',
          tabBarIcon: ({ color, size }) => <Feather name="heart" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Estatísticas',
          tabBarIcon: ({ color, size }) => <Feather name="bar-chart-2" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color, size }) => <Feather name="settings" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
