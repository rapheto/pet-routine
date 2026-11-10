# Auditoria — TelaPasseio

## 1. Problemas de permissão

<!-- Pelo menos três. Para cada um: o sintoma que o usuário sente,
     a causa no código, e a correção em uma frase. -->

| # | Sintoma para o usuário | Causa no código | Correção |
|---|---|---|---|
| 1 | A pessoa nega a localização uma vez e, quando tenta de novo, o app não pede a permissão novamente. | `jaPediuPermissao` vira `true` mesmo se a resposta tiver sido negada. | Conferir `status` e `canAskAgain`; se ainda puder perguntar, pedir de novo, e se estiver bloqueada orientar a abrir as configurações. |
| 2 | Com o GPS desligado ou sem permissão, o botão pode não mostrar uma orientação clara e a tela pode ficar sem registros. | O código não chama `hasServicesEnabledAsync()` e ignora o resultado de `requestForegroundPermissionsAsync()`. | Separar GPS desligado, permissão negada e permissão bloqueada em mensagens diferentes antes de chamar `getCurrentPositionAsync`. |
| 3 | Em aparelhos sem GPS disponível, pode aparecer um erro técnico ou a tela pode parecer que não respondeu. | `getCurrentPositionAsync` e `watchPositionAsync` não estão dentro de um tratamento de erro. | Usar `try/catch`, mostrar uma mensagem para o usuário e deixar o passeio continuar sem localização quando isso for possível. |
| 4 | A pessoa toca cinco vezes em “Iniciar passeio” e o celular esquenta, descarrega rápido e mostra registros repetidos. | Cada toque abre novas leituras de localização e do acelerômetro, sem verificar se já existe uma leitura ativa. | Desabilitar o botão durante a inicialização ou guardar as subscriptions e impedir uma segunda sessão ativa. |

**Declaração:** usamos IA como apoio para fazer esta atividade e para revisar os problemas de permissão encontrados no código.

## 2. Vazamentos

<!-- Quais torneiras ficam abertas? O que acontece com a bateria
     e com a memória? Quantas vezes elas são abertas se o usuário
     tocar em "Iniciar passeio" cinco vezes? -->

Existem duas torneiras abertas:

- `Location.watchPositionAsync(...)` cria uma subscription, mas o retorno dela não é guardado e seu `remove()` nunca é chamado.
- `Accelerometer.addListener(...)` também cria uma subscription e o retorno não é guardado nem removido.

Se a pessoa tocar cinco vezes, são abertas cinco subscriptions de localização e cinco listeners do acelerômetro. Todas continuam trabalhando ao mesmo tempo. Isso gasta bateria, faz mais callbacks serem executados e adiciona registros repetidos no estado. Se a tela sair ou for montada de novo, o problema continua porque não existe cleanup.

**Declaração:** usamos IA como apoio para fazer esta atividade e para entender as consequências das subscriptions sem `remove()`.

## 3. Consumo de bateria

<!-- Três decisões neste arquivo que gastam bateria sem necessidade.
     Para cada uma, diga o que você usaria no lugar e por quê. -->

1. `Accuracy.BestForNavigation` na leitura inicial é mais precisão do que o registro precisa. Eu usaria `Accuracy.High`, que ainda localiza bem o passeio sem exigir o modo de navegação.
2. `Accuracy.Highest` no `watchPositionAsync` mantém o GPS trabalhando no nível máximo. Eu usaria `Accuracy.Balanced` ou `High`, dependendo da precisão que o produto realmente precisa.
3. `Accelerometer.setUpdateInterval(16)` pede aproximadamente 60 atualizações por segundo. Para contar passos, eu usaria um intervalo mais tranquilo, como 100 ou 200 ms, ou escolheria `Pedometer` em vez de tentar contar passos manualmente. Assim o app faz menos renderizações e não precisa processar tanta leitura.

Além disso, fazer `reverseGeocodeAsync` em toda atualização do GPS também é pesado. Eu limitaria a frequência das atualizações ou faria o reverse geocoding somente quando realmente fosse necessário.

**Declaração:** usamos IA como apoio para fazer esta atividade e para comparar as escolhas de precisão e frequência dos sensores.

