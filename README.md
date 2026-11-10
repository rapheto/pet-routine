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
