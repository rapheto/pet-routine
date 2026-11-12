// Created by AI.
// Updated by AI.

// ============================================================
// Etapa 5 — Card do pet na lista (UI reformulada)
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Reformulação: miniatura quadrada à esquerda, hierarquia tipográfica
// à direita (nome → badges de espécie/porte → badge de status) e ação
// para registrar passeio. Abrir o detalhe continua disponível no botão
// secundário e no toque do item.
//
// Design: status usa os pastéis semânticos (âmbar/verde/rosa) e os
// dados fixos (espécie/porte) usam o pastel azul, para o usuário
// separar "o que o pet é" de "como está o passeio".
//
// Regra 4: sombra com `boxShadow` (no Card). Regra 3: `gap` entre
// irmãos. Regra 13: `Image` vem de `expo-image` com `contentFit`.
// ============================================================
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { useTheme } from '../context/theme-context';
import { espaco, type PaletaCores } from '../theme';
import { type Pet, rotuloEspecie, rotuloPorte, rotuloStatusPasseio } from '../types/pet';
import { Badge, type TomBadge } from './badge';
import { Button } from './botao';
import { Card } from './card';
import { Heading } from './heading';
import { HStack } from './hstack';
import { Text } from './texto';
import { VStack } from './vstack';

// Updated by AI.
type CardPetProps = {
  pet: Pet;
  aoRegistrarPasseio: () => void;
  aoAbrir: () => void;
};

// Created by AI.
// Updated by AI.
const TOM_DO_STATUS: Record<Pet['statusPasseio'], TomBadge> = {
  pendente: 'ambar',
  concluido: 'verde',
  cancelado: 'rosa',
};

// Updated by AI.
export function CardPet({ pet, aoRegistrarPasseio, aoAbrir }: CardPetProps) {
  const { cores } = useTheme();
  const estilos = useMemo(() => criarEstilos(cores), [cores]);

  return (
    <Card>
      <HStack className="gap-4">
        {pet.fotoUri ? (
          <Image
            source={{ uri: pet.fotoUri }}
            style={estilos.miniatura}
            contentFit="cover"
            recyclingKey={pet.id}
            transition={200}
          />
        ) : (
          <VStack
            className="h-24 w-24 items-center justify-center rounded-xl"
            style={estilos.miniaturaVazia}
          >
            <Text className="text-2xl">🐾</Text>
          </VStack>
        )}

        <VStack className="flex-1 gap-2">
          <Heading nivel="secao" numberOfLines={1}>
            {pet.nome}
          </Heading>

          <HStack className="flex-wrap gap-2">
            <Badge texto={rotuloEspecie(pet.especie)} tom="azul" />
            <Badge texto={rotuloPorte(pet.porte)} tom="verde" />
            <Badge texto={rotuloStatusPasseio(pet.statusPasseio)} tom={TOM_DO_STATUS[pet.statusPasseio]} />
          </HStack>

          <Text className="text-xs" tom="fraco">
            {pet.idadeMeses} meses
          </Text>
        </VStack>
      </HStack>

      {pet.local !== undefined && (
        <Text className="text-xs" tom="fraco">
          Último local: {pet.local.latitude.toFixed(3)}, {pet.local.longitude.toFixed(3)} (±
          {Math.round(pet.local.precisaoMetros)}m)
        </Text>
      )}

      <HStack className="gap-2">
        <Button
          rotulo="Abrir"
          variante="fantasma"
          aoPressionar={(evento) => {
            evento?.stopPropagation();
            aoAbrir();
          }}
          rotuloAcessivel={`Abrir detalhes de ${pet.nome}`}
          compacto
        />
        <Button
          rotulo="Registrar passeio"
          variante="primario"
          aoPressionar={(evento) => {
            evento?.stopPropagation();
            aoRegistrarPasseio();
          }}
          rotuloAcessivel={`Registrar passeio de ${pet.nome}`}
          compacto
        />
      </HStack>
    </Card>
  );
}

// Created by AI.
// Updated by AI.
function criarEstilos(cores: PaletaCores) {
  return StyleSheet.create({
    miniatura: {
      width: espaco.xl * 3,
      height: espaco.xl * 3,
      borderRadius: espaco.md,
      backgroundColor: cores.cartaoSuave,
    },
    miniaturaVazia: {
      backgroundColor: cores.cartaoSuave,
      borderWidth: 1,
      borderColor: cores.borda,
    },
  });
}
