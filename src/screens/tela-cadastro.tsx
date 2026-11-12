// Created by AI.
// Updated by AI.

// ============================================================
// Etapa 5 — Tela de Cadastro (UI reformulada)
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Valida os campos localmente (espelhando as regras do backend) e cria
// a conta via `signupUser`. Em caso de sucesso a sessão já é gravada e
// o Auth Guard leva o tutor para `/(tabs)`.
// ============================================================
import { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import { signupUser } from '../services/auth-service';
import { mensagemDoErro } from '../lib/erro';
import { useTheme } from '../context/theme-context';
import { Button } from '../components/botao';
import { Input } from '../components/campo-texto';
import { LayoutAutenticacao } from '../components/layout-autenticacao';
import { VStack } from '../components/vstack';
import { espaco, type PaletaCores } from '../theme';

// Mesma regra do backend: a senha precisa de pelo menos 4 caracteres.
// Created by AI.
const TAMANHO_MINIMO_SENHA = 4;

// Created by AI.
// Updated by AI.
export function TelaCadastro() {
  const { cores } = useTheme();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Created by AI.
  async function cadastrar() {
    if (nome.trim() === '' || email.trim() === '' || senha === '') {
      setErro('Preencha nome, e-mail e senha para criar a conta.');
      return;
    }

    if (senha.length < TAMANHO_MINIMO_SENHA) {
      setErro(`A senha precisa ter pelo menos ${TAMANHO_MINIMO_SENHA} caracteres.`);
      return;
    }

    setCarregando(true);
    setErro('');
    try {
      await signupUser(nome.trim(), email.trim(), senha);
      // O redirecionamento é responsabilidade do Auth Guard.
    } catch (falha) {
      setErro(mensagemDoErro(falha, 'Não foi possível criar a conta. Tente novamente.'));
    } finally {
      setCarregando(false);
    }
  }

  return (
    <LayoutAutenticacao
      titulo="Criar conta"
      subtitulo="Cadastre-se para acompanhar os passeios dos seus pets."
      erro={erro}
      rodape={
        <Link href="/(auth)/login" style={styles.link}>
          Já tem conta? Entrar
        </Link>
      }
    >
      <VStack className="gap-4">
        <Input
          rotulo="Nome"
          valor={nome}
          aoMudar={setNome}
          placeholder="Como podemos te chamar?"
          autoCapitalize="words"
          autoComplete="name"
        />
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
          placeholder="Mínimo de 4 caracteres"
          seguro
          autoComplete="new-password"
        />
        <Button
          rotulo={carregando ? 'Criando conta...' : 'Criar conta'}
          aoPressionar={() => void cadastrar()}
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
      fontSize: 16,
      fontWeight: '600',
      paddingVertical: espaco.xs,
    },
  });
}
