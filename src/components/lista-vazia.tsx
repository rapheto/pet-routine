// ============================================================
// Etapa 5 — Estado vazio da lista (UI reformulada)
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Toda lista tem `ListEmptyComponent` (Regra 8), e o texto precisa
// AJUDAR o tutor: primeiro acesso → o que fazer; busca sem resultado
// → o que tentar. O visual agora é um cartão com ícone e CTA.
// ============================================================
import { Button } from './botao';
import { Card } from './card';
import { Heading } from './heading';
import { Text } from './texto';
import { VStack } from './vstack';

// Updated by AI.
type ListaVaziaProps = {
  termoBusca?: string;
  temPets?: boolean;
  aoCadastrar?: () => void;
};

// Updated by AI.
export function ListaVazia({ termoBusca = '', temPets = false, aoCadastrar }: ListaVaziaProps) {
  const termo = termoBusca.trim();
  const primeiroAcesso = !temPets;

  const titulo = primeiroAcesso ? 'Nenhum pet por aqui ainda' : 'Nenhum resultado encontrado';
  const descricao = primeiroAcesso
    ? 'Cadastre seu primeiro pet para acompanhar os passeios do dia, a foto e o histórico.'
    : `Não encontramos nenhum pet para "${termo}". Tente outro nome ou limpe a busca.`;

  return (
    <VStack className="px-4 py-4">
      <Card className="items-center">
        <Text className="text-4xl">{primeiroAcesso ? '🐾' : '🔎'}</Text>
        <Heading nivel="secao" className="text-center">
          {titulo}
        </Heading>
        <Text className="text-center text-base" tom="fraco">
          {descricao}
        </Text>
        {primeiroAcesso && aoCadastrar !== undefined && (
          <Button rotulo="Cadastrar meu primeiro pet" aoPressionar={aoCadastrar} />
        )}
      </Card>
    </VStack>
  );
}
