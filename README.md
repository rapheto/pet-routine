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
| **1 (Aula 6)** | Expo Router, foto do pet com `expo-image-picker` e rota `/sobre` | ✅ Concluída |
| **2 (Aula 7)** | Abas, detalhe `/pet/[id]` e notificações locais | ✅ Concluída |
| **3 (Aula 8)** | Tema claro/escuro, cronômetro de passeio e histórico em SQLite | ✅ Concluída |
| **4 (Aula 9)** | Autenticação JWT, Auth Guard e CRUD de pets no backend | ✅ Concluída |
| **5 (Aula 10)** | GlueStack/NativeWind, `@expo/ui`, OTA e EAS Build | ⏳ Pendente |

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

**Regras da disciplina**
- Sem `any`, sem `JSX.Element`, sem `margin` entre irmãos, sombra com `boxShadow`, `gap` para espaçamento, `renderItem` memoizado, listas com estado vazio, listeners e intervalos com cleanup e `expo-image` com `contentFit` explícito.
- `npm run typecheck` passa sem erros.

## Práticas da Aula 1

Os esqueletos das práticas de `PRATICA.md` já estão no repositório. Cada `TODO Px.y` no código corresponde a um item do enunciado — resolva na ordem.

| Prática | Arquivo | Escopo |
|---|---|---|
| 1 — Modelagem do domínio Pet | `src/types/pet.ts` | TypeScript puro |
| 2 — Serviço mockado | `src/services/petService.ts` | TypeScript puro |
| 2 — Estado de tela | `src/tela-pet.ts` | TypeScript puro |
| 3 — Relatório de plataforma | `docs/pratica-03-relatorio-plataforma.md` | Texto |
| 4 — Material desatualizado *(bônus)* | `docs/pratica-04-material-desatualizado.md` | Texto |

As Práticas 1 e 2 **não precisam de React Native nem do Expo** — são verificáveis só com o compilador:

```bash
npm run typecheck        # equivale a `npx tsc --noEmit`
npm run pratica:tela     # roda src/tela-pet.ts via tsx
```

## Próximos passos (exercícios)

Os `TODO` deixados no código apontam para os exercícios de `exercises.md` de cada aula. Resolva-os na ordem em que aparecem e mantenha um commit por exercício (ou por bloco), para que o histórico da branch sirva de evidência de progresso.

## Decisões de Projeto (Prática 2)

- **Decisão de modelagem**: Optamos por utilizar a prop condicional `destacado?: boolean` no componente `Card` no lugar de criar componentes separados. Como o destaque do cartão reflete mudanças mínimas de interface (bordas diferentes), o uso de um booleano mantém o componente genérico e de simples utilização.
- **Decisão de organização de estilo**: As cores, os espaçamentos principais e as propriedades fixas de tipografia viraram tokens no `theme.ts` visando assegurar a consistência visual geral da aplicação. Já atributos de disposição e estruturais (como `flexDirection`, alinhamentos e variações focadas da margem interna) ficaram como estilos locais nos componentes, já que refletem a necessidade espacial e estrutural local de cada exibição.

## Decisões da Prática 3

- **SectionList**: escolhi `SectionList` em vez de `FlatList` porque a tela precisa separar visualmente os pets por status do passeio. Assim o tutor encontra primeiro os passeios pendentes, sem uma lógica de cabeçalho misturada com cada item.
- **Agrupamento**: o filtro e o agrupamento ficam em `src/lib/agrupar.ts`, fora do JSX. Primeiro filtro pelo nome e depois agrupo por status; desse jeito uma busca sem resultado não deixa seções vazias aparecendo.
- **Accuracy**: uso `Location.Accuracy.High` porque o registro precisa de uma localização útil para contextualizar o passeio, mas não precisa da precisão extrema de navegação. É um equilíbrio melhor entre precisão e bateria do que `BestForNavigation`.
- **Limitações assumidas**: a localização é uma leitura única e a câmera é fechada depois da foto. Não há subscription para limpar nesta prática; a assinatura de sensores fica para a Aula 6. A foto fica no cache do aparelho, sem ser salva na galeria.
- **Imagens**: uso `contentFit="cover"` nas prévias para preencher o espaço do card sem deformar a imagem, aceitando um pequeno corte nas bordas.
