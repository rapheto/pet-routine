// Created by AI.
// Updated by AI.

// O CSS do Tailwind/NativeWind precisa ser importado UMA vez no layout
// raiz. Sem este import o Metro não registra as classes `className`,
// e os componentes ficam sem espaçamento/altura — o botão "Entrar"
// chega a ser renderizado, mas sem área visível de toque.
import '../../global.css';

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
import { Link, Stack, useRouter, useSegments } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { petIdDaNotificacao, prepararCanalNotificacoes } from '../services/notifications';
import { useAuthStore } from '../store/use-auth-store';
import { ThemeProvider, useTheme } from '../context/theme-context';
import { GluestackUIProvider } from '../components/gluestack-provider';
import { espaco, type PaletaCores, type TipografiaTema } from '../theme';

// Created by AI.
export const unstable_settings = {
  initialRouteName: '(tabs)',
};

// Updated by AI.
export default function LayoutRaiz() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <GluestackUIProvider>
          <RotasComTema />
        </GluestackUIProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

// Componente interno: só ele pode usar `useTheme`, pois já está
// dentro do `ThemeProvider`.
// Created by AI.
// Updated by AI.
function RotasComTema() {
  const router = useRouter();
  const segments = useSegments();
  const { tema, cores, tipografia } = useTheme();
  const estilos = useMemo(() => criarEstilos(cores, tipografia), [cores, tipografia]);

  const sessionToken = useAuthStore((estado) => estado.sessionToken);
  const isHydrated = useAuthStore((estado) => estado.isHydrated);

  // Auth Guard: só decide depois que a sessão persistida foi lida do
  // disco, evitando piscar a tela de login para quem já está logado.
  // Created by AI.
  useEffect(() => {
    if (!isHydrated) return;

    const estaNoGrupoAuth = segments[0] === '(auth)';

    if (!sessionToken && !estaNoGrupoAuth) {
      router.replace('/(auth)/login');
    } else if (sessionToken && estaNoGrupoAuth) {
      router.replace('/(tabs)');
    }
  }, [sessionToken, isHydrated, segments, router]);

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
      {!isHydrated ? (
        <View style={estilos.carregando}>
          <ActivityIndicator size="large" color={cores.primaria} />
          <Text style={estilos.textoCarregando}>Carregando sua sessão...</Text>
        </View>
      ) : (
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: cores.cartao },
            headerTintColor: cores.primaria,
            headerTitleStyle: { color: cores.primaria, fontWeight: '700' },
            contentStyle: { backgroundColor: cores.fundo },
          }}
        >
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
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
      )}
    </>
  );
}

// Created by AI.
function criarEstilos(cores: PaletaCores, tipografia: TipografiaTema) {
  return StyleSheet.create({
    linkCabecalho: {
      ...tipografia.corpo,
      color: cores.primariaForte,
      fontWeight: '600',
      paddingHorizontal: espaco.md,
      paddingVertical: espaco.xs,
    },
    carregando: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: cores.fundo,
      gap: espaco.sm,
    },
    textoCarregando: {
      ...tipografia.corpo,
      color: cores.textoFraco,
    },
  });
}
