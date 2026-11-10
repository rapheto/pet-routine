// Created by AI.

// ============================================================
// Etapa 3 — Cronômetro de passeio com cleanup
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Regra 9: o `setInterval` criado aqui é SEMPRE removido no retorno do
// `useEffect` — ao pausar, salvar ou sair da tela. Sem isso o contador
// continuaria rodando em memória e atualizaria um componente desmontado.
//
// Regra 6: a ação fica em `onPress`; o feedback visual vem do `pressed`.
//
// Ao salvar, a sessão vai para o SQLite local e a tela de detalhe é
// avisada para recarregar o histórico.
// ============================================================
import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatarDuracao } from '../lib/duracao';
import { salvarSessaoPasseio } from '../services/passeio-db';
import { useTheme } from '../context/theme-context';
import { espaco, type PaletaCores, type TipografiaTema } from '../theme';
import { Card } from './card';

// Created by AI.
type WalkTimerProps = {
  petId: string;
  onSessaoSalva: () => void;
};

// Created by AI.
export function WalkTimer({ petId, onSessaoSalva }: WalkTimerProps) {
  const { cores, tipografia } = useTheme();
  const styles = useMemo(() => criarEstilos(cores, tipografia), [cores, tipografia]);

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
      <Text style={styles.rotulo}>Cronômetro de passeio</Text>
      <Text style={styles.tempo}>{formatarDuracao(seconds)}</Text>
      <Text style={tipografia.legenda}>
        {isRunning ? 'Contando o tempo do passeio...' : 'Toque em Iniciar quando sair para o passeio.'}
      </Text>

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      <View style={styles.acoes}>
        <Pressable
          onPress={alternarCronometro}
          accessibilityRole="button"
          accessibilityState={{ selected: isRunning }}
          style={({ pressed }) => [styles.botao, styles.botaoPrimario, pressed && styles.pressionado]}
        >
          <Text style={styles.textoBotao}>{isRunning ? 'Pausar' : 'Iniciar'}</Text>
        </Pressable>

        <Pressable
          onPress={zerar}
          accessibilityRole="button"
          style={({ pressed }) => [styles.botao, styles.botaoNeutro, pressed && styles.pressionado]}
        >
          <Text style={styles.textoBotao}>Zerar</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => void salvar()}
        disabled={salvarDesabilitado}
        accessibilityRole="button"
        accessibilityState={{ disabled: salvarDesabilitado }}
        style={({ pressed }) => [
          styles.botao,
          styles.botaoSalvar,
          salvarDesabilitado && styles.botaoDesabilitado,
          pressed && !salvarDesabilitado && styles.pressionado,
        ]}
      >
        <Text style={styles.textoBotao}>
          {salvando ? 'Salvando...' : 'Salvar sessão no histórico'}
        </Text>
      </Pressable>
    </Card>
  );
}

// Created by AI.
function criarEstilos(cores: PaletaCores, tipografia: TipografiaTema) {
  return StyleSheet.create({
    rotulo: {
      ...tipografia.corpo,
      fontWeight: '600',
    },
    tempo: {
      fontSize: 40,
      fontWeight: '700',
      color: cores.primaria,
      fontVariant: ['tabular-nums'],
      textAlign: 'center',
    },
    erro: {
      ...tipografia.corpo,
      color: cores.erro,
    },
    acoes: {
      flexDirection: 'row',
      gap: espaco.sm,
    },
    botao: {
      padding: espaco.md,
      borderRadius: espaco.sm,
      alignItems: 'center',
    },
    botaoPrimario: {
      flex: 1,
      backgroundColor: cores.primaria,
    },
    botaoNeutro: {
      flex: 1,
      backgroundColor: cores.textoFraco,
    },
    botaoSalvar: {
      backgroundColor: cores.sucesso,
    },
    botaoDesabilitado: {
      opacity: 0.4,
    },
    pressionado: {
      opacity: 0.7,
    },
    textoBotao: {
      color: cores.sobrePrimaria,
      fontWeight: 'bold',
    },
  });
}
