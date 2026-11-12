# Pet Routine Expo

**Disciplina:** Desenvolvimento Mobile (2026.2.DM) — CESAR School
**Branch:** `main`

## Sobre o projeto

App de Gestão e Rotina Pet: um aplicativo para tutores de animais de estimação organizarem a rotina, passeios e histórico de saúde dos pets.

Este projeto é usado nas atividades guiadas e aplicadas da disciplina ao longo do semestre. Cada aula adiciona uma camada nova por cima da anterior — o histórico de commits desta branch é, em si, um registro do progresso.

## Mini-Projeto — Segunda Unidade (AV2)

Esta branch parte das Práticas 1 a 3 concluídas e contém:

- **Enunciado completo e roteiro (Etapas 1 a 5):** [`docs/MINI-PROJETO.md`](./docs/MINI-PROJETO.md)
- **Backend REST fornecido pelo professor (Express + SQLite + JWT):** [`backend/README.md`](./backend/README.md)
- **Template do Relatório de Uso de IA:** [`docs/relatorio-uso-ia.md`](./docs/relatorio-uso-ia.md)
- **Passo a passo de teste e checklist:** [`docs/testar_etapas.md`](./docs/testar_etapas.md)

### Como rodar o Backend e o App

Em um terminal (Backend):
```bash
cd backend
npm install
npm run dev
```

Em outro terminal (App Expo):
```bash
npm install
npx expo start
```

## Como rodar

```bash
npm install
npx expo start
```

Abra o app **Expo Go** no celular e escaneie o QR code (ou use um emulador). Requisito: **Node.js 22.11+**.

> 🔁 Ao alterar `babel.config.js`, `metro.config.js`, `tailwind.config.js` ou `global.css`, reinicie o Metro com `npx expo start -c` para limpar o cache do NativeWind.

### Autenticação e backend (Etapa 4)

O app não usa mais dados mockados: login, cadastro e o CRUD de pets conversam com o backend em `./backend`.

1. Copie `.env.example` para `.env` e ajuste `EXPO_PUBLIC_API_URL` conforme o ambiente:

| Ambiente | Valor |
|---|---|
| iOS Simulator / Web | `http://localhost:3000` |
| Android Emulator | `http://10.0.2.2:3000` |
| Celular físico | `http://SEU_IP_NA_REDE:3000` |

2. Suba o backend (`cd backend && npm install && npm run dev`) e entre com a conta de demonstração `tutor@cesar.school` / `123456`, ou crie uma conta em `/(auth)/signup`.

A sessão (`sessionToken` + usuário) é persistida no `AsyncStorage` pela `useAuthStore`; ao reabrir o app, o Auth Guard do `src/app/_layout.tsx` mantém o tutor logado sem piscar a tela de login.

## Estado atual do desenvolvimento

| Etapa | Escopo | Situação |
|---|---|---|
| **1 (Aula 6)** | Expo Router, foto do pet com `expo-image-picker` e rota `/sobre` | Implementada; validar em aparelho |
| **2 (Aula 7)** | Abas, detalhe `/pet/[id]` e notificações locais | Implementada; validar em aparelho |
| **3 (Aula 8)** | Tema claro/escuro, cronômetro de passeio e histórico em SQLite | Implementada; validar em aparelho |
| **4 (Aula 9)** | Autenticação JWT, Auth Guard e CRUD de pets no backend | Implementada; validar em aparelho |
| **5 (Aula 10)** | GlueStack/NativeWind, `@expo/ui`, OTA e EAS Build | Implementada; validar em aparelho |

> 🧪 **Como validar:** o passo a passo de teste e o checklist completo estão em [`docs/testar_etapas.md`](./docs/testar_etapas.md).

### O que já está implementado

**Etapa 1 — navegação e foto**
- `package.json` com `"main": "expo-router/entry"`; `App.tsx` e `index.ts` removidos.
- Rotas em `src/app/`: `_layout.tsx`, `sobre.tsx` e `foto-do-pet.tsx`.
- Foto da galeria ou da câmera com recorte `1:1`, `quality: 0.8`, `mediaTypes: ['images']`, cancelamento tratado e mensagens distintas para permissão **negada** e **bloqueada**.
- `app.json` com `scheme: petroutine` e plugin do `expo-image-picker` (sem microfone).