## 4. O uso errado de sensor

<!-- Há um sensor sendo usado para uma finalidade que ele não atende bem.
     Qual? Por que não funciona? O que o autor provavelmente queria? -->

O acelerômetro está sendo usado como contador de passos:

```tsx
if (x > 1.5) setPassos((n) => n + 1);
```

Isso não mede passos de verdade. O valor `x` também muda quando a pessoa inclina, gira ou balança o celular, então um único movimento pode virar vários “passos”. Além disso, olhar só para um eixo ignora movimentos em outras direções.

Provavelmente o autor queria usar o `Pedometer`, que é o sensor/API própria para contar passos. Se a intenção fosse estudar o movimento do aparelho, o acelerômetro poderia continuar sendo usado, mas seria necessário analisar os três eixos, aplicar um filtro e detectar picos, em vez de comparar apenas `x` com `1.5`.

**Declaração:** usamos IA como apoio para fazer esta atividade e para ajudar a diferenciar o uso do acelerômetro e do `Pedometer`.

## 5. Os defeitos de imagem

<!-- Dois problemas na exibição das fotos. -->

1. Todos os registros usam exatamente a mesma URL: `https://picsum.photos/seed/passeio/600/400`. Portanto, todos os cards acabam mostrando a mesma imagem, que não representa o registro ou o pet daquele passeio.
2. A imagem depende de uma URL externa e não existe estado de carregamento, erro ou imagem reserva. Sem internet, ou se o serviço estiver fora do ar, o usuário vê uma área quebrada/vazia e não recebe nenhuma explicação. Eu usaria uma foto ligada ao registro e um placeholder para erro ou ausência de imagem.

**Declaração sobre o código:** usamos IA como apoio para analisar este trecho de código e identificar os defeitos de imagem. A análise foi conferida com o código apresentado na atividade.

## 6. Ordem de correção — tenho meio dia

<!-- Liste em ordem, com uma justificativa por item. O critério é
     "impacto no usuário por hora de trabalho", não "ordem no arquivo". -->

1. **Corrigir a permissão e tratar GPS desligado/indisponível.** Sem isso, a tela pode falhar logo no primeiro uso e a pessoa não sabe o que fazer. É uma correção pequena e tem impacto alto.
2. **Guardar e remover as subscriptions de localização e do acelerômetro.** Esse é o maior risco de bateria e memória. Também evita que um toque repetido crie várias sessões ao mesmo tempo.
3. **Impedir o início duplicado do passeio.** Desabilitaria o botão durante a inicialização e enquanto já houver uma sessão ativa. Isso evita registros repetidos e reduz a chance de o vazamento voltar.
4. **Trocar o acelerômetro por `Pedometer` ou deixar claro que não há contagem de passos.** O número mostrado hoje é enganoso, então o usuário pode confiar em uma informação errada.
5. **Reduzir a precisão e a frequência dos sensores.** Depois de corrigir o funcionamento, ajustaria `Accuracy` e o intervalo para melhorar bateria sem perder a utilidade do registro.
6. **Corrigir as fotos e adicionar fallback.** É importante para a apresentação, mas a localização e os vazamentos afetam mais pessoas e podem inutilizar o passeio inteiro.

**Declaração:** usamos IA como apoio para fazer esta atividade e para organizar a ordem das correções pelo impacto para o usuário.

## 7. O que eu decidi NÃO corrigir

<!-- Pelo menos um item, com justificativa. Saber o que deixar para depois
     é parte do trabalho. -->

Eu não tentaria criar agora um algoritmo próprio para reconhecer passos usando o acelerômetro. Isso demoraria bastante e ainda poderia continuar impreciso. Primeiro usaria o `Pedometer` e confirmaria se ele atende ao aparelho e ao objetivo do produto. Também deixaria a escolha exata de `Accuracy` para depois de testar em um celular real, porque não dá para escolher o melhor equilíbrio de bateria e precisão só olhando o código.

**Declaração:** Usei IA como apoio para fazer esta atividade, mas a decisão de deixar a implementação de um algoritmo próprio para depois foi mantida como decisão da análise.
