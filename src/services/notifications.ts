// Created by AI.

// ============================================================
// Etapa 2 — Notificações locais (expo-notifications)
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Serviço sem JSX: configura o handler global, cria o canal do
// Android e agenda o lembrete de passeio para daqui a 5 segundos.
// A navegação ao tocar na notificação fica no layout raiz, que é
// quem tem acesso ao router.
// ============================================================
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// Created by AI.
const CANAL_LEMBRETES = 'lembretes-passeio';

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
export async function prepararCanalNotificacoes(): Promise<void> {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync(CANAL_LEMBRETES, {
    name: 'Lembretes de passeio',
    importance: Notifications.AndroidImportance.DEFAULT,
    sound: 'default',
  });
}

/**
 * Devolve `true` quando o tutor autorizou as notificações.
 * A permissão é pedida aqui — e não na abertura do app — para o pedido
 * aparecer no momento em que ele faz sentido para o usuário.
 */
// Created by AI.
export async function garantirPermissaoNotificacoes(): Promise<boolean> {
  const atual = await Notifications.getPermissionsAsync();
  if (atual.granted) return true;
  if (!atual.canAskAgain) return false;
  const pedido = await Notifications.requestPermissionsAsync();
  return pedido.granted;
}

/**
 * Agenda o lembrete para daqui a 5 segundos.
 * Devolve o identificador do agendamento, ou `null` se o tutor negou
 * a permissão (a tela mostra a orientação correspondente).
 */
// Created by AI.
export async function agendarLembretePasseio(
  petId: string,
  nomePet: string,
): Promise<string | null> {
  await prepararCanalNotificacoes();

  const permitido = await garantirPermissaoNotificacoes();
  if (!permitido) return null;

  return Notifications.scheduleNotificationAsync({
    content: {
      title: `Hora do passeio de ${nomePet}! 🐾`,
      body: 'Toque para abrir os detalhes e registrar o passeio.',
      data: { petId },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5,
      channelId: CANAL_LEMBRETES,
    },
  });
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
