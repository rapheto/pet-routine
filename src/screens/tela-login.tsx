// Created by AI.

// ============================================================
// Etapa 4 — Tela de Login integrada ao backend
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// A ação chama `loginUser`; em caso de sucesso a sessão persistida é
// gravada e o Auth Guard do `_layout.tsx` redireciona para `/(tabs)`.
// Erros do backend (credenciais inválidas, rede) aparecem na tela.
// ============================================================
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

import { loginUser } from '../services/auth-service';
import { mensagemDoErro } from '../lib/erro';
import { useTheme } from '../context/theme-context';
import { BotaoAcao } from '../components/botao-acao';
import { CampoTexto } from '../components/campo-texto';
import { LayoutAutenticacao } from '../components/layout-autenticacao';
import { espaco, type PaletaCores, type TipografiaTema } from '../theme';

// Created by AI.
export function TelaLogin() {
  const { cores, tipografia } = useTheme();
  const styles = useMemo(() => criarEstilos(cores, tipografia), [cores, tipografia]);

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
          <View style={styles.dica}>
            <Text style={styles.textoDica}>Conta de demonstração</Text>
            <Text style={styles.textoDica}>tutor@cesar.school · senha 123456</Text>
          </View>
        </>
      }
    >
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
        placeholder="Sua senha"
        seguro
        autoComplete="current-password"
      />
      <BotaoAcao
        rotulo="Entrar"
        aoPressionar={() => void entrar()}
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
    dica: {
      padding: espaco.sm,
      borderRadius: espaco.sm,
      backgroundColor: cores.destaqueSuave,
      alignItems: 'center',
      gap: espaco.xs,
    },
    textoDica: {
      ...tipografia.legenda,
      color: cores.texto,
    },
  });
}
