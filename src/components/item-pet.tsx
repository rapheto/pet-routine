// ============================================================
// Item tocável da lista de pets
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// O toque curto abre o detalhe do pet (`/pet/[id]`) e o toque longo
// abre a confirmação de exclusão.
// A ação vai em `onPress`, feedback visual vai no `pressed` — nunca
// `onPressIn`.
// ============================================================
import { Pressable, StyleSheet } from 'react-native';

import type { Pet } from '../types/pet';
import { CardPet } from './card-pet';

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
      // TODO P3.7: acessibilidade — papel e rótulo.
      accessibilityRole="button"
      accessibilityLabel={`${pet.nome}, toque para ver os detalhes`}
      accessibilityHint="Mantenha pressionado para confirmar a exclusão do pet."
      // O hitSlop de 8 facilita tocar no card sem alterar seu tamanho visual.
      hitSlop={8}
      // Um pequeno atraso evita feedback de toque acidental durante a rolagem.
      unstable_pressDelay={80}
      // O padding lateral mora no item (e não no container) para que os
      // cabeçalhos de seção fiquem com fundo de largura total.
      className="px-4"
      style={({ pressed }) => [pressed && styles.pressionado]}
    >
      <CardPet
        pet={pet}
        aoAbrir={() => onAbrir(pet.id)}
        aoEscolherFoto={() => onEscolherFoto(pet.id)}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressionado: { opacity: 0.7 },
});