**Etapa 2 — abas, detalhe e notificações**
- Abas **Meus Pets** e **Estatísticas** com ícones do `@expo/vector-icons`.
- Lista em `SectionList` agrupada por status, com busca por nome, cadastro em modal e `ListEmptyComponent` que diferencia conta sem pets de busca sem resultado.
- Rota dinâmica `src/app/pet/[id].tsx` com todos os dados do pet, alternância de passeio, registro com GPS/câmera, troca de foto e exclusão.
- `expo-notifications`: handler em foreground, canal Android, lembrete agendado para **5 s** com `{ petId }` e listeners com cleanup que abrem `/pet/[id]` ao tocar na notificação.
- No **Expo Go do Android (SDK 53+)** o gerenciador nativo de canais não existe: o app detecta o ambiente (`ExecutionEnvironment.StoreClient`) e não chama `setNotificationChannelAsync`, evitando o `NullPointerException`. O lembrete local continua funcionando no canal padrão; para o comportamento completo (canal próprio e push), use um **development build**.

**Etapa 3 — tema, hooks e persistência local**
- `ThemeProvider` + `useTheme()` (`src/context/theme-context.tsx`) com paletas clara/escura em `src/theme.ts`, aplicadas em todas as telas, abas, cabeçalhos e status bar; preferência persistida em `@petroutine:theme`.
- `src/components/walk-timer.tsx`: cronômetro com `useEffect`, atualização funcional e `clearInterval` no cleanup.
- `src/services/passeio-db.ts`: banco `petroutine.db`, tabela `passeio_logs` (`id`, `petId`, `seconds`, `createdAt`) com placeholders `?`; histórico listado no detalhe do pet.
- Controle de tema na aba Estatísticas.

**Etapa 4 — autenticação e backend**
- `useAuthStore` persistida em `@petroutine:auth-session` com `sessionToken`, `user` e `isHydrated`.
- `apiFetch` centralizado com `BASE_URL`, `Authorization: Bearer <token>`, leitura de JSON/texto e logout automático em `401/403`.
- Telas de **Login** e **Cadastro** com validação, loading e mensagens de erro; **Sair da conta** em Estatísticas/Perfil.
- Auth Guard no layout raiz: sem token vai para `/(auth)/login`; com token em `(auth)` vai para `/(tabs)`.
- `usePetStore` 100% REST: `GET`, `POST`, `PATCH` (toggle/passeio), `PUT` e `DELETE` em `/pets`, com estados de carregamento e erro na lista.

**Etapa 5 — UI/UX, `@expo/ui`, OTA e EAS Build**
- **NativeWind v4 + Tailwind** configurados (`babel.config.js`, `metro.config.js`, `tailwind.config.js`, `global.css`, `nativewind-env.d.ts`). O `global.css` é importado uma única vez no `src/app/_layout.tsx`; sem esse import as classes `className` não são registradas e os botões/inputs ficam sem altura e espaçamento.
- Kit de UI local em `src/components/` (`Card`, `VStack`, `HStack`, `Heading`, `Text`, `Badge`, `Input`, `Button`), com o provider oficial do GlueStack (`@gluestack-ui/themed`) e sincronização do tema com NativeWind.
- Todas as telas reformuladas: Login, Cadastro, Meus Pets, `CardPet`, Detalhe/Registro de Passeio, Estatísticas/Perfil, Foto do Pet e Sobre.
- `native-pet-reminder-settings.tsx` com `<Host matchContents>` + `<Switch>` e `SegmentedControl` do `@expo/ui`.
- `ota-status-card.tsx` com `Updates.useUpdates()`, canal e `runtimeVersion`, e `checkForUpdateAsync → fetchUpdateAsync → reloadAsync` bloqueado em `__DEV__`.
- `app.json` com `runtimeVersion`, `bundleIdentifier`, `package` e `updates`; `eas.json` com perfis `development`, `preview` (APK / simulador iOS) e `production`.

**Regras da disciplina**
- Sem `any`, sem `JSX.Element`, sem `margin` entre irmãos, sombra com `boxShadow`, `gap` para espaçamento, `renderItem` memoizado, listas com estado vazio, listeners e intervalos com cleanup e `expo-image` com `contentFit` explícito.

### Checklist da entrega

- [x] Etapas 1 a 5 implementadas no código e descritas neste README.
- [x] Cancelamento e exclusão de pet pedem confirmação antes de alterar dados.
- [x] Falhas ao salvar passeio, foto ou excluir pet não são tratadas como sucesso.
- [x] Preferências usam controles nativos, incluindo uma meta segmentada compatível com `@expo/ui` do SDK 57.
- [x] `npm run typecheck` passou.
- [x] Bundle Android gerado com `npx expo export --platform android`.
- [x] `npm run pratica:tela` e `git diff --check` passaram.
- [ ] Validar os fluxos funcionais em aparelhos/emuladores iOS e Android.
- [ ] Gerar e testar os builds EAS de preview/produção.
- [ ] Configurar uma URL de API acessível nos builds Preview antes de distribuir.
- [ ] Capturar as telas finais e anexar as evidências solicitadas.
- [ ] Preencher `docs/relatorio-uso-ia.md` e anexar as evidências solicitadas.

