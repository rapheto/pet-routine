// Created by AI.

// ============================================================
// Etapa 5 — Verificador de Atualizações Over-The-Air (OTA)
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Mostra o canal e a `runtimeVersion` da build em execução e permite
// buscar uma atualização remota com `expo-updates`.
//
// Em modo de desenvolvimento (`__DEV__`) o OTA é bloqueado de forma
// explícita: o update só existe em builds geradas pelo EAS Update.
// ============================================================
import { useState } from 'react';
import * as Updates from 'expo-updates';

import { Badge } from './badge';
import { Button } from './botao';
import { Card } from './card';
import { Heading } from './heading';
import { HStack } from './hstack';
import { Text } from './texto';
import { VStack } from './vstack';

// Created by AI.
const MENSAGEM_DEV = 'OTA desabilitado em modo de desenvolvimento.';

// Created by AI.
export function OtaStatusCard() {
  const { currentlyRunning } = Updates.useUpdates();
  const [mensagem, setMensagem] = useState('');
  const [verificando, setVerificando] = useState(false);

  const canal = currentlyRunning.channel ?? 'sem canal (Expo Go/dev)';
  const runtimeVersion =
    currentlyRunning.runtimeVersion ?? Updates.runtimeVersion ?? 'não informada';

  // Created by AI.
  async function buscarAtualizacao() {
    // Bloqueio de segurança: em dev não existe canal de update publicado.
    if (__DEV__) {
      setMensagem(MENSAGEM_DEV);
      return;
    }

    if (!Updates.isEnabled) {
      setMensagem('Atualizações OTA não estão habilitadas nesta build.');
      return;
    }

    setVerificando(true);
    setMensagem('');
    try {
      const checagem = await Updates.checkForUpdateAsync();
      if (!checagem.isAvailable) {
        setMensagem('Você já está na versão mais recente.');
        return;
      }

      setMensagem('Baixando atualização...');
      await Updates.fetchUpdateAsync();
      setMensagem('Atualização baixada. Reiniciando o app...');
      await Updates.reloadAsync();
    } catch {
      setMensagem('Não foi possível verificar atualizações agora. Tente mais tarde.');
    } finally {
      setVerificando(false);
    }
  }

  return (
    <Card>
      <VStack className="gap-1">
        <Heading nivel="secao">Atualizações Over-The-Air</Heading>
        <Text className="text-xs" tom="fraco">
          Verifique se há uma nova versão publicada para este canal.
        </Text>
      </VStack>

      <VStack className="gap-2">
        <HStack className="justify-between gap-3">
          <Text className="text-sm" tom="fraco">
            Canal
          </Text>
          <Badge texto={canal} tom="primaria" />
        </HStack>
        <HStack className="justify-between gap-3">
          <Text className="text-sm" tom="fraco">
            Runtime
          </Text>
          <Badge texto={runtimeVersion} />
        </HStack>
      </VStack>

      {__DEV__ && (
        <Text className="text-xs" tom="fraco">
          {MENSAGEM_DEV}
        </Text>
      )}

      {mensagem !== '' && (
        <Text className="text-sm" tom={mensagem === MENSAGEM_DEV ? 'fraco' : 'sucesso'}>
          {mensagem}
        </Text>
      )}

      <Button
        rotulo={verificando ? 'Buscando atualização...' : 'Buscar Atualização OTA'}
        aoPressionar={() => void buscarAtualizacao()}
        carregando={verificando}
        desabilitado={__DEV__}
      />
    </Card>
  );
}
