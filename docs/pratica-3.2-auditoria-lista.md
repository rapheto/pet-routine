# Auditoria de lista — TelaPets

## 1. Problemas encontrados

| # | Trecho | Problema | Sintoma para o usuário | Correção |
|---|---|---|---|---|
| 1 | `<ScrollView>` envolvendo a `<FlatList>` | A lista fica dentro de outra lista vertical. Isso atrapalha a virtualização da `FlatList`. | Com muitos pets, a tela pode ficar lenta, travar e mostrar aviso de listas aninhadas. | Tirar o `ScrollView` e usar `ListHeaderComponent` e `ListFooterComponent`. |
| 2 | `alvo.statusPasseio = 'concluido'` | O objeto é alterado diretamente. | A pessoa toca para registrar, mas o status pode não mudar na hora. | Criar outro objeto com spread dentro de um `map`. |
| 3 | `setPets(pets)` | O mesmo array é enviado novamente para o estado. | A tela fica com o status antigo até acontecer outra atualização. | Criar um array novo antes de chamar `setPets`. |
| 4 | `keyExtractor={(item, index) => index.toString()}` | O índice não é uma identidade estável do pet. | Depois de filtrar, uma linha pode parecer mostrar o pet ou o estado de outro. | Usar `keyExtractor={(item) => item.id}`. |
| 5 | `p.nome.includes(busca)` | A busca diferencia maiúsculas de minúsculas e não tira espaços extras. | Buscar `rex` pode não encontrar `Rex`, por exemplo. | Usar `trim().toLowerCase()` no nome e na busca. |
| 6 | Falta de `ListEmptyComponent` | Não existe um estado para lista vazia. | Quando nada é encontrado, aparece só um espaço vazio e a pessoa não sabe o que aconteceu. | Mostrar uma mensagem diferente para lista vazia e busca sem resultado. |
| 7 | `<Text onPress={...}>` | O texto está sendo usado como botão. | É mais difícil tocar e não existe um feedback claro de que o toque funcionou. | Usar `Pressable` com `onPress`, `pressed` e acessibilidade. |
| 8 | `initialNumToRender={100}` | A tela tenta renderizar 100 itens logo de início. | A abertura fica mais demorada e gasta mais memória, mesmo que poucos itens estejam visíveis. | Voltar ao default de 10 ou ajustar só depois de medir. |
| 9 | `windowSize={50}` | O código mantém uma área muito grande da lista preparada. O default é 21. | A rolagem pode ficar mais pesada e gastar mais memória sem uma melhora comprovada. | Começar com o default e medir antes de alterar. |
| 10 | `removeClippedSubviews={true}` | Essa configuração não resolve o `ScrollView` externo e foi colocada sem medição. | Em alguns aparelhos, itens podem sumir ou aparecer com falhas durante a rolagem. | Remover até existir um caso medido que justifique usar. |
| 11 | `id: String(antigos.length)` | O tamanho da lista não garante um ID único. | Depois de remover itens, um novo registro pode receber o ID de outro. | Usar um ID realmente único, vindo do domínio ou gerado corretamente. |
| 12 | `function registrar(id)` | O parâmetro não está tipado. | Com TypeScript estrito, o projeto pode nem compilar. | Declarar `id: string`. |

**Declaração:** usamos IA como apoio para fazer esta atividade, revisar os problemas encontrados e organizar as correções.

## 2. O problema arquitetural

Para mim, o problema mais grave é o `ScrollView` envolvendo a `FlatList`. A `FlatList` foi feita para não deixar todos os itens montados ao mesmo tempo. Ela mostra primeiro só o que está perto da tela e vai carregando o resto durante a rolagem.

Quando ela fica dentro do `ScrollView`, o React Native perde o controle correto do tamanho e da rolagem da lista. Com isso, a virtualização deixa de ajudar e muitos itens podem acabar sendo medidos ou renderizados. Por isso, aumentar `windowSize` ou `initialNumToRender` não resolve o problema. Com 4.000 pets, essa escolha pode deixar a tela pesada antes mesmo dos outros bugs aparecerem.

