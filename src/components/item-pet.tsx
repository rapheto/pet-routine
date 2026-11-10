// Declaração: este arquivo foi desenvolvido com apoio de IA e revisado por mim.

// ============================================================
// Prática 3 — Item tocável da lista de pets
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Envolve o CardPet num Pressable para toque curto e longo.
// A ação vai em onPress, feedback visual vai no `pressed`.
// Nunca onPressIn.
// ============================================================
import { Pressable, StyleSheet } from 'react-native';

import type { Pet } from '../types/pet';
import { CardPet } from './card-pet';

type ItemPetProps = {
  pet: Pet;
  onAlternar: (id: string) => void;
  onRemover: (id: string) => void;
  onRegistrar: (id: string) => void;
};

export function ItemPet({ pet, onAlternar, onRemover, onRegistrar }: ItemPetProps) {
  return (
    <Pressable
      onPress={() => onAlternar(pet.id)}
      onLongPress={() => onRemover(pet.id)}
      accessibilityRole="button"
      accessibilityLabel={`${pet.nome}, toque para alternar passeio`}
      // O hitSlop de 8 facilita tocar no card sem alterar seu tamanho visual.
      hitSlop={8}
      // Um pequeno atraso evita feedback de toque acidental durante a rolagem.
      unstable_pressDelay={80}
      style={({ pressed }) => [
        styles.item,
        pressed && styles.pressionado,
      ]}
    >
      <CardPet pet={pet} aoRegistrarPasseio={() => onRegistrar(pet.id)} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
  },
  pressionado: { opacity: 0.7 },
});
