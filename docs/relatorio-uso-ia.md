# Relatório de Uso de Inteligência Artificial — Mini-Projeto (Unidade 2)

> **Disciplina:** Desenvolvimento Mobile (2026.2.DM) — CESAR School  
> **Projeto:** App de Gestão e Rotina Pet (`pet-routine-expo`)  
> **Estudante:** Raphael Rennan Soares de Miranda  
> **Data:** 13/11/2026

---

## 1. Declaração Obrigatória (Política de Governança de IA do CESAR)

> ⚠️ **Preenchimento obrigatório.** Caso não tenha utilizado nenhuma ferramenta de IA em nenhuma etapa do mini-projeto, assinale a opção correspondente abaixo e justifique na Seção 2.

- [x] **Utilizei** ferramenta(s) de Inteligência Artificial constante(s) no Catálogo de IA do CESAR e preenchi a declaração narrativa e a curadoria técnica abaixo.
- [ ] **NÃO utilizei** nenhuma ferramenta de Inteligência Artificial no desenvolvimento, refatoração de UI/UX ou documentação deste mini-projeto.

### Texto da Declaração Oficial

> *"Declaro que utilizei a(s) ferramenta(s) de Inteligência Artificial **Copilot SDK e DeepSeek V4.1 Flash Free** nesta atividade, com a finalidade de gerar rascunho, código e documentação sobre **estrutura de navegação com Expo Router e notificações locais (Etapas 1 e 2), tema claro/escuro persistido, cronômetro de passeio e histórico local em `expo-sqlite` (Etapa 3), autenticação com `sessionToken` (JWT) e integração Zustand + API/CRUD no backend (Etapa 4), refatoração de componentes com GlueStack UI, NativeWind e `@expo/ui`, incluindo OTA e EAS Build (Etapa 5), revisão de conformidade com as 20 Regras de Escrita, documentação (README e guia de testes) e ajustes finais de interface**, sobre o qual realizei análise crítica (curadoria) das informações apresentadas. Não tratei dados pessoais no uso desta ferramenta. Revisei criticamente o conteúdo gerado, identificando seus acertos e eventuais imprecisões, e assumo a responsabilidade integral pela versão final apresentada."*

---

## 2. Registro de Uso por Etapa do Mini-Projeto

Liste todas as interações relevantes realizadas com ferramentas de IA durante o desenvolvimento das Etapas 1 a 5 e na reformulação de UI/UX.

| # | Etapa do Mini-Projeto | Ferramenta e Versão | Finalidade / Resumo do Prompt | O que foi aproveitado? | O que precisou ser corrigido ou descartado? |
|---|---|---|---|---|---|
| 1 | Etapa 1 — Expo Router + `expo-image-picker` | DeepSeek V4.1 Flash Free (OpenCode) | Migrar `App.tsx` para `src/app` e criar a foto do pet | Rotas `_layout`, `index`, `foto-do-pet`, `sobre`; lista em `src/screens`; `scheme` + plugin do picker | Remoção do `App.tsx`/`index.ts` antigos; `microphonePermission: false` |
| 2 | Etapa 2 — Tabs, `[id]` e notificações | DeepSeek V4.1 Flash Free (OpenCode) | Abas, rota `/pet/[id]` e lembrete de passeio | Tabs, rota dinâmica, store Zustand, modal de cadastro, `notifications.ts` com cleanup | Canal Android derrubava o Expo Go → criado só em dev build, com `try/catch` |
| 3 | Etapa 3 — Tema, `AsyncStorage` e `expo-sqlite` | DeepSeek V4.1 Flash Free (OpenCode) | Tema persistido, cronômetro e histórico local | `theme-context`, paletas em `theme.ts`, `walk-timer`, `passeio-db` (`passeio_logs`) | Estilos migrados para a paleta ativa; `clearInterval` no cleanup |
| 4 | Etapa 4 — Auth JWT + CRUD no backend | DeepSeek V4.1 Flash Free (OpenCode); Copilot SDK na revisão | Backend real com login/cadastro, Auth Guard e CRUD | `use-auth-store`, `api.ts` (Bearer, 401/403), `auth-service`, telas de login/cadastro, CRUD | CPF e endereço removidos do tipo de usuário; `as` trocado por validação (Regra 5) |
| 5 | Etapa 5 — NativeWind, GlueStack, `@expo/ui`, OTA/EAS | DeepSeek V4.1 Flash Free (OpenCode); Copilot SDK nos ajustes | Configurar NativeWind, kit de componentes, controles nativos e build | Configs NativeWind/Tailwind, kit de UI, provider, controles nativos, `app.json`/`eas.json` | `global.css` não importado (botão invisível); `label` do `Switch` causava crash; faltava `@react-native-aria/overlays`; OTA bloqueado em `__DEV__` |
| 6 | Reformulação de UI/UX | Copilot SDK (VS Code) | Paleta da marca, padronização e organização das telas | Tokens `#019789`/`#01786E`, botões e inputs padronizados, confirmações Sim/Não | Botões reduzidos, foto em estilo contornado, exclusão no cabeçalho, eventos isolados |
| 7 | Revisão das 20 Regras + documentação | DeepSeek V4.1 Flash Free (OpenCode); Copilot SDK (VS Code) | Auditar conformidade e atualizar README, guia e checklist | `pressed`, `renderItem` memoizado, estados vazios distintos, permissões discriminadas, docs | `margin` entre irmãos, casts e `TODO` removidos |

