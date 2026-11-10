// Created by AI.

// ============================================================
// Etapa 4 — Tela de Cadastro integrada ao backend
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
import { BotaoAcao } from '../components/botao-acao';
import { CampoTexto } from '../components/campo-texto';
import { LayoutAutenticacao } from '../components/layout-autenticacao';
import { espaco, type PaletaCores, type TipografiaTema } from '../theme';

// Mesma regra do backend: a senha precisa de pelo menos 4 caracteres.
// Created by AI.
const TAMANHO_MINIMO_SENHA = 4;

// Created by AI.
export function TelaCadastro() {
  const { cores, tipografia } = useTheme();
  const styles = useMemo(() => criarEstilos(cores, tipografia), [cores, tipografia]);

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
      <CampoTexto
        rotulo="Nome"
        valor={nome}
        aoMudar={setNome}
        placeholder="Como podemos te chamar?"
        autoCapitalize="words"
        autoComplete="name"
      />
      <CampoTexto
        rotulo="E-mail"
        valor={email}
        aoMudar={setEmail}
        placeholder="voce@exemplo.com"
        tipoTeclado="email-address"
        autoComplete="email"
      />
      <CampoTexto
        rotulo="Senha"
        valor={senha}
        aoMudar={setSenha}
        placeholder="Mínimo de 4 caracteres"
        seguro
        autoComplete="new-password"
      />
      <BotaoAcao
        rotulo="Criar conta"
        aoPressionar={() => void cadastrar()}
        carregando={carregando}
      />
    </LayoutAutenticacao>
  );
}

// Created by AI.
function criarEstilos(cores: PaletaCores, tipografia: TipografiaTema) {
  return StyleSheet.create({
    link: {
      ...tipografia.corpo,
      color: cores.primaria,
      fontWeight: '600',
      paddingVertical: espaco.xs,
    },
  });
}
