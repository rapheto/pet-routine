// Created by AI.
// Updated by AI.

// ============================================================
// Etapa 5 — Preferências nativas com `@expo/ui`
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Os controles são renderizados pelo sistema operacional (SwiftUI no
// iOS e Jetpack Compose no Android). O Switch usa `<Host>` explicitamente;
// o SegmentedControl gerencia seu Host internamente em cada plataforma.
// ============================================================
import { useState } from 'react';
import { Host, Switch } from '@expo/ui';
import { SegmentedControl } from '@expo/ui/community/segmented-control';

import { useTheme } from '../context/theme-context';
import { Card } from './card';
import { Heading } from './heading';
import { HStack } from './hstack';
import { Text } from './texto';
import { VStack } from './vstack';

// Created by AI.
const METAS_PASSEIO = ['Curto', 'Moderado', 'Longo'] as const;

// Created by AI.
type MetaPasseio = (typeof METAS_PASSEIO)[number];

// Created by AI.
// Updated by AI.
export function NativePetReminderSettings() {
  const { tema } = useTheme();
  const [lembretesAtivos, setLembretesAtivos] = useState(true);
  const [meta, setMeta] = useState<MetaPasseio>('Moderado');

  return (
    <Card>
      <VStack className="gap-1">
        <Heading nivel="secao">Preferências da rotina</Heading>
        <Text className="text-xs" tom="fraco">
          Controles nativos do sistema operacional (iOS/Android) montados com @expo/ui.
        </Text>
      </VStack>

      <HStack className="justify-between gap-4">
        <VStack className="flex-1 gap-0.5">
          <Text className="text-sm font-semibold">Lembretes diários de passeio</Text>
          <Text className="text-xs" tom="fraco">
            {lembretesAtivos ? 'Ativados' : 'Desativados'} para a meta {meta.toLowerCase()}.
          </Text>
        </VStack>

        <Host matchContents colorScheme={tema === 'escuro' ? 'dark' : 'light'}>
          {/*
            Sem `label`: no Android o Switch com label agrupa o texto em um
            Row com `width(IntrinsicSize.Max)`. O módulo nativo do @expo/ui
            embarcado no Expo Go ainda não converte esse modificador e o app
            fecha com FieldCastException. O rótulo visível já está ao lado.
          */}
          <Switch value={lembretesAtivos} onValueChange={setLembretesAtivos} />
        </Host>
      </HStack>

      <VStack className="gap-1">
        <Text className="text-sm font-semibold">Meta de passeio</Text>
        <Text className="text-xs" tom="fraco">
          Curto (15 min), Moderado (30 min) ou Longo (60 min).
        </Text>
        <SegmentedControl
          values={[...METAS_PASSEIO]}
          selectedIndex={METAS_PASSEIO.indexOf(meta)}
          onValueChange={(valor) => {
            const novaMeta = METAS_PASSEIO.find((opcao) => opcao === valor);
            if (novaMeta) setMeta(novaMeta);
          }}
          appearance={tema === 'escuro' ? 'dark' : 'light'}
          style={{ width: '100%' }}
        />
      </VStack>
    </Card>
  );
}
