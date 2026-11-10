// Created by AI.

// ============================================================
// Card do pet na lista
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Usa o Card reutilizável e os tipos do domínio.
// Mostra: foto, nome, espécie + status do passeio (um em cada ponta),
// idade e a última localização registrada, quando existir.
//
// Etapa 2: o card virou somente apresentação — abrir o detalhe é
// responsabilidade do `ItemPet`, que envolve este card. A única ação
// própria é "Trocar foto", com feedback visual no estado `pressed`.
// Etapa 3: as cores vêm do tema Claro/Escuro (useTheme).
// ============================================================
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { type Pet, rotuloEspecie, rotuloStatusPasseio } from '../types/pet';
import { useTheme } from '../context/theme-context';
import { espaco, type PaletaCores, type TipografiaTema } from '../theme';
import { Card } from './card';

// Updated by AI.
type CardPetProps = {
  pet: Pet;
  aoEscolherFoto: () => void;
};

// Updated by AI.
export function CardPet({ pet, aoEscolherFoto }: CardPetProps) {
  const { cores, tipografia } = useTheme();
  const styles = useMemo(() => criarEstilos(cores, tipografia), [cores, tipografia]);
  const corStatus = coresDoStatus(cores)[pet.statusPasseio];

  return (
    <Card>
      {pet.fotoUri ? (
        <Image
          source={{ uri: pet.fotoUri }}
          style={styles.miniatura}
          contentFit="cover"
          recyclingKey={pet.id}
          transition={200}
        />
      ) : (
        <View style={[styles.miniatura, styles.miniaturaVazia]} />
      )}

      <Text style={tipografia.titulo}>{pet.nome}</Text>

      <View style={styles.linha}>
        <Text style={tipografia.corpo}>{rotuloEspecie(pet.especie)}</Text>
        <Text style={[styles.status, { color: corStatus }]}>
          {rotuloStatusPasseio(pet.statusPasseio)}
        </Text>
      </View>

      <Text style={tipografia.legenda}>{pet.idadeMeses} meses</Text>

      {pet.local && (
        <Text style={tipografia.legenda}>
          Local: {pet.local.latitude.toFixed(3)}, {pet.local.longitude.toFixed(3)} (±
          {Math.round(pet.local.precisaoMetros)}m)
        </Text>
      )}

      <Pressable
        onPress={aoEscolherFoto}
        accessibilityRole="button"
        style={({ pressed }) => [pressed && styles.pressionado]}
      >
        <Text style={styles.textoBotao}>{pet.fotoUri ? 'Trocar foto' : 'Adicionar foto'}</Text>
      </Pressable>
    </Card>
  );
}

// Created by AI.
function coresDoStatus(cores: PaletaCores): Record<Pet['statusPasseio'], string> {
  return {
    pendente: cores.primaria,
    concluido: cores.sucesso,
    cancelado: cores.erro,
  };
}

// Updated by AI.
function criarEstilos(cores: PaletaCores, tipografia: TipografiaTema) {
  return StyleSheet.create({
    linha: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    status: {
      ...tipografia.corpo,
      fontWeight: '600',
    },
    textoBotao: {
      fontWeight: 'bold',
      color: cores.primaria,
    },
    pressionado: {
      opacity: 0.7,
    },
    miniatura: {
      width: '100%',
      height: 120,
      borderRadius: espaco.sm,
    },
    miniaturaVazia: {
      backgroundColor: cores.fundo,
    },
  });
}
