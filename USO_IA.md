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
- **Confirmação de revisão crítica e responsabilidade humana:** Pendente de revisão e teste em aparelho por Raphael

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
- **Confirmação de revisão crítica e responsabilidade humana:** Pendente de revisão e teste em aparelho por Raphael


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
- **Confirmação de revisão crítica e responsabilidade humana:** Pendente de revisão e teste em aparelho por Raphael