## Reformulação de UI/UX

A Etapa 5 substituiu a UI “funcional” das etapas anteriores por uma interface com acabamento de produto, mantendo os tokens de `src/theme.ts` como fonte única das cores.

### Paleta da marca

| Uso | Token | Claro |
|---|---|---|
| Títulos, logotipo, ícones ativos | `primaria` | `#019789` |
| Botões de ação preenchidos | `primariaForte` | `#01786E` |
| Fundo do app e dos cartões | `fundo` / `cartao` | `#FFFFFF` |
| Texto principal (complemento) | `texto` | `#070302` |
| Status pendente / métrica de pendentes | `ambar` | `#FFEACB` |
| Status cancelado / erros | `rosa` | `#FDDAD8` |
| Status concluído, progresso e porte do pet | `verde` | `#DCEFDC` |
| Espécie do pet e dados informativos | `azul` | `#D3EAFC` |

O tema escuro mantém as mesmas chaves, com os pastéis convertidos em superfícies profundas do mesmo matiz.

### Decisões visuais e de usabilidade

1. **Componentes locais com NativeWind e provider GlueStack.** O kit em `src/components/` (`Card`, `VStack`, `HStack`, `Heading`, `Text`, `Badge`, `Input`, `Button`) usa `className` do NativeWind para layout, espaçamento e tipografia. O provider oficial vem de `@gluestack-ui/themed` 1.1.x com o tema de `@gluestack-ui/config`; como o CLI v2 disponível não inicializou neste ambiente, os componentes continuam locais. As cores seguem o `useTheme`, mantendo a preferência clara/escura do app.
2. **Hierarquia visual em três níveis.** `Heading` tem `pagina` (título da tela), `secao` (título de bloco) e `destaque` (números e marca). Títulos usam o verde da marca (`primaria` para página/destaque e `primariaForte` para seção, por contraste); textos de apoio usam `tom="fraco"`.
3. **Badges semânticos em tons pastel.** O status do passeio (`Pendente` = âmbar `#FFEACB`, `Concluído` = verde `#DCEFDC`, `Cancelado` = rosa `#FDDAD8`), a espécie (azul `#D3EAFC`) e o porte (verde `#DCEFDC`) aparecem como etiquetas preenchidas com texto escuro, legíveis sem depender só de cor.
4. **Espaçamento consistente.** `gap`/`VStack`/`HStack` substituem margens individuais; nenhum elemento fica colado nas bordas; telas com lista respeitam a Safe Area e os títulos são sticky com fundo opaco.
5. **Feedbacks completos.** `Button` tem estado `pressed`, fica desabilitado durante requisições e mostra `ActivityIndicator`; inputs mudam de borda ao receber foco; chips têm área de toque de 40 pt e feedback de toque; alvos de toque têm no mínimo 44 pt; listas e sessão têm telas de carregamento; erros aparecem em cartões rosa com `accessibilityRole="alert"`; estados vazios distinguem “conta sem pets” de “busca sem resultado” e oferecem CTA.
6. **Controles nativos do sistema.** Em Estatísticas, `@expo/ui` monta um `Switch` e um `SegmentedControl` (SwiftUI no iOS, Jetpack Compose no Android), com o tema acompanhando a preferência do app.
7. **Transparência sobre atualizações.** O cartão OTA mostra canal e runtime em execução e bloqueia a busca em `__DEV__`, evitando mensagens de erro confusas no Expo Go.

### Antes × depois

| Tela | Antes (Etapas 1–4) | Depois (Etapa 5) |
|---|---|---|
| Login/Cadastro | Campos soltos em `ScrollView` com botão de texto | Cabeçalho com marca e subtítulo, cartões de erro, inputs altos (48 px) e botão com loading |
| Meus Pets | Título só no header de navegação, busca + botão simples | Cabeçalho com contagem, busca do kit, CTA destacado, cabeçalhos de seção com badge |
| `CardPet` | Miniatura larga, textos empilhados, status como texto colorido | Miniatura 96×96, badges pastel de espécie/porte/status, hierarquia clara e ação preenchida |
| Detalhe/Registro | Botões iguais empilhados, foto 16:9 sem moldura | Foto com cantos arredondados, cartões por assunto, cronômetro em destaque e botões por prioridade |
| Estatísticas/Perfil | Duas linhas de métricas e lista de cartões | Grade 2×2, barra de progresso do dia, `@expo/ui`, card OTA e logout com loading |

### Capturas de tela

As capturas devem ser geradas no emulador/aparelho (não são versionadas pelo build). Coloque os arquivos em `docs/capturas/` com os nomes abaixo — o guia em [`docs/capturas/README.md`](./docs/capturas/README.md) descreve cada tomada:

