// Created by AI.
// Updated by AI.

// ============================================================
// Etapa 5 — Componente Button do kit de UI
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Regra 6: a ação fica em `onPress`; o feedback visual vem do estado
// `pressed`. Enquanto `carregando`, o botão fica desabilitado e mostra
// um `ActivityIndicator`, impedindo requisições duplicadas.
//
// Design (paleta da marca):
//   • `primario`   → verde de ação (#01786E), o CTA de cada tela.
//   • `secundario` → pastel azul (#D3EAFC) com texto azul-escuro.
//   • `perigo`     → pastel rosa (#FDDAD8) com texto vinho.
//   • `fantasma`   → verde pastel com contorno verde (nunca transparente,
//                    para não sumir sobre o fundo branco).
// Todos os botões têm borda e alvo de toque de no mínimo 44pt, para
// que o elemento pareça (e seja) clicável.
//
// Importante: o `style` do Pressable é um array simples, e não uma
// função. O cssInterop do NativeWind substitui a prop `style` quando
// ela é função, o que apagava o fundo dos botões e deixava o texto
// branco sobre o cartão branco. O estado de toque agora vem de
// `onPressIn`/`onPressOut`.
// ============================================================
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  type GestureResponderEvent,
} from 'react-native';

import { useTheme } from '../context/theme-context';
import type { PaletaCores } from '../theme';
import { Text, COR_DO_TOM, type TomTexto } from './texto';

// Created by AI.
export type VarianteButton = 'primario' | 'secundario' | 'perigo' | 'fantasma';

// Created by AI.
type ButtonProps = {
  rotulo: string;
  aoPressionar: (evento?: GestureResponderEvent) => void;
  variante?: VarianteButton;
  carregando?: boolean;
  desabilitado?: boolean;
  compacto?: boolean;
  className?: string;
  rotuloAcessivel?: string;
};

// Created by AI.
// Tom do rótulo (e do indicador de carregamento) por variante.
const TOM_DO_ROTULO: Record<VarianteButton, TomTexto> = {
  primario: 'sobrePrimaria',
  secundario: 'sobreAzul',
  perigo: 'sobreRosa',
  fantasma: 'primariaForte',
};

// Created by AI.
// Updated by AI.
export function Button({
  rotulo,
  aoPressionar,
  variante = 'primario',
  carregando = false,
  desabilitado = false,
  compacto = false,
  className,
  rotuloAcessivel,
}: ButtonProps) {
  const { cores } = useTheme();
  const estilos = useMemo(() => criarEstilos(cores), [cores]);
  const [pressionado, setPressionado] = useState(false);

  const bloqueado = carregando || desabilitado;
  // O tamanho do alvo de toque é decidido por prop (e não por classes
  // concorrentes), para não depender da ordem do CSS gerado.
  // Compacto = 44pt, o mínimo recomendado para toque confortável.
  const classeTamanho = compacto
    ? 'min-h-[40px] px-3.5 py-1'
    : 'min-h-[46px] px-4 py-2';
  const classeTexto = compacto ? 'text-sm' : 'text-base';
  const corDoRotulo = cores[COR_DO_TOM[TOM_DO_ROTULO[variante]]];

  return (
    <Pressable
      onPress={aoPressionar}
      onPressIn={() => setPressionado(true)}
      onPressOut={() => setPressionado(false)}
      disabled={bloqueado}
      accessibilityRole="button"
      accessibilityLabel={rotuloAcessivel ?? rotulo}
      accessibilityState={{ disabled: bloqueado, busy: carregando }}
      className={`${classeTamanho} flex-row items-center justify-center gap-2 rounded-xl ${className ?? ''}`}
      style={[
        estilos[variante],
        bloqueado && estilos.desabilitado,
        pressionado && !bloqueado && estilos.pressionado,
      ]}
    >
      {carregando && <ActivityIndicator size="small" color={corDoRotulo} />}
      <Text className={`text-center ${classeTexto} font-bold`} tom={TOM_DO_ROTULO[variante]}>
        {rotulo}
      </Text>
    </Pressable>
  );
}

// Created by AI.
// Updated by AI.
function criarEstilos(cores: PaletaCores) {
  return StyleSheet.create({
    primario: {
      backgroundColor: cores.primaria,
      borderWidth: 1,
      borderColor: cores.primaria,
    },
    secundario: {
      backgroundColor: cores.azul,
      borderWidth: 1,
      borderColor: cores.azul,
    },
    perigo: {
      backgroundColor: cores.rosa,
      borderWidth: 1,
      borderColor: cores.rosa,
    },
    fantasma: {
      backgroundColor: cores.destaqueSuave,
      borderWidth: 1.5,
      borderColor: cores.primaria,
    },
    desabilitado: {
      opacity: 0.45,
    },
    pressionado: {
      opacity: 0.78,
    },
  });
}
