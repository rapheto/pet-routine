# Declaração de uso de Inteligência Artificial

Todo uso de IA neste repositório deve ser declarado no formato narrativo abaixo,
informando a ferramenta utilizada, a finalidade, a etapa da atividade, o tipo de
contribuição, a confirmação de que não houve tratamento de dados pessoais e a
confirmação de revisão crítica e responsabilidade humana sobre o resultado
final.

Cada atividade deve ter um registro próprio. Não substitua, apague ou apenas
atualize os campos de um registro existente. Quando uma nova atividade usar IA,
adicione um novo registro numerado no final deste arquivo, abaixo do último
registro existente, usando o formato `## Registro da atividade 0000`.

## Modelo de declaração

Declaro que utilizei a(s) ferramenta(s) de Inteligência Artificial
**[informar nome e versão da ferramenta]** nesta atividade:
**[descrever a atividade]**.

A ferramenta foi utilizada com a finalidade de **[informar a finalidade]**,
durante a etapa **[informar a etapa da atividade]**, para realizar a seguinte
contribuição: **[descrever o tipo de contribuição]**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. O resultado foi submetido à **revisão crítica humana**, e a pessoa
responsável pela atividade assume a responsabilidade pelo resultado final,
incluindo sua correção, adequação e integração ao projeto.

## Modelo de registro da atividade 0000

Após o término da atividade, preencher os campos abaixo:

- **Revisado por (nome do usuário que está fazendo as edições):**
- **Arquivo / Arquivos alterado(s):**
- **Breve resumo do que foi feito (200 caracteres ou menos):**
- **Tratamento de dados pessoais:** Não houve / Houve (descrever e justificar)
- **Alterado pela IA (nome da IA, versão da IA):**
- **Finalidade do uso da IA:**
- **Etapa da atividade:**
- **Tipo de contribuição da IA:**
- **Confirmação de revisão crítica e responsabilidade humana:** 

> Este registro deve ser mantido como histórico. Não reutilize seus campos para
> uma nova atividade.

> O registro acima é um modelo. Ao registrar uma atividade, copie a estrutura
> para o final do arquivo, incremente o número do registro e preencha todos os
> campos.

## Registro da atividade 0001

Declaro que utilizei a ferramenta de Inteligência Artificial **OpenCode
(modelo DeepSeek V4.1 Flash Free)** nesta atividade: revisão de conformidade do
app com as 20 Regras de Escrita da disciplina.

A ferramenta foi utilizada com a finalidade de **corrigir violações e pontos de
atenção identificados em auditoria**, durante a etapa **revisão de qualidade
após a importação do app da branch `teste_merge`**, para realizar a seguinte
contribuição: **refatoração de estilos, feedback visual de toque, memoização do
`renderItem` e distinção dos estados vazios da lista**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. O resultado foi submetido à **revisão crítica humana**, e a pessoa
responsável pela atividade assume a responsabilidade pelo resultado final,
incluindo sua correção, adequação e integração ao projeto.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `App.tsx`, `src/components/card-pet.tsx`, `src/components/lista-vazia.tsx`, `src/screens/pet-form.tsx`, `src/screens/tela-registro.tsx`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Remoção de `margin` entre irmãos, feedback `pressed` nos toques, `renderItem` memoizado e estado vazio distinguindo conta sem pets de busca sem resultado.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** OpenCode (agente de código) — modelo DeepSeek V4.1 Flash Free
- **Finalidade do uso da IA:** Corrigir violações e pontos de atenção das 20 Regras de Escrita
- **Etapa da atividade:** Revisão de qualidade e conformidade após importação da branch `teste_merge`
- **Tipo de contribuição da IA:** Refatoração de estilos (Regra 3), feedback visual (Regra 6), memoização de `renderItem` (Regra 7) e distinção de estado vazio (Regra 8)
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael, testado no simulador.

## Registro da atividade 0002

Declaro que utilizei a ferramenta de Inteligência Artificial **OpenCode
(modelo DeepSeek V4.1 Flash Free)** nesta atividade: instalação das dependências
do app com Expo Router, ícones, câmera/galeria, notificações, gestos/animacões e
persistência local.

A ferramenta foi utilizada com a finalidade de **preparar o ambiente do projeto**,
durante a etapa **configuração inicial de dependências**, para realizar a seguinte
contribuição: **execução dos comandos `npx expo install` e ajuste do registro
`react-dom` para a versão compatível com o SDK 57**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. O resultado foi submetido à **revisão crítica humana**, e a pessoa
responsável pela atividade assume a responsabilidade pelo resultado final,
incluindo sua correção, adequação e integração ao projeto.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `package.json`, `package-lock.json`, `app.json`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Instalação via `npx expo install` de expo-router, ícones, image-picker, notifications, gesture-handler, reanimated, worklets, async-storage, sqlite e secure-store; `react-dom` fixado em 19.2.3.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** OpenCode (agente de código) — modelo DeepSeek V4.1 Flash Free
- **Finalidade do uso da IA:** Instalar e validar as dependências do projeto
- **Etapa da atividade:** Configuração inicial de dependências
- **Tipo de contribuição da IA:** Execução de comandos de instalação e correção de conflito de peer dependency
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael

## Registro da atividade 0003

Declaro que utilizei a ferramenta de Inteligência Artificial **OpenCode
(modelo DeepSeek V4.1 Flash Free)** nesta atividade: instalação das dependências
complementares `@expo/ui`, `expo-updates` e `zustand`.

A ferramenta foi utilizada com a finalidade de **completar o conjunto de
dependências do projeto**, durante a etapa **configuração inicial de dependências**,
para realizar a seguinte contribuição: **execução de `npx expo install` e
`npm install`, com verificação de tipagem ao final**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. O resultado foi submetido à **revisão crítica humana**, e a pessoa
responsável pela atividade assume a responsabilidade pelo resultado final,
incluindo sua correção, adequação e integração ao projeto.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `package.json`, `package-lock.json`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Instalação de `@expo/ui` (~57.0.26) e `expo-updates` (~57.0.27) via `npx expo install` e de `zustand` (^5.1.0) via `npm install`, usando o registro público; `tsc --noEmit` passou.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** OpenCode (agente de código) — modelo DeepSeek V4.1 Flash Free
- **Finalidade do uso da IA:** Instalar as dependências complementares e validar a tipagem
- **Etapa da atividade:** Configuração inicial de dependências
- **Tipo de contribuição da IA:** Execução de comandos de instalação e verificação de tipagem
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael

## Registro da atividade 0004

Declaro que utilizei a ferramenta de Inteligência Artificial **OpenCode
(modelo DeepSeek V4.1 Flash Free)** nesta atividade: implementação da Etapa 1 do
Mini-Projeto — migração para o Expo Router e foto do pet com `expo-image-picker`.

