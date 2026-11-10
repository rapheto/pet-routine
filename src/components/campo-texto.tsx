// Created by AI.

// ============================================================
// Etapa 4 — Campo de texto rotulado, ciente do tema
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Componente reutilizável (Regra 15: fora de src/app/).
// Usado nas telas de Login e Cadastro.
// ============================================================
import { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type KeyboardTypeOptions,
  type TextInputProps,
} from 'react-native';

import { useTheme } from '../context/theme-context';
import { espaco, type PaletaCores, type TipografiaTema } from '../theme';

// Created by AI.
type CampoTextoProps = {
  rotulo: string;
  valor: string;
  aoMudar: (texto: string) => void;
  placeholder?: string;
  seguro?: boolean;
  tipoTeclado?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoComplete?: TextInputProps['autoComplete'];
};

// Created by AI.
export function CampoTexto({
  rotulo,
  valor,
  aoMudar,
  placeholder,
  seguro = false,
  tipoTeclado = 'default',
  autoCapitalize = 'none',
  autoComplete,
}: CampoTextoProps) {
  const { cores, tipografia } = useTheme();
  const styles = useMemo(() => criarEstilos(cores, tipografia), [cores, tipografia]);

  return (
    <View style={styles.campo}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <TextInput
        value={valor}
        onChangeText={aoMudar}
        placeholder={placeholder}
        placeholderTextColor={cores.textoFraco}
        secureTextEntry={seguro}
        keyboardType={tipoTeclado}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        autoCorrect={false}
        style={styles.input}
      />
    </View>
  );
}

// Created by AI.
function criarEstilos(cores: PaletaCores, tipografia: TipografiaTema) {
  return StyleSheet.create({
    campo: {
      gap: espaco.xs,
    },
    rotulo: {
      ...tipografia.legenda,
      fontWeight: '600',
    },
    input: {
      borderWidth: 1,
      borderColor: cores.textoFraco,
      borderRadius: espaco.sm,
      padding: espaco.sm,
      fontSize: tipografia.corpo.fontSize,
      backgroundColor: cores.cartao,
      color: cores.texto,
    },
  });
}
