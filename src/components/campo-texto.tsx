// Created by AI.
// Updated by AI.

// ============================================================
// Etapa 5 — Componente Input do kit de UI
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Campo de texto rotulado, com estado de erro acessível. Usado nas
// telas de Login/Cadastro e na busca de pets.
//
// Design: a borda neutra vira verde da marca enquanto o campo está em
// foco. Esse retorno visual é o que faltava para o usuário perceber
// qual campo está ativo — antes todos pareciam "mortos".
// ============================================================
import { useMemo, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  type KeyboardTypeOptions,
  type TextInputProps,
} from 'react-native';

import { useTheme } from '../context/theme-context';
import type { PaletaCores } from '../theme';
import { Text } from './texto';

// Created by AI.
type InputProps = {
  rotulo?: string;
  valor: string;
  aoMudar: (texto: string) => void;
  placeholder?: string;
  seguro?: boolean;
  tipoTeclado?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoComplete?: TextInputProps['autoComplete'];
  invalido?: boolean;
  className?: string;
};

// Created by AI.
// Updated by AI.
export function Input({
  rotulo,
  valor,
  aoMudar,
  placeholder,
  seguro = false,
  tipoTeclado = 'default',
  autoCapitalize = 'none',
  autoComplete,
  invalido = false,
  className,
}: InputProps) {
  const { cores } = useTheme();
  const estilos = useMemo(() => criarEstilos(cores), [cores]);
  const [focado, setFocado] = useState(false);

  return (
    <View className="gap-1.5">
      {rotulo !== undefined && (
        <Text className="text-xs font-semibold uppercase tracking-wide" tom="primariaForte">
          {rotulo}
        </Text>
      )}
      <TextInput
        value={valor}
        onChangeText={aoMudar}
        onFocus={() => setFocado(true)}
        onBlur={() => setFocado(false)}
        placeholder={placeholder}
        placeholderTextColor={cores.textoFraco}
        secureTextEntry={seguro}
        keyboardType={tipoTeclado}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        autoCorrect={false}
        accessibilityLabel={rotulo}
        className={`min-h-[52px] rounded-xl border px-4 py-3 text-base ${className ?? ''}`}
        style={[estilos.input, focado && estilos.focado, invalido && estilos.invalido]}
      />
    </View>
  );
}

// Created by AI.
// Updated by AI.
function criarEstilos(cores: PaletaCores) {
  return StyleSheet.create({
    input: {
      borderColor: cores.bordaForte,
      backgroundColor: cores.cartao,
      color: cores.texto,
    },
    focado: {
      borderColor: cores.primaria,
      borderWidth: 2,
    },
    invalido: {
      borderColor: cores.erro,
    },
  });
}