A ferramenta foi utilizada com a finalidade de **migrar o ponto de entrada e criar
as rotas iniciais**, durante a etapa **Etapa 1 (Aula 6) do Mini-Projeto**, para
realizar a seguinte contribuição: **criação de `src/app/_layout.tsx`,
`src/app/index.tsx`, `src/app/foto-do-pet.tsx` e `src/app/sobre.tsx`, movimentação
da tela de lista para `src/screens/tela-pets.tsx`, remoção de `App.tsx` e
`index.ts` e configuração de `scheme` e do plugin do `expo-image-picker` no
`app.json`**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. O resultado foi submetido à **revisão crítica humana**, e a pessoa
responsável pela atividade assume a responsabilidade pelo resultado final,
incluindo sua correção, adequação e integração ao projeto.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `app.json`, `package.json`, `App.tsx` (removido), `index.ts` (removido), `src/app/_layout.tsx`, `src/app/index.tsx`, `src/app/foto-do-pet.tsx`, `src/app/sobre.tsx`, `src/screens/tela-pets.tsx`, `src/components/card-pet.tsx`, `src/components/item-pet.tsx`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Migração para Expo Router com `src/app`, rotas `index`, `foto-do-pet` e `sobre`, lista movida para `src/screens`, `scheme` e plugin do image-picker com mensagens claras e `microphonePermission: false`.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** OpenCode (agente de código) — modelo DeepSeek V4.1 Flash Free
- **Finalidade do uso da IA:** Implementar a Etapa 1 do Mini-Projeto (Expo Router e foto do pet)
- **Etapa da atividade:** Etapa 1 (Aula 6) do Mini-Projeto
- **Tipo de contribuição da IA:** Criação de rotas e layout com Expo Router, implementação do fluxo de foto com `expo-image-picker`, migração de tela e ajustes de configuração
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael, testado no simulador.

## Registro da atividade 0005

Declaro que utilizei a ferramenta de Inteligência Artificial **OpenCode
(modelo DeepSeek V4.1 Flash Free)** nesta atividade: implementação da Etapa 2 do
Mini-Projeto — abas, rota dinâmica do pet e notificações locais.

A ferramenta foi utilizada com a finalidade de **estruturar a navegação e os
lembretes**, durante a etapa **Etapa 2 (Aula 7) do Mini-Projeto**, para realizar a
seguinte contribuição: **criação de `src/app/(tabs)/_layout.tsx`,
`src/app/(tabs)/index.tsx`, `src/app/(tabs)/stats.tsx` e `src/app/pet/[id].tsx`,
store global em memória (`src/store/use-pet-store.ts`), modal de cadastro
(`src/components/formulario-pet.tsx`), telas de estatísticas e de detalhe, e
serviço de notificações locais com cleanup dos listeners**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. O resultado foi submetido à **revisão crítica humana**, e a pessoa
responsável pela atividade assume a responsabilidade pelo resultado final,
incluindo sua correção, adequação e integração ao projeto.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `src/app/_layout.tsx`, `src/app/index.tsx` (removido), `src/app/(tabs)/_layout.tsx`, `src/app/(tabs)/index.tsx`, `src/app/(tabs)/stats.tsx`, `src/app/pet/[id].tsx`, `src/app/foto-do-pet.tsx`, `src/store/use-pet-store.ts`, `src/services/notifications.ts`, `src/components/formulario-pet.tsx`, `src/components/card-pet.tsx`, `src/components/item-pet.tsx`, `src/screens/tela-pets.tsx`, `src/screens/tela-estatisticas.tsx`, `src/screens/tela-pet-detalhe.tsx`, `src/screens/tela-registro.tsx`, `src/theme.ts`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Abas Meus Pets/Estatísticas, detalhe `/pet/[id]` com sensores, lembrete de 5s via expo-notifications com listeners limpos, store global em memória e modal de cadastro de pet.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** OpenCode (agente de código) — modelo DeepSeek V4.1 Flash Free
- **Finalidade do uso da IA:** Implementar a Etapa 2 do Mini-Projeto (abas, rota dinâmica e notificações)
- **Etapa da atividade:** Etapa 2 (Aula 7) do Mini-Projeto
- **Tipo de contribuição da IA:** Estrutura de navegação com Tabs e rota dinâmica, store Zustand em memória, componentes de UI e serviço de notificações locais
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael, testado no simulador.


## Registro da atividade 0006

Declaro que utilizei a ferramenta de Inteligência Artificial **OpenCode
(modelo DeepSeek V4.1 Flash Free)** nesta atividade: implementação da Etapa 3 do
Mini-Projeto — contexto de tema, cronômetro de passeio e histórico local em
SQLite.

A ferramenta foi utilizada com a finalidade de **eliminar estados isolados e
adicionar persistência local**, durante a etapa **Etapa 3 (Aula 8) do
Mini-Projeto**, para realizar a seguinte contribuição: **criação de
`src/context/theme-context.tsx` com `ThemeProvider` e `useTheme` persistidos no
`AsyncStorage`, paletas claro/escuro em `src/theme.ts`, aplicação do tema em
todas as telas e layouts, `src/components/walk-timer.tsx` com `useEffect` e
`clearInterval` no cleanup, `src/services/passeio-db.ts` com a tabela
`passeio_logs` e a listagem do histórico na tela `/pet/[id]`**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. O resultado foi submetido à **revisão crítica humana**, e a pessoa
responsável pela atividade assume a responsabilidade pelo resultado final,
incluindo sua correção, adequação e integração ao projeto.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `src/theme.ts`, `src/context/theme-context.tsx` (novo), `src/components/walk-timer.tsx` (novo), `src/services/passeio-db.ts` (novo), `src/lib/duracao.ts` (novo), `src/app/_layout.tsx`, `src/app/(tabs)/_layout.tsx`, `src/app/foto-do-pet.tsx`, `src/app/sobre.tsx`, `src/components/card.tsx`, `src/components/card-pet.tsx`, `src/components/formulario-pet.tsx`, `src/components/lista-vazia.tsx`, `src/screens/tela-pets.tsx`, `src/screens/tela-estatisticas.tsx`, `src/screens/tela-pet-detalhe.tsx`, `src/screens/tela-registro.tsx`, `src/screens/pet-form.tsx`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Tema claro/escuro persistido no AsyncStorage e aplicado nas telas, cronômetro de passeio com cleanup no `useEffect` e histórico de sessões salvo e lido do SQLite local (`passeio_logs`).
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** OpenCode (agente de código) — modelo DeepSeek V4.1 Flash Free
- **Finalidade do uso da IA:** Implementar a Etapa 3 do Mini-Projeto (contexto de tema, cronômetro e persistência local)
- **Etapa da atividade:** Etapa 3 (Aula 8) do Mini-Projeto
- **Tipo de contribuição da IA:** Criação do contexto de tema com persistência, refatoração dos estilos para consumir a paleta ativa, componente de cronômetro com cleanup e serviço de histórico em `expo-sqlite`
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael

## Registro da atividade 0007

Declaro que utilizei a ferramenta de Inteligência Artificial **OpenCode
(modelo DeepSeek V4.1 Flash Free)** nesta atividade: implementação da Etapa 4 do
Mini-Projeto — autenticação com `sessionToken` (JWT) e integração full stack com
o backend REST.

