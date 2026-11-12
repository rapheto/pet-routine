// Created by AI.
// Updated by AI.

// ============================================================
// Etapa 5 — Layout compartilhado das telas de autenticação
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Reformulação: marca, título e subtítulo com hierarquia clara, erro
// em destaque, campos agrupados por `gap` e rodapé com links. O fundo
// segue o tema claro/escuro persistido.
// Regra 15: componente reutilizável fora de src/app/.
// ============================================================
import { useMemo, type ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { useTheme } from '../context/theme-context';
import { espaco, type PaletaCores } from '../theme';
import { Card } from './card';
import { Heading } from './heading';
import { Text } from './texto';
import { VStack } from './vstack';

// Created by AI.
type LayoutAutenticacaoProps = {
  titulo: string;
  subtitulo: string;
  erro?: string;
  children: ReactNode;
  rodape: ReactNode;
};

// Created by AI.
// Updated by AI.
export function LayoutAutenticacao({
  titulo,
  subtitulo,
  erro = '',
  children,
  rodape,
}: LayoutAutenticacaoProps) {
  const { cores } = useTheme();
  const estilos = useMemo(() => criarEstilos(cores), [cores]);

  // No iOS o teclado não redimensiona a janela: sem este ajuste o
  // botão "Entrar" fica atrás do teclado e parece não existir.
  // Created by AI.
  return (
    <ScrollView
      style={estilos.tela}
      contentContainerStyle={estilos.conteudo}
      keyboardShouldPersistTaps="handled"
      automaticallyAdjustKeyboardInsets
    >
      <VStack className="gap-6">
        <VStack className="items-center gap-2">
          <Image
            source={require('../../assets/pet-routine-logo.png')}
            contentFit="contain"
            accessibilityLabel="Logo Pet Routine"
            style={estilos.logo}
          />
          <Heading nivel="destaque" className="text-center">{titulo}</Heading>
          <Text className="text-center text-base" tom="fraco">
            {subtitulo}
          </Text>
        </VStack>

        {erro !== '' && (
          <Card className="border-2" style={estilos.cartaoErro}>
            <Text className="text-sm" tom="sobreRosa" accessibilityRole="alert">
              {erro}
            </Text>
          </Card>
        )}

        <VStack className="gap-4">{children}</VStack>

        <VStack className="items-center gap-3">{rodape}</VStack>
      </VStack>
    </ScrollView>
  );
}

// Created by AI.
// Updated by AI.
function criarEstilos(cores: PaletaCores) {
  return StyleSheet.create({
    tela: {
      flex: 1,
      backgroundColor: cores.fundo,
    },
    conteudo: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: espaco.lg,
      paddingVertical: espaco.xl,
    },
    logo: {
      width: 240,
      height: 185,
      alignSelf: 'center',
    },
    cartaoErro: {
      borderColor: cores.erro,
      backgroundColor: cores.rosa,
    },
  });
}