| Momento | Arquivo sugerido |
|---|---|
| Antes (referência das Etapas 1–4) | `antes-meus-pets.png` |
| Login reformulado | `depois-login.png` |
| Meus Pets com badges | `depois-meus-pets.png` |
| Detalhe do pet | `depois-pet-detalhe.png` |
| Estatísticas com `@expo/ui` e OTA | `depois-estatisticas.png` |
| Mesma tela no tema escuro | `depois-estatisticas-escuro.png` |

> 📸 Para capturar: `npx expo start` → no simulador, `Cmd+S` (iOS) ou `Ctrl+S` (Android); no aparelho, use os botões físicos. Salve em `docs/capturas/` e referencie esta seção no relatório.

### Build com EAS

```bash
# APK de preview para Android (perfil "preview")
npx eas build --profile preview --platform android

# Build para iOS Simulator
npx eas build --profile preview --platform ios
```

O perfil `preview` publica no canal `preview`, usa `buildType: "apk"` no Android e `simulator: true` no iOS. Atualmente, `eas.json` aponta `EXPO_PUBLIC_API_URL` para `http://192.168.0.10:3000`, um endereço privado da rede local: o APK só alcançará esse backend se o aparelho estiver na rede compatível, com o servidor acessível e sem bloqueio de firewall. Antes de distribuir o APK, substitua esse valor por um endereço alcançável pelos aparelhos de teste (ou configure o IP correto da rede).

## Práticas da Aula 1

Os arquivos de apoio das práticas permanecem no repositório; as implementações de domínio e estado de tela estão preenchidas. `src/services/pet-service.ts` é um serviço mockado de exercício e não substitui o backend REST usado pela aplicação.

| Prática | Arquivo | Escopo |
|---|---|---|
| 1 — Modelagem do domínio Pet | `src/types/pet.ts` | TypeScript puro |
| 2 — Serviço mockado | `src/services/pet-service.ts` | TypeScript puro |
| 2 — Estado de tela | `src/tela-pet.ts` | TypeScript puro |
| 3 — Relatório de plataforma | `docs/pratica-03-relatorio-plataforma.md` | Texto |
| 4 — Material desatualizado *(bônus)* | `docs/pratica-04-material-desatualizado.md` | Texto |

As Práticas 1 e 2 **não precisam de React Native nem do Expo** — são verificáveis só com o compilador:

```bash
npm run typecheck        # equivale a `npx tsc --noEmit`
npm run pratica:tela     # roda src/tela-pet.ts via tsx
```

## Exercícios

Consulte `exercises.md` e os enunciados da disciplina para atividades adicionais. O código de apoio das práticas não mantém instruções pendentes de implementação em comentários.

## Decisões de Projeto (Prática 2)

- **Decisão de modelagem**: Optamos por utilizar a prop condicional `destacado?: boolean` no componente `Card` no lugar de criar componentes separados. Como o destaque do cartão reflete mudanças mínimas de interface (bordas diferentes), o uso de um booleano mantém o componente genérico e de simples utilização.
- **Decisão de organização de estilo**: As cores, os espaçamentos principais e as propriedades fixas de tipografia viraram tokens no `theme.ts` visando assegurar a consistência visual geral da aplicação. Já atributos de disposição e estruturais (como `flexDirection`, alinhamentos e variações focadas da margem interna) ficaram como estilos locais nos componentes, já que refletem a necessidade espacial e estrutural local de cada exibição.

## Decisões da Prática 3

- **SectionList**: escolhi `SectionList` em vez de `FlatList` porque a tela precisa separar visualmente os pets por status do passeio. Assim o tutor encontra primeiro os passeios pendentes, sem uma lógica de cabeçalho misturada com cada item.
- **Agrupamento**: o filtro e o agrupamento ficam em `src/lib/agrupar.ts`, fora do JSX. Primeiro filtro pelo nome e depois agrupo por status; desse jeito uma busca sem resultado não deixa seções vazias aparecendo.
- **Accuracy**: uso `Location.Accuracy.High` porque o registro precisa de uma localização útil para contextualizar o passeio, mas não precisa da precisão extrema de navegação. É um equilíbrio melhor entre precisão e bateria do que `BestForNavigation`.
- **Limitações assumidas**: a localização é uma leitura única e a câmera é fechada depois da foto. Não há subscription para limpar nesta prática; a assinatura de sensores fica para a Aula 6. A foto fica no cache do aparelho, sem ser salva na galeria.
- **Imagens**: uso `contentFit="cover"` nas prévias para preencher o espaço do card sem deformar a imagem, aceitando um pequeno corte nas bordas.