A ferramenta foi utilizada com a finalidade de **substituir os dados mockados
pelo backend real**, durante a etapa **Etapa 4 (Aula 9) do Mini-Projeto**, para
realizar a seguinte contribuição: **criação de `src/store/use-auth-store.ts`
com `persist` e `isHydrated`, `src/services/api.ts` com `Bearer` e tratamento de
401/403, `src/services/auth-service.ts` com signup/login/logout, telas de login
e cadastro em `src/app/(auth)/` e `src/screens/`, Auth Guard no `_layout.tsx`,
CRUD completo de pets em `src/store/use-pet-store.ts` e botão de logout em
Estatísticas/Perfil**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. O resultado foi submetido à **revisão crítica humana**, e a pessoa
responsável pela atividade assume a responsabilidade pelo resultado final,
incluindo sua correção, adequação e integração ao projeto.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `src/types/auth.ts` (novo), `src/store/use-auth-store.ts` (novo), `src/services/api.ts` (novo), `src/services/auth-service.ts` (novo), `src/lib/erro.ts` (novo), `src/components/campo-texto.tsx` (novo), `src/components/botao-acao.tsx` (novo), `src/components/layout-autenticacao.tsx` (novo), `src/screens/tela-login.tsx` (novo), `src/screens/tela-cadastro.tsx` (novo), `src/app/(auth)/_layout.tsx` (novo), `src/app/(auth)/login.tsx` (novo), `src/app/(auth)/signup.tsx` (novo), `src/app/_layout.tsx`, `src/store/use-pet-store.ts`, `src/types/pet.ts`, `src/screens/tela-pets.tsx`, `src/screens/tela-estatisticas.tsx`, `.env.example`, `README.md`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Sessão JWT persistida com hidratação, Auth Guard com `router.replace`, login/cadastro/logout no backend, `apiFetch` com Bearer e 401/403 e CRUD de pets via REST, substituindo os mocks.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** OpenCode (agente de código) — modelo DeepSeek V4.1 Flash Free
- **Finalidade do uso da IA:** Implementar a Etapa 4 do Mini-Projeto (autenticação e integração com o backend)
- **Etapa da atividade:** Etapa 4 (Aula 9) do Mini-Projeto
- **Tipo de contribuição da IA:** Store de sessão persistida, cliente HTTP centralizado, serviço e telas de autenticação, proteção de rotas e integração da store de pets ao CRUD REST
- **Confirmação de revisão crítica e responsabilidade humana:** backend e app testados por Raphael

## Registro da atividade 0008

Declaro que utilizei a ferramenta de Inteligência Artificial **OpenCode
(modelo DeepSeek V4.1 Flash Free)** nesta atividade: atualização do README e
criação do guia de testes das Etapas 1 a 4 do Mini-Projeto.

