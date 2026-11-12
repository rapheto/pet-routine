// Created by AI.
// Updated by AI.

// ============================================================
// Etapa 5 — Cronômetro de passeio (UI reformulada)
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Regra 9: o `setInterval` criado aqui é SEMPRE removido no retorno do
// `useEffect` — ao pausar, salvar ou sair da tela.
//
// Reformulação: tempo em destaque, dois botões de controle lado a lado
// e um botão principal para salvar no histórico local (SQLite).
// ============================================================
import { useEffect, useState } from 'react';

import { formatarDuracao } from '../lib/duracao';
import { salvarSessaoPasseio } from '../services/passeio-db';
import { Button } from './botao';
import { Card } from './card';
import { Heading } from './heading';
import { HStack } from './hstack';
import { Text } from './texto';
import { VStack } from './vstack';

// Updated by AI.
type WalkTimerProps = {
  petId: string;
  onSessaoSalva: () => void;
};

// Updated by AI.
export function WalkTimer({ petId, onSessaoSalva }: WalkTimerProps) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  // Created by AI.
  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      // Atualização funcional: não depende do valor capturado no closure.
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  // Created by AI.
  function alternarCronometro() {
    setIsRunning((rodando) => !rodando);
  }

  // Created by AI.
  function zerar() {
    setIsRunning(false);
    setSeconds(0);
    setErro('');
  }

  // Created by AI.
  async function salvar() {
    if (seconds === 0 || salvando) return;

    setSalvando(true);
    setErro('');
    try {
      await salvarSessaoPasseio(petId, seconds);
      setIsRunning(false);
      setSeconds(0);
      onSessaoSalva();
    } catch {
      setErro('Não foi possível salvar a sessão no histórico local.');
    } finally {
      setSalvando(false);
    }
  }

  const salvarDesabilitado = seconds === 0 || salvando;

  return (
    <Card>
      <VStack className="gap-1">
        <Heading nivel="secao">Cronômetro de passeio</Heading>
        <Text className="text-xs" tom="fraco">
          {isRunning
            ? 'Contando o tempo do passeio...'
            : 'Toque em Iniciar quando sair para o passeio.'}
        </Text>
      </VStack>

      <Text
        className="text-center text-5xl font-bold"
        tom="primaria"
        style={{ fontVariant: ['tabular-nums'] }}
      >
        {formatarDuracao(seconds)}
      </Text>

      {isRunning && (
        <HStack className="justify-center gap-2">
          <Text className="text-xs" tom="sucesso">
            ● Em andamento
          </Text>
        </HStack>
      )}

      {erro !== '' && (
        <Text className="text-sm" tom="erro">
          {erro}
        </Text>
      )}

      <HStack className="gap-2">
        <Button
          rotulo={isRunning ? 'Pausar' : 'Iniciar'}
          aoPressionar={alternarCronometro}
          className="flex-1"
        />
        <Button
          rotulo="Zerar"
          variante="secundario"
          aoPressionar={zerar}
          desabilitado={seconds === 0 && !isRunning}
          className="flex-1"
        />
      </HStack>

      <Button
        rotulo={salvando ? 'Salvando...' : 'Salvar sessão no histórico'}
        aoPressionar={() => void salvar()}
        carregando={salvando}
        desabilitado={salvarDesabilitado}
      />
    </Card>
  );
}