---

## 3. Análise Crítica e Curadoria Técnica (Acertos, Erros e Alucinações)

Modelos de linguagem frequentemente sugerem APIs depreciadas do ecossistema React Native / Expo (como `@react-navigation/*` manual em vez de `expo-router`, `ImagePicker.MediaTypeOptions.Images` em vez de `['images']`, `result.cancelled` com dois "L", `shadow*`/`elevation` em vez de `boxShadow`, ou mutação direta de arrays).

Responda com base no que aconteceu durante o desenvolvimento do seu grupo:

### 3.1. Principais Acertos da Ferramenta
*(Onde a IA realmente economizou tempo sem comprometer a arquitetura da disciplina?)*
Na refatoração da UI, a configuração do Tailwind e do GlueStack foram feitas em minutos, depois foi só a IA aplicar a paleta de cores e a logo que eu criei. Além disso, a IA ajudou bastante na integração do backend com o front, migrar o app para o Expo Router e fazer a persistência local funcionar com expo-sqlite e AsyncStorage.

### 3.2. Imprecisões, Código Desatualizado ("Zumbis") ou Violações das Regras da Disciplina
*(Cite pelo menos **dois** trechos ou sugestões geradas pela IA que violavam as 20 regras de escrita da disciplina ou usavam APIs antigas do Expo SDK, mostrando o que a IA sugeriu vs. como você corrigiu.)*

1. **Problema identificado na sugestão da IA:**
   - **O que a IA gerou:** `Botões sem cor na reformulação da UI`
   - **Por que estava incorreto/desatualizado:** `De acordo com a nova paleta de cores o background se tornou da cor branca, nessa reformulação diversos botões ficaram brancos e se perderam junto com o background`
   - **Como corrigimos no código final:** `precisei voltar à versão anterior do app para comparar e identificar quais botões haviam desaparecido, e então reaplicar a eles a cor de ação da paleta na versão nova.`

2. **Problema identificado na sugestão da IA:**
   - **O que a IA gerou:** `Clicar no botão de notificação simplemente fechava o APP`
   - **Por que estava incorreto/desatualizado:** `provavelmente em versões antigas do Expo a configuração do canal de notificações do Android, era chamada direto no início do app, sem checar onde o estava sendo rodado. Só que no Expo Go atual essa função não existe de verdade no Android, então, em vez de só não funcionar, o app fechava na hora.`
   - **Como corrigimos no código final:** `o app agora percebe quando está rodando no Expo Go e não tenta criar o canal nesse ambiente`

---

## 4. Confirmação de Proteção de Dados e Autoria

- [x] Confirmo que **nenhum dado pessoal ou sensível** (próprio, de colegas ou de terceiros) nem chaves privadas reais foram inseridos nos prompts enviados às ferramentas de IA.
- [ ] Confirmo que compreendo integralmente o funcionamento de cada arquivo entregue na branch e sou capaz de explicar e modificar qualquer trecho durante a arguição/avaliação.
