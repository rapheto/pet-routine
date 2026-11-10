// Declaração: este arquivo foi desenvolvido com apoio de IA e revisado por mim.

// ============================================================
// Item tocável da lista de pets
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Etapa 2: o toque curto abre o detalhe do pet (`/pet/[id]`) e o toque
// longo continua sendo o atalho de exclusão rápida.
// A ação vai em `onPress`, feedback visual vai no `pressed` — nunca
// `onPressIn`.
// ============================================================
import { Pressable, StyleSheet } from 'react-native';

import type { Pet } from '../types/pet';
import { CardPet } from './card-pet';

// Updated by AI.
type ItemPetProps = {
  pet: Pet;
  onAbrir: (id: string) => void;
  onRemover: (id: string) => void;
  onEscolherFoto: (id: string) => void;
};

// Updated by AI.
export function ItemPet({ pet, onAbrir, onRemover, onEscolherFoto }: ItemPetProps) {
  return (
    <Pressable
      onPress={() => onAbrir(pet.id)}
      onLongPress={() => onRemover(pet.id)}
      accessibilityRole="button"
      accessibilityLabel={`${pet.nome}, toque para ver os detalhes`}
      // O hitSlop de 8 facilita tocar no card sem alterar seu tamanho visual.
      hitSlop={8}
      // Um pequeno atraso evita feedback de toque acidental durante a rolagem.
      unstable_pressDelay={80}
      style={({ pressed }) => [styles.item, pressed && styles.pressionado]}
    >
      <CardPet pet={pet} aoEscolherFoto={() => onEscolherFoto(pet.id)} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
  },
  pressionado: { opacity: 0.7 },
});
