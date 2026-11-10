// Created by AI.

// ============================================================
// Layout raiz do Expo Router
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Arquivo de LAYOUT (Regra 15): declara a navegação, os providers
// globais (Safe Area e Tema) e o listener de resposta da notificação.
//
// Etapa 3: o `ThemeProvider` envolve toda a árvore de rotas e o tema
// escolhido é aplicado nos cabeçalhos, no fundo das telas e na barra
// de status.
//
// Regra 9: todo listener registrado aqui é removido no retorno do
// `useEffect`.
// ============================================================
import { useEffect, useMemo } from 'react';
import { Link, Stack, useRouter } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { petIdDaNotificacao, prepararCanalNotificacoes } from '../services/notifications';
import { ThemeProvider, useTheme } from '../context/theme-context';
import { espaco, type PaletaCores, type TipografiaTema } from '../theme';

// Created by AI.
export const unstable_settings = {
  initialRouteName: '(tabs)',
};

// Created by AI.
export default function LayoutRaiz() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RotasComTema />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

// Componente interno: só ele pode usar `useTheme`, pois já está
// dentro do `ThemeProvider`.
// Created by AI.
function RotasComTema() {
  const router = useRouter();
  const { tema, cores, tipografia } = useTheme();
  const estilos = useMemo(() => criarEstilos(cores, tipografia), [cores, tipografia]);

  // Created by AI.
  useEffect(() => {
    // O canal do Android precisa existir antes do primeiro agendamento.
    void prepararCanalNotificacoes();

    const recebida = Notifications.addNotificationReceivedListener(() => {
      // O banner já é exibido pelo handler; o app não usa badge persistente,
      // então limpamos o contador para o ícone não acumular número fantasma.
      void Notifications.setBadgeCountAsync(0);
    });

    const respondida = Notifications.addNotificationResponseReceivedListener((resposta) => {
      const petId = petIdDaNotificacao(resposta);
      if (petId) router.push({ pathname: '/pet/[id]', params: { id: petId } });
    });

    return () => {
      recebida.remove();
      respondida.remove();
    };
  }, [router]);

  return (
    <>
      <StatusBar style={tema === 'escuro' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: cores.cartao },
          headerTintColor: cores.texto,
          headerTitleStyle: { color: cores.texto },
          contentStyle: { backgroundColor: cores.fundo },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="pet/[id]" options={{ title: 'Detalhes do pet' }} />
        <Stack.Screen
          name="foto-do-pet"
          options={{ title: 'Foto do pet', presentation: 'modal' }}
        />
        <Stack.Screen
          name="sobre"
          options={{
            title: 'Sobre',
            // Regra 17: `Link` no JSX para navegação declarativa.
            headerRight: () => (
              <Link href="/" style={estilos.linkCabecalho}>
                Início
              </Link>
            ),
          }}
        />
      </Stack>
    </>
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
