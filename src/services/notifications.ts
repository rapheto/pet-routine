// Created by AI.
// Updated by AI.

// ============================================================
// Etapa 2 — Notificações locais (expo-notifications)
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Serviço sem JSX: configura o handler global, cria o canal do
// Android e agenda o lembrete de passeio para daqui a 5 segundos.
// A navegação ao tocar na notificação fica no layout raiz, que é
// quem tem acesso ao router.
//
// Etapa 5: no Expo Go do Android (SDK 53+) o gerenciador de canais
// nativo não existe e `setNotificationChannelAsync` rejeita com
// NullPointerException. Por isso o canal é criado apenas fora do
// Expo Go e qualquer falha é contida aqui, sem derrubar o app.
// ============================================================
import { Platform } from 'react-native';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import * as Notifications from 'expo-notifications';

// Created by AI.
const CANAL_LEMBRETES = 'lembretes-passeio';

/**
 * `true` quando o bundle roda no Expo Go — ambiente em que o módulo
 * nativo de notificações é reduzido e não tem gerenciador de canais.
 */
// Created by AI.
const ESTA_NO_EXPO_GO =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

// Created by AI.
export function canalNotificacoesDisponivel(): boolean {
  return Platform.OS === 'android' && !ESTA_NO_EXPO_GO;
}

// Foreground: banner, som e lista mesmo com o app aberto.
// Created by AI.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Created by AI.
// Updated by AI.
export async function prepararCanalNotificacoes(): Promise<void> {
  if (!canalNotificacoesDisponivel()) return;

  try {
    await Notifications.setNotificationChannelAsync(CANAL_LEMBRETES, {
      name: 'Lembretes de passeio',
      importance: Notifications.AndroidImportance.DEFAULT,
      sound: 'default',
    });
  } catch (erro) {
    // Nunca deixamos a criação do canal derrubar o app: sem canal, o
    // Android usa o canal padrão e o lembrete ainda é exibido.
    console.warn('[notificações] falha ao criar o canal do Android', erro);
  }
}

// Created by AI.
export type ResultadoPermissaoNotificacoes =
  | { tipo: 'autorizada' }
  | { tipo: 'negada' }
  | { tipo: 'bloqueada' };

/**
 * Distingue permissão autorizada, negada e bloqueada.
 * A permissão é pedida aqui — e não na abertura do app — para o pedido
 * aparecer no momento em que ele faz sentido para o usuário.
 */
// Created by AI.
// Updated by AI.
export async function garantirPermissaoNotificacoes(): Promise<ResultadoPermissaoNotificacoes> {
  const atual = await Notifications.getPermissionsAsync();
  if (atual.granted) return { tipo: 'autorizada' };
  if (!atual.canAskAgain) return { tipo: 'bloqueada' };

  const pedido = await Notifications.requestPermissionsAsync();
  if (pedido.granted) return { tipo: 'autorizada' };
  return pedido.canAskAgain ? { tipo: 'negada' } : { tipo: 'bloqueada' };
}

// Created by AI.
export type ResultadoAgendamentoNotificacao =
  | { tipo: 'agendado'; id: string }
  | { tipo: 'permissao-negada' }
  | { tipo: 'permissao-bloqueada' };

/**
 * Agenda o lembrete para daqui a 5 segundos.
 * Informa se o lembrete foi agendado ou se a permissão foi negada/bloqueada.
 */
// Created by AI.
// Updated by AI.
export async function agendarLembretePasseio(
  petId: string,
  nomePet: string,
): Promise<ResultadoAgendamentoNotificacao> {
  await prepararCanalNotificacoes();

  const permissao = await garantirPermissaoNotificacoes();
  if (permissao.tipo !== 'autorizada') {
    return {
      tipo: permissao.tipo === 'negada' ? 'permissao-negada' : 'permissao-bloqueada',
    };
  }

  const gatilho: Notifications.TimeIntervalTriggerInput = {
    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: 5,
  };

  // Só referencia o canal quando ele realmente existe (build de
  // desenvolvimento/produção). No Expo Go o `channelId` apontaria para
  // um canal inexistente e a notificação seria descartada.
  if (canalNotificacoesDisponivel()) {
    gatilho.channelId = CANAL_LEMBRETES;
  }

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: `Hora do passeio de ${nomePet}! 🐾`,
      body: 'Toque para abrir os detalhes e registrar o passeio.',
      data: { petId },
    },
    trigger: gatilho,
  });
  return { tipo: 'agendado', id };
}

/**
 * Extrai o `petId` do payload da notificação sem usar `any`.
 * O conteúdo vem do sistema operacional, então validamos o tipo.
 */
// Created by AI.
export function petIdDaNotificacao(
  resposta: Notifications.NotificationResponse,
): string | null {
  const dados = resposta.notification.request.content.data;
  const petId = dados?.petId;
  return typeof petId === 'string' ? petId : null;
}
