// Declaração: este arquivo foi desenvolvido com apoio de IA e revisado por mim.

// ============================================================
// Prática 3 — Agrupamento e filtragem de pets
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Funções puras — sem JSX, sem estado, sem React.
// Moram aqui para serem testáveis e reutilizáveis independentemente.
// ============================================================

import type { Pet } from '../types/pet';

export type Secao = { title: string; data: Pet[] };

export function agrupar(pets: Pet[]): Secao[] {
  const titulos: Record<Pet['statusPasseio'], string> = {
    pendente: 'Pendentes',
    concluido: 'Concluídos',
    cancelado: 'Cancelados',
  };
  const ordem: Pet['statusPasseio'][] = ['pendente', 'concluido', 'cancelado'];
  const grupos = new Map<Pet['statusPasseio'], Pet[]>();

  for (const pet of pets) {
    const grupo = grupos.get(pet.statusPasseio) ?? [];
    grupos.set(pet.statusPasseio, [...grupo, pet]);
  }

  // Pendentes aparecem primeiro porque são os passeios que ainda pedem ação.
  return ordem
    .map((status) => ({ title: titulos[status], data: grupos.get(status) ?? [] }))
    .filter((secao) => secao.data.length > 0);
}

export function filtrarPorNome(pets: Pet[], busca: string): Pet[] {
  const termo = busca.trim().toLowerCase();
  if (!termo) return pets;
  return pets.filter((pet) => pet.nome.toLowerCase().includes(termo));
}