A ferramenta foi utilizada com a finalidade de **documentar o estado atual e o
roteiro de validação**, durante a etapa **documentação das Etapas 1 a 4**, para
realizar a seguinte contribuição: **seção "Estado atual do desenvolvimento" no
`README.md`, com o que foi implementado em cada etapa, e criação de
`docs/testar_etapas.md` com preparação de ambiente, passo a passo, casos de
erro, checklist e pendências da Etapa 5**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. O resultado foi submetido à **revisão crítica humana**, e a pessoa
responsável pela atividade assume a responsabilidade pelo resultado final,
incluindo sua correção, adequação e integração ao projeto.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `README.md`, `docs/testar_etapas.md` (novo), `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** README com o estado das Etapas 1 a 4 e guia de testes com preparação do ambiente, passo a passo por etapa, casos de erro, checklist e pendências da Etapa 5.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** OpenCode (agente de código) — modelo DeepSeek V4.1 Flash Free
- **Finalidade do uso da IA:** Documentar o progresso e o roteiro de testes do Mini-Projeto
- **Etapa da atividade:** Documentação das Etapas 1 a 4
- **Tipo de contribuição da IA:** Redação de documentação técnica, instruções de execução, casos de teste e checklist de validação
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael

## Registro da atividade 0009

Declaro que utilizei a ferramenta de Inteligência Artificial **OpenCode
(modelo DeepSeek V4.1 Flash Free)** nesta atividade: implementação da Etapa 5 do
Mini-Projeto — reformulação de UI/UX com NativeWind e kit no estilo GlueStack
UI, controles nativos com `@expo/ui`, verificação OTA e configuração do EAS
Build.

A ferramenta foi utilizada com a finalidade de **dar acabamento de produto à
interface e preparar a distribuição**, durante a etapa **Etapa 5 (Aula 10) do
Mini-Projeto**, para realizar a seguinte contribuição: **configuração do
NativeWind (`babel.config.js`, `metro.config.js`, `tailwind.config.js`,
`global.css`, `nativewind-env.d.ts`), criação do kit de UI (`Card`, `VStack`,
`HStack`, `Heading`, `Text`, `Badge`, `Input`, `Button`) e do
`GluestackUIProvider`, reformulação das telas de Login, Cadastro, Meus Pets,
`CardPet`, Detalhe/Registro de Passeio, Estatísticas/Perfil, Foto do Pet e
Sobre, `src/components/native-pet-reminder-settings.tsx` com `<Host>` +
`<Switch>` + `<Picker>`, `src/components/ota-status-card.tsx`, atualização do
`app.json` e criação do `eas.json`**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. O resultado foi submetido à **revisão crítica humana**, e a pessoa
responsável pela atividade assume a responsabilidade pelo resultado final,
incluindo sua correção, adequação e integração ao projeto.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `package.json`, `babel.config.js` (novo), `metro.config.js` (novo), `tailwind.config.js` (novo), `global.css` (novo), `nativewind-env.d.ts` (novo), `app.json`, `eas.json` (novo), `src/components/card.tsx`, `src/components/card-pet.tsx`, `src/components/item-pet.tsx`, `src/components/lista-vazia.tsx`, `src/components/walk-timer.tsx`, `src/components/formulario-pet.tsx`, `src/components/layout-autenticacao.tsx`, `src/components/campo-texto.tsx`, `src/components/vstack.tsx` (novo), `src/components/hstack.tsx` (novo), `src/components/heading.tsx` (novo), `src/components/texto.tsx` (novo), `src/components/badge.tsx` (novo), `src/components/botao.tsx` (novo), `src/components/gluestack-provider.tsx` (novo), `src/components/native-pet-reminder-settings.tsx` (novo), `src/components/ota-status-card.tsx` (novo), `src/components/botao-acao.tsx` (removido), `src/app/_layout.tsx`, `src/app/(tabs)/_layout.tsx`, `src/app/foto-do-pet.tsx`, `src/app/sobre.tsx`, `src/screens/tela-login.tsx`, `src/screens/tela-cadastro.tsx`, `src/screens/tela-pets.tsx`, `src/screens/tela-estatisticas.tsx`, `src/screens/tela-pet-detalhe.tsx`, `src/screens/tela-registro.tsx`, `src/types/pet.ts`, `README.md`, `docs/testar_etapas.md`, `docs/capturas/README.md` (novo), `docs/relatorio-uso-ia.md`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** UI reformulada com NativeWind e kit estilo GlueStack, tema claro/escuro preservado, controles nativos `@expo/ui`, card OTA bloqueado em `__DEV__`, `app.json` e `eas.json` prontos para APK de preview.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** OpenCode (agente de código) — modelo DeepSeek V4.1 Flash Free
- **Finalidade do uso da IA:** Implementar a Etapa 5 do Mini-Projeto (UI/UX, `@expo/ui`, OTA e EAS Build)
- **Etapa da atividade:** Etapa 5 (Aula 10) do Mini-Projeto
- **Tipo de contribuição da IA:** Configuração do NativeWind/Tailwind, criação do kit de componentes e do provider, refatoração visual de todas as telas, componentes de preferências nativas e de atualização OTA, e configuração de build
- **Confirmação de revisão crítica e responsabilidade humana:** Testado em emulador por Raphael

## Registro da atividade 0010

Declaro que utilizei a ferramenta de Inteligência Artificial **OpenCode
(modelo DeepSeek V4.1 Flash Free)** nesta atividade: correção do erro de
`setNotificationChannelAsync` no Expo Go do Android (SDK 53+).

A ferramenta foi utilizada com a finalidade de **evitar a queda do app no
Expo Go**, durante a etapa **Etapa 5 (Ajustes finais) do Mini-Projeto**, para
realizar a seguinte contribuição: **detecção do ambiente Expo Go em
`src/services/notifications.ts`, criação do canal Android apenas em development
build e proteção com `try/catch`, além de omitir o `channelId` quando o canal
não existe e documentar a limitação no `README.md`**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. O resultado foi submetido à **revisão crítica humana**, e a pessoa
responsável pela atividade assume a responsabilidade pelo resultado final,
incluindo sua correção, adequação e integração ao projeto.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `src/services/notifications.ts`, `README.md`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Detecção do Expo Go para pular `setNotificationChannelAsync` no Android, `try/catch` na criação do canal, `channelId` apenas quando o canal existe e nota no README.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** OpenCode (agente de código) — modelo DeepSeek V4.1 Flash Free
- **Finalidade do uso da IA:** Corrigir o `NullPointerException` do canal de notificações no Expo Go Android
- **Etapa da atividade:** Etapa 5 (Ajustes finais) do Mini-Projeto
- **Tipo de contribuição da IA:** Correção de compatibilidade com o Expo Go, tratamento de erro assíncrono e documentação da limitação
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael

## Registro da atividade 0011

Declaro que utilizei a ferramenta de Inteligência Artificial **OpenCode
(modelo DeepSeek V4.1 Flash Free)** nesta atividade: correção da tela de login
sem botão visível para entrar no app.

A ferramenta foi utilizada com a finalidade de **restaurar o estilo dos
componentes**, durante a etapa **Etapa 5 (Ajustes finais) do Mini-Projeto**,
para realizar a seguinte contribuição: **importação do `global.css` no layout
raiz (`src/app/_layout.tsx`), declaração `*.css` em `nativewind-env.d.ts`,
ajuste de teclado no `LayoutAutenticacao` e nota no `README.md`**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. O resultado foi submetido à **revisão crítica humana**, e a pessoa
responsável pela atividade assume a responsabilidade pelo resultado final,
incluindo sua correção, adequação e integração ao projeto.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `src/app/_layout.tsx`, `nativewind-env.d.ts`, `src/components/layout-autenticacao.tsx`, `README.md`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Importação do `global.css` no layout raiz para registrar as classes NativeWind (botão "Entrar" volta a ter 48 px), declaração de tipos `*.css` e ajuste do teclado no ScrollView.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** OpenCode (agente de código) — modelo DeepSeek V4.1 Flash Free
- **Finalidade do uso da IA:** Corrigir a ausência do botão de entrada na tela de login
- **Etapa da atividade:** Etapa 5 (Ajustes finais) do Mini-Projeto
- **Tipo de contribuição da IA:** Correção de configuração do NativeWind, declaração de tipos e ajuste de usabilidade do teclado
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael

## Registro da atividade 0012

Declaro que utilizei a ferramenta de Inteligência Artificial **OpenCode
(modelo DeepSeek V4.1 Flash Free)** nesta atividade: correção do fechamento do
app ao abrir a aba Estatísticas no Expo Go Android.

A ferramenta foi utilizada com a finalidade de **diagnosticar e eliminar um
crash nativo**, durante a etapa **Etapa 5 (Ajustes finais) do Mini-Projeto**,
para realizar a seguinte contribuição: **análise do `adb logcat`
(`FieldCastException` no modificador `width` do `@expo/ui`) e remoção da prop
`label` do `Switch` nativo em `src/components/native-pet-reminder-settings.tsx`,
que ativava o `Row` com `width(IntrinsicSize.Max)`**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. O resultado foi submetido à **revisão crítica humana**, e a pessoa
responsável pela atividade assume a responsabilidade pelo resultado final,
incluindo sua correção, adequação e integração ao projeto.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `src/components/native-pet-reminder-settings.tsx`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Remoção do `label` do `Switch` do `@expo/ui` no Android, evitando o `Row` com `width(IntrinsicSize.Max)` que causava `FieldCastException` e fechava o app no Expo Go; validado no emulador.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** OpenCode (agente de código) — modelo DeepSeek V4.1 Flash Free
- **Finalidade do uso da IA:** Corrigir o crash da tela de Estatísticas
- **Etapa da atividade:** Etapa 5 (Ajustes finais) do Mini-Projeto
- **Tipo de contribuição da IA:** Diagnóstico via logcat e correção de compatibilidade com o `@expo/ui` no Expo Go
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael

## Registro da atividade 0013

Declaro que utilizei a ferramenta de Inteligência Artificial **OpenCode
(modelo DeepSeek V4.1 Flash Free)** nesta atividade: reformulação do tema
visual do app a partir da paleta da marca enviada.

A ferramenta foi utilizada com a finalidade de **revisar a identidade visual e
a clareza dos elementos interativos**, durante a etapa **Etapa 5 (Ajustes
finais) do Mini-Projeto**, para realizar a seguinte contribuição: **atualização
dos tokens em `src/theme.ts` (títulos `#019789`, fundo branco `#FFFFFF`,
pastéis `#FFEACB`/`#FDDAD8`/`#DCEFDC`/`#D3EAFC`, verde de ação `#01786E` e
preto `#070302` como complemento), padronização de botões, badges, chips,
cartões, inputs com foco, métricas em pastel, cabeçalhos e abas, além de
ampliar alvos de toque e permitir fechar o formulário tocando no fundo do modal**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. O resultado foi submetido à **revisão crítica humana**, e a pessoa
responsável pela atividade assume a responsabilidade pelo resultado final,
incluindo sua correção, adequação e integração ao projeto.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `src/theme.ts`, `src/components/texto.tsx`, `src/components/heading.tsx`, `src/components/badge.tsx`, `src/components/botao.tsx`, `src/components/card.tsx`, `src/components/campo-texto.tsx`, `src/components/card-pet.tsx`, `src/components/formulario-pet.tsx`, `src/components/layout-autenticacao.tsx`, `src/screens/tela-pets.tsx`, `src/screens/tela-pet-detalhe.tsx`, `src/screens/tela-estatisticas.tsx`, `src/screens/tela-login.tsx`, `src/screens/tela-cadastro.tsx`, `src/screens/tela-registro.tsx`, `src/app/_layout.tsx`, `src/app/(tabs)/_layout.tsx`, `src/app/foto-do-pet.tsx`, `README.md`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Tema com títulos `#019789`, fundo branco, pastéis por estado, botões de ação `#01786E`, badges/métricas pastel, foco em inputs e alvos de toque maiores.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** OpenCode (agente de código) — modelo DeepSeek V4.1 Flash Free
- **Finalidade do uso da IA:** Aplicar a paleta da marca e melhorar a percepção de resposta dos controles da UI
- **Etapa da atividade:** Etapa 5 (Ajustes finais) do Mini-Projeto
- **Tipo de contribuição da IA:** Reformulação de tema/design system, ajustes de acessibilidade e de usabilidade dos componentes
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael

