// Created by AI.
// Updated by AI.

// ============================================================
// Etapa 5 — Tela de Login (UI reformulada)
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// A ação chama `loginUser`; em caso de sucesso a sessão persistida é
// gravada e o Auth Guard do `_layout.tsx` redireciona para `/(tabs)`.
// Erros do backend (credenciais inválidas, rede) aparecem na tela.
// ============================================================
import { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import { loginUser } from '../services/auth-service';
import { mensagemDoErro } from '../lib/erro';
import { useTheme } from '../context/theme-context';
import { Button } from '../components/botao';
import { Card } from '../components/card';
import { Input } from '../components/campo-texto';
import { LayoutAutenticacao } from '../components/layout-autenticacao';
import { Text } from '../components/texto';
import { VStack } from '../components/vstack';
import { espaco, type PaletaCores } from '../theme';

// Created by AI.
// Updated by AI.
export function TelaLogin() {
  const { cores } = useTheme();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Created by AI.
  async function entrar() {
    if (email.trim() === '' || senha === '') {
      setErro('Preencha e-mail e senha para entrar.');
      return;
    }

    setCarregando(true);
    setErro('');
    try {
      await loginUser(email.trim(), senha);
      // O redirecionamento é responsabilidade do Auth Guard.
    } catch (falha) {
      setErro(mensagemDoErro(falha, 'Não foi possível entrar. Tente novamente.'));
    } finally {
      setCarregando(false);
    }
  }

  return (
    <LayoutAutenticacao
      titulo="Entrar"
      subtitulo="Acesse sua conta para cuidar da rotina dos seus pets."
      erro={erro}
      rodape={
        <>
          <Link href="/(auth)/signup" style={styles.link}>
            Ainda não tem conta? Criar conta
          </Link>
          <Card className="w-full items-center" style={styles.cartaoDemo}>
            <Text className="text-xs font-semibold uppercase" tom="sobreAzul">
              Conta de demonstração
            </Text>
            <Text className="text-sm" tom="sobreAzul">
              tutor@cesar.school · senha 123456
            </Text>
          </Card>
        </>
      }
    >
      <VStack className="gap-4">
        <Input
          rotulo="E-mail"
          valor={email}
          aoMudar={setEmail}
          placeholder="voce@exemplo.com"
          tipoTeclado="email-address"
          autoComplete="email"
        />
        <Input
          rotulo="Senha"
          valor={senha}
          aoMudar={setSenha}
          placeholder="Sua senha"
          seguro
          autoComplete="current-password"
        />
        <Button
          rotulo={carregando ? 'Entrando...' : 'Entrar'}
          aoPressionar={() => void entrar()}
          carregando={carregando}
        />
      </VStack>
    </LayoutAutenticacao>
  );
}

// Created by AI.
function criarEstilos(cores: PaletaCores) {
  return StyleSheet.create({
    link: {
      color: cores.primariaForte,
      fontWeight: '600',
      paddingVertical: espaco.xs,
    },
    cartaoDemo: {
      backgroundColor: cores.azul,
      borderColor: cores.azul,
    },
  });
}
