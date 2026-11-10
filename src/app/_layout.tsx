// Created by AI.

// ============================================================
// Etapa 1 — Layout raiz do Expo Router
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Arquivo de LAYOUT (Regra 15): só declara a navegação e o que é
// global a todas as telas. Nenhum componente de tela mora aqui.
// ============================================================
import { Link, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { cores, espaco, tipografia } from '../theme';

// Created by AI.
export const unstable_settings = {
  initialRouteName: 'index',
};

// Created by AI.
export default function LayoutRaiz() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: cores.cartao },
          headerTintColor: cores.texto,
          headerTitleStyle: { color: cores.texto },
          contentStyle: { backgroundColor: cores.fundo },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Meus Pets',
            // Regra 17: navegação declarativa usa `Link` no JSX.
            headerRight: () => (
              <Link href="/sobre" style={estilos.linkCabecalho}>
                Sobre
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="foto-do-pet"
          options={{ title: 'Foto do pet', presentation: 'modal' }}
        />
        <Stack.Screen name="sobre" options={{ title: 'Sobre' }} />
      </Stack>
    </SafeAreaProvider>
  );
}

// Created by AI.
const estilos = StyleSheet.create({
  linkCabecalho: {
    ...tipografia.corpo,
    color: cores.primaria,
    fontWeight: '600',
    paddingHorizontal: espaco.md,
    paddingVertical: espaco.xs,
  },
});