**Declaração:** usamos IA como apoio para fazer esta atividade e conferimos a explicação do problema arquitetural com o código do enunciado.

## 3. Os três ajustes de desempenho deste arquivo

- **`removeClippedSubviews`**: no Android, o default já é `true`; no iOS, normalmente é `false`. Ativar pode economizar alguma renderização fora da tela, mas também pode fazer conteúdo desaparecer em alguns casos. Além disso, não resolve o `ScrollView` por fora.
- **`windowSize={50}`**: o default é 21 viewports. Colocar 50 deixa muito mais conteúdo preparado ao redor da tela e pode aumentar o uso de memória. Não há evidência no código de que esse valor foi medido.
- **`initialNumToRender={100}`**: o default é 10 itens. Renderizar 100 logo na abertura aumenta o trabalho inicial e não faz sentido se a tela só mostra alguns itens. Eu só mudaria esse valor depois de medir em aparelhos reais.

**Declaração:** usamos IA como apoio para fazer esta atividade e para organizar a comparação entre os valores usados e os defaults.

## 4. O bug de "às vezes não atualiza"

O problema acontece porque o código muda `alvo` diretamente e depois chama `setPets(pets)` usando o mesmo array. A documentação trata a `FlatList` como uma `PureComponent`, que faz uma comparação rasa das props. Como a referência de `data` continua igual, ela pode entender que nada mudou e não renderizar a linha novamente.

Por isso parece que funciona “às vezes”: alguma outra ação pode forçar uma nova renderização e o status alterado aparece só depois.

Existem duas possibilidades:

1. Fazer a atualização corretamente, criando um novo array e um novo objeto com `map` e spread.
2. Usar `extraData` para avisar à lista que existe outro estado usado pelo item.

Eu escolheria a primeira opção. `extraData` pode ajudar quando o item depende de um estado externo, mas aqui não corrige a mutação do objeto e seria mais um remendo.

**Declaração:** usamos IA como apoio para fazer esta atividade e revisamos a causa do bug a partir do comportamento da `FlatList` mostrado no código.

## 5. Ordem de refatoração — tenho meio dia

| Ordem | O que faço | Risco se não fizer | Retorno |
|---|---|---|---|
| 1 | Remover o `ScrollView` e colocar título, busca e rodapé na própria lista. | A tela pode continuar travando com muitos pets. | Recupera a principal vantagem da `FlatList`: a virtualização. |
| 2 | Corrigir o registro usando atualização imutável. | A pessoa registra o passeio, mas não vê o status mudar. | Corrige o bug mais visível e deixa o estado confiável. |
| 3 | Usar IDs estáveis em vez do índice. | A lista pode reaproveitar a linha errada depois de um filtro. | Evita bugs visuais difíceis de perceber. |
| 4 | Trocar o texto por `Pressable` e adicionar estado vazio. | O toque fica ruim e a tela vazia parece quebrada. | Melhora a interação e explica ao usuário o que aconteceu. |
| 5 | Tirar os valores de desempenho alterados e medir a tela. | O time pode continuar usando uma configuração que piora a memória. | Evita tentar otimizar no chute. |
| 6 | Corrigir a busca e tipar `id`. | A busca pode falhar e o TypeScript pode reclamar no build. | São ajustes pequenos e rápidos. |

**Declaração:** usamos IA como apoio para fazer esta atividade e para ajudar a priorizar as correções pelo impacto para o usuário.

## 6. O que eu decidi NÃO corrigir

Eu não escolheria outros números para `windowSize`, `initialNumToRender` e `removeClippedSubviews` agora. Primeiro eu corrigiria o `ScrollView` e depois mediria a tela em aparelhos diferentes. Trocar um número por outro sem medir seria só um chute e poderia dar a impressão de que o problema foi resolvido.

**Declaração:** Usei IA como apoio para fazer esta atividade, mas a decisão de não escolher números sem medir foi mantida como uma decisão da análise.