## Registro da atividade 0014

Declaro que utilizei a ferramenta de Inteligência Artificial **Copilot SDK em
VS Code (versão não informada pelo ambiente)** nesta atividade: conclusão da
tela de Configurações e revisão dos controles visuais do app.

A ferramenta foi utilizada com a finalidade de **concluir o fluxo de
configurações solicitado**, durante a etapa **Etapa 5 (Ajustes finais) do
Mini-Projeto**, para realizar a seguinte contribuição: **ajuste dos dados do
tutor para refletirem o contrato atual de autenticação e validação das cores
dos botões e filtros**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. O resultado foi submetido à **revisão crítica humana**, e a pessoa
responsável pela atividade assume a responsabilidade pelo resultado final,
incluindo sua correção, adequação e integração ao projeto.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `src/screens/tela-configuracoes.tsx`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Perfil de Configurações alinhado a nome/e-mail do backend e confirmação dos estilos visíveis de botões e filtros.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** Copilot SDK em VS Code (versão não informada pelo ambiente)
- **Finalidade do uso da IA:** Concluir a tela de Configurações e revisar a visibilidade dos controles
- **Etapa da atividade:** Etapa 5 (Ajustes finais) do Mini-Projeto
- **Tipo de contribuição da IA:** Ajuste de interface e validação de consistência visual
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael

## Registro da atividade 0015

Declaro que utilizei a ferramenta de Inteligência Artificial **Copilot SDK em
VS Code (versão não informada pelo ambiente)** nesta atividade: remoção de
campos de cadastro que não fazem parte do produto.

A ferramenta foi utilizada com a finalidade de **alinhar o modelo de
autenticação ao cadastro real**, durante a etapa **Etapa 5 (Ajustes finais) do
Mini-Projeto**, para realizar a seguinte contribuição: **remoção das
propriedades CPF e endereço do tipo de usuário**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. O resultado foi submetido à **revisão crítica humana**, e a pessoa
responsável pela atividade assume a responsabilidade pelo resultado final,
incluindo sua correção, adequação e integração ao projeto.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `src/types/auth.ts`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Remoção de CPF e endereço do modelo de usuário, pois não são cadastrados nem exibidos no app.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** Copilot SDK em VS Code (versão não informada pelo ambiente)
- **Finalidade do uso da IA:** Alinhar o tipo de autenticação aos dados realmente cadastrados
- **Etapa da atividade:** Etapa 5 (Ajustes finais) do Mini-Projeto
- **Tipo de contribuição da IA:** Limpeza do contrato de dados do usuário
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael

## Registro da atividade 0016

Declaro que utilizei a ferramenta de Inteligência Artificial **Copilot SDK em
VS Code (versão não informada pelo ambiente)** nesta atividade: refinamento
visual dos botões de ações do aplicativo.

A ferramenta foi utilizada com a finalidade de **melhorar a hierarquia visual
e a legibilidade dos controles**, durante a etapa **Etapa 5 (Ajustes finais) do
Mini-Projeto**, para realizar a seguinte contribuição: **redução da altura e
do padding dos botões, ajuste do tamanho do texto e troca das ações de foto
para a variante contornada e suave**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. O resultado foi submetido à **revisão crítica humana**, e a pessoa
responsável pela atividade assume a responsabilidade pelo resultado final,
incluindo sua correção, adequação e integração ao projeto.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `src/components/botao.tsx`, `src/components/card-pet.tsx`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Botões menores, texto proporcional, verde mais leve e ações de foto em estilo contornado.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** Copilot SDK em VS Code (versão não informada pelo ambiente)
- **Finalidade do uso da IA:** Refinar tamanho, cor e hierarquia dos botões
- **Etapa da atividade:** Etapa 5 (Ajustes finais) do Mini-Projeto
- **Tipo de contribuição da IA:** Ajuste de estilos e hierarquia visual dos componentes
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael

## Registro da atividade 0017

Declaro que utilizei a ferramenta de Inteligência Artificial **Copilot SDK em
VS Code (versão não informada pelo ambiente)** nesta atividade: reorganização
das telas de pet, estatísticas e configurações.

A ferramenta foi utilizada com a finalidade de **alinhar a navegação e a
hierarquia das ações ao fluxo solicitado**, durante a etapa **Etapa 5 (Ajustes
finais) do Mini-Projeto**, para realizar a seguinte contribuição: **colocação
dos dados do pet antes da foto, transferência das preferências de rotina para
Configurações e padronização do botão Adicionar foto com Cadastrar pet**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. O resultado foi submetido à **revisão crítica humana**, e a pessoa
responsável pela atividade assume a responsabilidade pelo resultado final,
incluindo sua correção, adequação e integração ao projeto.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `src/screens/tela-pet-detalhe.tsx`, `src/screens/tela-estatisticas.tsx`, `src/screens/tela-configuracoes.tsx`, `src/components/card-pet.tsx`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Dados do pet agora aparecem antes da foto; preferências foram movidas para Configurações; Adicionar foto usa o padrão primário.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** Copilot SDK em VS Code (versão não informada pelo ambiente)
- **Finalidade do uso da IA:** Reorganizar fluxos e padronizar ações
- **Etapa da atividade:** Etapa 5 (Ajustes finais) do Mini-Projeto
- **Tipo de contribuição da IA:** Reordenação de layout e reutilização de componentes
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael

## Registro da atividade 0018

Declaro que utilizei a ferramenta de Inteligência Artificial **Copilot SDK em
VS Code (versão não informada pelo ambiente)** nesta atividade: inclusão do
botão Abrir nos cards de pets.

A ferramenta foi utilizada com a finalidade de **oferecer uma ação explícita
para abrir os detalhes do pet**, durante a etapa **Etapa 5 (Ajustes finais) do
Mini-Projeto**, para realizar a seguinte contribuição: **inclusão do botão
Abrir ao lado da ação de foto e isolamento dos eventos dos botões para evitar
abertura duplicada pelo card externo**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. O resultado foi submetido à **revisão crítica humana**, e a pessoa
responsável pela atividade assume a responsabilidade pelo resultado final,
incluindo sua correção, adequação e integração ao projeto.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `src/components/botao.tsx`, `src/components/card-pet.tsx`, `src/components/item-pet.tsx`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Botão Abrir adicionado ao lado de foto nos cards, com eventos independentes do toque no card.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** Copilot SDK em VS Code (versão não informada pelo ambiente)
- **Finalidade do uso da IA:** Adicionar acesso explícito aos detalhes do pet
- **Etapa da atividade:** Etapa 5 (Ajustes finais) do Mini-Projeto
- **Tipo de contribuição da IA:** Inclusão de ação de interface e controle de propagação de eventos
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael

