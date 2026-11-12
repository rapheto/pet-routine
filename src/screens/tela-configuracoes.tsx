// Created by AI.

// ============================================================
// Etapa 5 — Tela de Configurações
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Concentra o que é do TUTOR e do APP (e não da rotina do pet):
//   • dados da conta autenticada (nome e e-mail);
//   • alternância entre tema claro e escuro;
//   • informações sobre o app, com link para `/sobre`;
//   • saída da conta.
//
// Os dados vêm da `useAuthStore`, que é hidratada pelo backend no
// login/cadastro. Nada é fixo nesta tela.
// ============================================================
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Switch } from 'react-native';
import { Link } from 'expo-router';
import Constants from 'expo-constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuthStore } from '../store/use-auth-store';
import { logoutUser } from '../services/auth-service';
import { mensagemDoErro } from '../lib/erro';
import { useTheme } from '../context/theme-context';
import { Button } from '../components/botao';
import { Card } from '../components/card';
import { Heading } from '../components/heading';
import { HStack } from '../components/hstack';
import { NativePetReminderSettings } from '../components/native-pet-reminder-settings';
import { Text } from '../components/texto';
import { VStack } from '../components/vstack';
import { espaco, type PaletaCores } from '../theme';

// Created by AI.
const SEM_INFORMACAO = 'Não informado';

// Created by AI.
type CampoInfoProps = {
  rotulo: string;
  valor: string;
};

// Created by AI.
// Rótulo pequeno em caixa alta + valor, como na referência visual.
function CampoInfo({ rotulo, valor }: CampoInfoProps) {
  return (
    <VStack className="gap-0.5">
      <Text className="text-xs" tom="fraco">
        {rotulo}
      </Text>
      <Text className="text-base">{valor}</Text>
    </VStack>
  );
}

// Created by AI.
// Updated by AI.
export function TelaConfiguracoes() {
  const insets = useSafeAreaInsets();
  const { tema, cores, alternarTema } = useTheme();
  const estilos = useMemo(() => criarEstilos(cores), [cores]);

  const user = useAuthStore((estado) => estado.user);
  const [saindo, setSaindo] = useState(false);
  const [erroLogout, setErroLogout] = useState('');

  const versao = Constants.expoConfig?.version ?? 'desconhecida';

  // Created by AI.
  async function sair() {
    setSaindo(true);
    setErroLogout('');
    try {
      await logoutUser();
      // O Auth Guard do layout raiz redireciona para o login.
    } catch (falha) {
      setErroLogout(mensagemDoErro(falha, 'Não foi possível sair. Tente novamente.'));
    } finally {
      setSaindo(false);
    }
  }

  return (
    <ScrollView
      style={[estilos.tela, { paddingTop: insets.top }]}
      contentContainerStyle={estilos.conteudo}
    >
      <VStack className="gap-1">
        <Heading nivel="pagina">Configurações</Heading>
        <Text className="text-sm" tom="fraco">
          Sua conta e as preferências do aplicativo.
        </Text>
      </VStack>

      <Card>
        <Heading nivel="secao">Dados do tutor</Heading>

        <CampoInfo rotulo="Nome completo" valor={user?.name ?? SEM_INFORMACAO} />
        <CampoInfo rotulo="E-mail" valor={user?.email ?? SEM_INFORMACAO} />
      </Card>

      <Card>
        <Heading nivel="secao">Aparência</Heading>
        <HStack className="justify-between gap-4">
          <VStack className="flex-1 gap-0.5">
            <Text className="text-sm font-semibold">
              {tema === 'escuro' ? 'Tema escuro' : 'Tema claro'}
            </Text>
            <Text className="text-xs" tom="fraco">
              Preferência salva no aparelho. Alterne entre claro e escuro.
            </Text>
          </VStack>
          <Switch
            value={tema === 'escuro'}
            onValueChange={alternarTema}
            accessibilityLabel="Alternar entre tema claro e escuro"
            trackColor={{ false: cores.borda, true: cores.primaria }}
          />
        </HStack>
      </Card>

      <NativePetReminderSettings />

      <Card>
        <Heading nivel="secao">Sobre o app</Heading>
        <VStack className="gap-1">
          <Text className="text-sm font-semibold">🐾 Pet Routine · versão {versao}</Text>
          <Text className="text-sm" tom="fraco">
            Organiza a rotina dos seus pets: status do passeio do dia, registro com localização e
            foto, e histórico das sessões no aparelho.
          </Text>
        </VStack>
        <Link href="/sobre" style={estilos.link}>
          Ver informações do app e da equipe
        </Link>
      </Card>

      <Card>
        <Heading nivel="secao">Conta</Heading>
        <Text className="text-sm" tom="fraco">
          Encerrar a sessão neste aparelho. Você poderá entrar novamente com o mesmo e-mail.
        </Text>
        {erroLogout !== '' && (
          <Text className="text-sm" tom="erro">
            {erroLogout}
          </Text>
        )}
        <Button
          rotulo={saindo ? 'Saindo...' : 'Sair da conta'}
          variante="perigo"
          aoPressionar={() => void sair()}
          carregando={saindo}
        />
      </Card>
    </ScrollView>
  );
}

// Created by AI.
function criarEstilos(cores: PaletaCores) {
  return StyleSheet.create({
    tela: {
      flex: 1,
      backgroundColor: cores.fundo,
    },
    conteudo: {
      padding: espaco.md,
      paddingBottom: espaco.xl,
      gap: espaco.md,
    },
    link: {
      color: cores.primariaForte,
      fontSize: 16,
      fontWeight: '600',
    },
  });
}