## Registro da atividade 0019

Declaro que utilizei a ferramenta de Inteligência Artificial **Copilot SDK em
VS Code (versão não informada pelo ambiente)** nesta atividade: ajuste da
ordem dos botões nos cards de pets.

A ferramenta foi utilizada com a finalidade de **priorizar a ação de abertura
do pet**, durante a etapa **Etapa 5 (Ajustes finais) do Mini-Projeto**, para
realizar a seguinte contribuição: **posicionamento do botão Abrir antes do
botão Adicionar foto/Trocar foto**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. O resultado foi submetido à **revisão crítica humana**, e a pessoa
responsável pela atividade assume a responsabilidade pelo resultado final,
incluindo sua correção, adequação e integração ao projeto.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `src/components/card-pet.tsx`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Botão Abrir posicionado antes da ação de foto nos cards de pets.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** Copilot SDK em VS Code (versão não informada pelo ambiente)
- **Finalidade do uso da IA:** Ajustar a prioridade visual das ações do card
- **Etapa da atividade:** Etapa 5 (Ajustes finais) do Mini-Projeto
- **Tipo de contribuição da IA:** Reordenação de controles de interface
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael

## Registro da atividade 0020

Declaro que utilizei a ferramenta de Inteligência Artificial **Copilot SDK em
VS Code (versão não informada pelo ambiente)** nesta atividade: inclusão da
ação para cancelar o passeio na tela de detalhes do pet.

A ferramenta foi utilizada com a finalidade de **permitir que o tutor marque
um passeio como cancelado**, durante a etapa **Etapa 5 (Ajustes finais) do
Mini-Projeto**, para realizar a seguinte contribuição: **inclusão do botão
Cancelar passeio integrado à atualização existente do pet e exibição de erros
de atualização**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. O resultado foi submetido à **revisão crítica humana**, e a pessoa
responsável pela atividade assume a responsabilidade pelo resultado final,
incluindo sua correção, adequação e integração ao projeto.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `src/screens/tela-pet-detalhe.tsx`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Botão Cancelar passeio integrado à atualização da API, com estado de carregamento e exibição de erros.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** Copilot SDK em VS Code (versão não informada pelo ambiente)
- **Finalidade do uso da IA:** Permitir cancelar o passeio do pet
- **Etapa da atividade:** Etapa 5 (Ajustes finais) do Mini-Projeto
- **Tipo de contribuição da IA:** Inclusão de ação de interface e exibição de erros
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael

## Registro da atividade 0021

Declaro que utilizei a ferramenta de Inteligência Artificial **Copilot SDK em
VS Code (versão não informada pelo ambiente)** nesta atividade: inclusão de
confirmações para cancelar passeio e excluir pet.

A ferramenta foi utilizada com a finalidade de **prevenir ações acidentais e
reposicionar a exclusão no cabeçalho**, durante a etapa **Etapa 5 (Ajustes
finais) do Mini-Projeto**, para realizar a seguinte contribuição: **diálogo de
confirmação Sim/Não para cancelamento e exclusão, ícone de lixeira acessível
no cabeçalho e navegação de retorno após exclusão bem-sucedida**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. O resultado foi submetido à **revisão crítica humana**, e a pessoa
responsável pela atividade assume a responsabilidade pelo resultado final,
incluindo sua correção, adequação e integração ao projeto.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `src/screens/tela-pet-detalhe.tsx`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Confirmações Sim/Não para cancelar passeio e excluir pet; exclusão movida para ícone de lixeira no cabeçalho.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** Copilot SDK em VS Code (versão não informada pelo ambiente)
- **Finalidade do uso da IA:** Prevenir cancelamentos e exclusões acidentais
- **Etapa da atividade:** Etapa 5 (Ajustes finais) do Mini-Projeto
- **Tipo de contribuição da IA:** Alteração do fluxo de ações, diálogos de confirmação e acessibilidade do botão de exclusão
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael

## Registro da atividade 0022

Declaro que utilizei a ferramenta de Inteligência Artificial **Copilot SDK em
VS Code (versão não informada pelo ambiente)** nesta atividade: correção dos
fluxos de salvamento, confirmação de exclusão, controles de preferências,
provider GlueStack, documentação e limpeza de comentários TODO legados.

A ferramenta foi utilizada com a finalidade de **concluir ajustes identificados
na revisão das etapas 1 a 5**, durante a etapa **revisão e validação da entrega**,
para realizar a seguinte contribuição: **alteração tipada do retorno das ações
da store para distinguir sucesso e falha, confirmação ao excluir na lista,
integração do provider oficial, substituição do seletor por controle segmentado,
atualização do README e remoção de comentários TODO**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. A revisão crítica final e a responsabilidade pela aprovação e
integração do resultado permanecem com Raphael Miranda.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `README.md`, `USO_IA.md`, `package.json`, `package-lock.json`, `src/app/foto-do-pet.tsx`, `src/components/gluestack-provider.tsx`, `src/components/item-pet.tsx`, `src/components/native-pet-reminder-settings.tsx`, `src/screens/pet-form.tsx`, `src/screens/tela-pet-detalhe.tsx`, `src/screens/tela-pets.tsx`, `src/screens/tela-registro.tsx`, `src/services/pet-service.ts`, `src/store/use-pet-store.ts`, `src/tela-pet.ts`, `src/theme.ts`, `src/types/pet.ts`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Corrige feedback de falhas, confirma exclusão, adiciona provider GlueStack, meta segmentada, nota EAS e checklist; remove TODOs legados.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** Copilot SDK em VS Code (versão não informada pelo ambiente)
- **Finalidade do uso da IA:** Concluir ajustes da revisão das etapas 1 a 5
- **Etapa da atividade:** Revisão e validação da entrega
- **Tipo de contribuição da IA:** Implementação de fluxos, integração de dependências, atualização de documentação e limpeza de comentários
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael

## Registro da atividade 0027

Declaro que utilizei a ferramenta de Inteligência Artificial **Copilot SDK em
VS Code (versão não informada pelo ambiente)** nesta atividade: comparação e
importação do estado completo do projeto para uma branch baseada no `main` do
repositório CESAR School.

A ferramenta foi utilizada com a finalidade de **preservar o histórico remoto
e integrar o projeto completo sem sobrescrever o `main`**, durante a etapa de
**preparação e validação da branch `pet_routine`**, para realizar a seguinte
contribuição: **comparar os históricos, importar os commits e a configuração
anteriores necessários, resolver conflitos favorecendo o projeto local nos
arquivos compartilhados, manter arquivos exclusivos do destino e executar os
typechecks do app e do backend**.

Declaro que **o nome e o endereço de e-mail fornecidos pelo usuário foram
tratados somente para atribuição dos commits; nenhum dado pessoal de terceiros
foi processado**. A revisão crítica final e a responsabilidade pela aprovação
e integração do resultado permanecem com Raphael Miranda.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `.env.example`, `.gitignore`, `AGENTS.md`, `AdobeColor-My Color Theme.jpeg`, `App.tsx` (removido), `README.md`, `USO_IA.md`, `app.json`, `babel.config.js`, `backend/src/request-body.ts`, `backend/src/routes/auth.routes.ts`, `backend/src/routes/pets.routes.ts`, `docs/MINI-PROJETO.md`, `eas.json`, `global.css`, `index.ts` (removido), `metro.config.js`, `nativewind-env.d.ts`, `package-lock.json`, `package.json`, `src/app/(auth)/_layout.tsx`, `src/app/(auth)/login.tsx`, `src/app/(auth)/signup.tsx`, `src/app/(tabs)/_layout.tsx`, `src/app/(tabs)/index.tsx`, `src/app/(tabs)/settings.tsx`, `src/app/(tabs)/stats.tsx`, `src/app/_layout.tsx`, `src/app/foto-do-pet.tsx`, `src/app/pet/[id].tsx`, `src/app/sobre.tsx`, `src/components/badge.tsx`, `src/components/botao.tsx`, `src/components/campo-texto.tsx`, `src/components/card-pet.tsx`, `src/components/card.tsx`, `src/components/formulario-pet.tsx`, `src/components/gluestack-provider.tsx`, `src/components/heading.tsx`, `src/components/hstack.tsx`, `src/components/item-pet.tsx`, `src/components/layout-autenticacao.tsx`, `src/components/lista-vazia.tsx`, `src/components/native-pet-reminder-settings.tsx`, `src/components/ota-status-card.tsx`, `src/components/texto.tsx`, `src/components/vstack.tsx`, `src/components/walk-timer.tsx`, `src/context/theme-context.tsx`, `src/data/pets.ts`, `src/lib/agrupar.ts`, `src/lib/duracao.ts`, `src/lib/erro.ts`, `src/screens/pet-form.tsx`, `src/screens/tela-cadastro.tsx`, `src/screens/tela-configuracoes.tsx`, `src/screens/tela-estatisticas.tsx`, `src/screens/tela-login.tsx`, `src/screens/tela-pet-detalhe.tsx`, `src/screens/tela-pets.tsx`, `src/screens/tela-registro.tsx`, `src/services/api.ts`, `src/services/auth-service.ts`, `src/services/notifications.ts`, `src/services/passeio-db.ts`, `src/services/pet-service.ts`, `src/store/use-auth-store.ts`, `src/store/use-pet-store.ts`, `src/tela-pet.ts`, `src/theme.ts`, `src/types/auth.ts`, `src/types/pet.ts`, `tailwind.config.js`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Importa o projeto completo em `pet_routine`, preserva o histórico e os arquivos exclusivos do destino e valida app e backend com typecheck.
- **Tratamento de dados pessoais:** Nome e e-mail do usuário usados exclusivamente para autoria/committer; nenhum dado pessoal de terceiros foi tratado.
- **Alterado pela IA (nome da IA, versão da IA):** Copilot SDK em VS Code (versão não informada pelo ambiente)
- **Finalidade do uso da IA:** Importar o projeto completo sem sobrescrever o histórico do destino
- **Etapa da atividade:** Comparação, integração e validação da branch
- **Tipo de contribuição da IA:** Comparação de históricos, integração por merge preservando os dois históricos, resolução de conflitos e execução de typechecks
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael

## Registro da atividade 0023

Declaro que utilizei a ferramenta de Inteligência Artificial **Copilot SDK em
VS Code (versão não informada pelo ambiente)** nesta atividade: correção da
falha de bundling Android provocada por dependências transitivas do provider
GlueStack.

A ferramenta foi utilizada com a finalidade de **restaurar a resolução de
módulos e a validação de tipos**, durante a etapa **correção e verificação do
bundle**, para realizar a seguinte contribuição: **declarar a dependência
ausente `@react-native-aria/overlays`, importar o provider sem carregar o
barrel de todos os componentes e ampliar o tipo de atualização do pet para
permitir atualizar o status de passeio**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. A revisão crítica final e a responsabilidade pela aprovação e
integração do resultado permanecem com Raphael Miranda.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `package.json`, `package-lock.json`, `src/components/gluestack-provider.tsx`, `src/types/pet.ts`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Corrige imports GlueStack ausentes, reduz o provider importado e atualiza o tipo de passeio; bundle Android e typecheck passaram.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** Copilot SDK em VS Code (versão não informada pelo ambiente)
- **Finalidade do uso da IA:** Corrigir falha de bundling e validar o projeto
- **Etapa da atividade:** Correção e verificação do bundle
- **Tipo de contribuição da IA:** Ajuste de dependências, import do provider e tipo de atualização
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael

## Registro da atividade 0024

Declaro que utilizei a ferramenta de Inteligência Artificial **Copilot SDK em
VS Code (versão não informada pelo ambiente)** nesta atividade: atualização do
Checklist Final de Entrega do Mini-Projeto.

A ferramenta foi utilizada com a finalidade de **registrar o que já está
implementado e o que permanece pendente**, durante a etapa **revisão da
entrega**, para realizar a seguinte contribuição: **marcar itens confirmados
por implementação e validações executadas, separando-os dos testes manuais,
builds EAS e relatório ainda pendentes**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. A revisão crítica final e a responsabilidade pela aprovação e
integração do resultado permanecem com Raphael Miranda.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `docs/MINI-PROJETO.md`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Atualiza o checklist do Mini-Projeto com implementação e validações concluídas, mantendo testes manuais, builds EAS e relatório pendentes.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** Copilot SDK em VS Code (versão não informada pelo ambiente)
- **Finalidade do uso da IA:** Atualizar o Checklist Final de Entrega
- **Etapa da atividade:** Revisão da entrega
- **Tipo de contribuição da IA:** Revisão da evidência de implementação e edição do checklist
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael

## Registro da atividade 0025

Declaro que utilizei a ferramenta de Inteligência Artificial **Copilot SDK em
VS Code (versão não informada pelo ambiente)** nesta atividade: diferenciação
dos estados de permissão de notificações no fluxo de lembrete de passeio.

A ferramenta foi utilizada com a finalidade de **atender à Regra 10 das regras
de escrita da disciplina**, durante a etapa **revisão e correção do fluxo de
permissões**, para realizar a seguinte contribuição: **retornar estados
discriminados para permissão autorizada, negada ou bloqueada, e exibir uma
orientação específica para cada falha na tela de detalhe do pet**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. A revisão crítica final e a responsabilidade pela aprovação e
integração do resultado permanecem com Raphael Miranda.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `src/services/notifications.ts`, `src/screens/tela-pet-detalhe.tsx`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Distingue permissão de notificações negada e bloqueada, mostra orientação adequada e corrige o feedback de erro do agendamento.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** Copilot SDK em VS Code (versão não informada pelo ambiente)
- **Finalidade do uso da IA:** Distinguir falhas de permissão conforme a Regra 10
- **Etapa da atividade:** Revisão e correção do fluxo de permissões
- **Tipo de contribuição da IA:** Tipagem discriminada do resultado e mensagens de orientação distintas na interface
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael

## Registro da atividade 0026

Declaro que utilizei a ferramenta de Inteligência Artificial **Copilot SDK em
VS Code (versão não informada pelo ambiente)** nesta atividade: remoção de
asserções de tipo não justificadas nos handlers do backend.

A ferramenta foi utilizada com a finalidade de **adequar a leitura de dados
externos à Regra 5 das regras de escrita**, durante a etapa **revisão de
qualidade do backend**, para realizar a seguinte contribuição: **validar os
corpos das requisições como registros de dados desconhecidos antes de acessar
campos e substituir casts de unions por verificações de pertencimento sem
asserção**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. A revisão crítica final e a responsabilidade pela aprovação e
integração do resultado permanecem com Raphael Miranda.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `backend/src/request-body.ts`, `backend/src/routes/auth.routes.ts`, `backend/src/routes/pets.routes.ts`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Substitui casts dos handlers de autenticação e pets por validação de registros e guards de união sem type assertions.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** Copilot SDK em VS Code (versão não informada pelo ambiente)
- **Finalidade do uso da IA:** Remover casts sem justificativa nas rotas
- **Etapa da atividade:** Revisão de qualidade do backend
- **Tipo de contribuição da IA:** Validação estrutural de payloads e narrowing de tipos sem assertions
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael

## Registro da atividade 0028

Declaro que utilizei a ferramenta de Inteligência Artificial **Copilot SDK em
VS Code (versão não informada pelo ambiente)** nesta atividade: inclusão do
logotipo fornecido na tela de autenticação.

A ferramenta foi utilizada com a finalidade de **melhorar a identidade visual
da tela de login**, durante a etapa de **ajuste da interface**, para realizar
a seguinte contribuição: **adicionar a imagem fornecida como asset do app e
exibi-la com dimensionamento proporcional e texto alternativo no layout de
autenticação**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. A revisão crítica final e a responsabilidade pela aprovação e
integração do resultado permanecem com Raphael Miranda.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `assets/pet-routine-logo.png`, `src/components/layout-autenticacao.tsx`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Adiciona o logo Pet Routine fornecido ao layout de autenticação, em tamanho proporcional e com descrição acessível.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** Copilot SDK em VS Code (versão não informada pelo ambiente)
- **Finalidade do uso da IA:** Melhorar a marca visual da tela de login
- **Etapa da atividade:** Ajuste da interface de autenticação
- **Tipo de contribuição da IA:** Integração do asset de imagem e atualização do layout compartilhado
- **Confirmação de revisão crítica e responsabilidade humana:** Verificado por Raphael

## Registro da atividade 0029

Declaro que utilizei a ferramenta de Inteligência Artificial **Copilot SDK em
VS Code (versão não informada pelo ambiente)** nesta atividade: restauração da
ação de registrar passeio na lista de pets.

A ferramenta foi utilizada com a finalidade de **restaurar o acesso direto ao
registro de passeio a partir do cartão do pet**, durante a etapa de **ajuste do
fluxo de interação da lista**, para realizar a seguinte contribuição:
**substituir a ação principal de foto por “Registrar passeio” e encaminhar à
tela de detalhes já aberta no formulário de registro**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. A revisão crítica final e a responsabilidade pela aprovação e
integração do resultado permanecem com Raphael Miranda.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `src/app/pet/[id].tsx`, `src/components/card-pet.tsx`, `src/components/item-pet.tsx`, `src/screens/tela-pet-detalhe.tsx`, `src/screens/tela-pets.tsx`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Restaura o botão “Registrar passeio” no cartão e abre diretamente o formulário de registro do pet selecionado.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** Copilot SDK em VS Code (versão não informada pelo ambiente)
- **Finalidade do uso da IA:** Restaurar o atalho para registrar passeio na lista de pets
- **Etapa da atividade:** Ajuste do fluxo da lista
- **Tipo de contribuição da IA:** Atualização dos componentes e passagem de parâmetro para abrir o formulário de registro
- **Confirmação de revisão crítica e responsabilidade humana:** revisão por Raphael Miranda

## Registro da atividade 0030

Declaro que utilizei a ferramenta de Inteligência Artificial **Copilot SDK em
VS Code (versão não informada pelo ambiente)** nesta atividade: documentação
visual do redesign da interface com capturas fornecidas pelo usuário.

A ferramenta foi utilizada com a finalidade de **documentar as decisões
visuais e de usabilidade com evidências antes/depois**, durante a etapa de
**atualização do README**, para realizar a seguinte contribuição: **organizar
as capturas em `docs/capturas/`, criar comparativos do login e da lista de
pets e incluir imagens das telas de estatísticas e configurações após o
redesign**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. A revisão crítica final e a responsabilidade pela aprovação e
integração do resultado permanecem com Raphael Miranda.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `README.md`, `USO_IA.md`, `docs/capturas/antes-login.png`, `docs/capturas/depois-login.png`, `docs/capturas/antes-meus-pets.png`, `docs/capturas/depois-meus-pets.png`, `docs/capturas/depois-estatisticas.png`, `docs/capturas/depois-configuracoes.png`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Documenta o redesign com comparativos de login e lista de pets e capturas das telas finais de estatísticas e configurações.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** Copilot SDK em VS Code (versão não informada pelo ambiente)
- **Finalidade do uso da IA:** Documentar evidências visuais do redesign
- **Etapa da atividade:** Atualização da documentação da interface
- **Tipo de contribuição da IA:** Organização de imagens fornecidas e edição da seção de capturas do README
- **Confirmação de revisão crítica e responsabilidade humana:** Revisão por Raphael Miranda

## Registro da atividade 0031

Declaro que utilizei a ferramenta de Inteligência Artificial **Copilot SDK em
VS Code (versão não informada pelo ambiente)** nesta atividade: inclusão no
repositório da imagem `Code_Generated_Image.png`, solicitada pelo usuário.

A ferramenta foi utilizada com a finalidade de **incluir no commit o arquivo
de imagem que permanecia fora do controle de versão**, durante a etapa de
**preparação do PR**, para realizar a seguinte contribuição: **verificar o
arquivo, confirmar que é idêntico ao logo já usado no app e adicioná-lo ao
repositório pelo nome solicitado**.

Declaro que **não houve tratamento de dados pessoais** durante o uso da
ferramenta. A revisão crítica final e a responsabilidade pela aprovação e
integração do resultado permanecem com Raphael Miranda.

- **Revisado por (nome do usuário que está fazendo as edições):** Raphael Miranda
- **Arquivo / Arquivos alterado(s):** `Code_Generated_Image.png`, `USO_IA.md`
- **Breve resumo do que foi feito (200 caracteres ou menos):** Adiciona a imagem solicitada ao repositório; seu conteúdo é idêntico ao asset `assets/pet-routine-logo.png`.
- **Tratamento de dados pessoais:** Não houve
- **Alterado pela IA (nome da IA, versão da IA):** Copilot SDK em VS Code (versão não informada pelo ambiente)
- **Finalidade do uso da IA:** Incluir o arquivo de imagem solicitado no repositório
- **Etapa da atividade:** Preparação do PR
- **Tipo de contribuição da IA:** Verificação de identidade da imagem e preparação do registro para commit
- **Confirmação de revisão crítica e responsabilidade humana:** A revisão crítica final e a responsabilidade pela aprovação e integração do resultado permanecem com Raphael Miranda
