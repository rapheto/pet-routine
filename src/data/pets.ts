// Declaração: este arquivo foi desenvolvido com apoio de IA e revisado por mim.

// ============================================================
// Prática 3 — Mock de dados: lista de pets
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Este arquivo é o mock da lista. No mínimo 20 itens, com:
//   • pelo menos 3 espécies diferentes
//   • todos os 3 status de passeio representados
//   • idades variadas
//   • alguns com local e/ou fotoUri, outros sem
//
// Lista pequena esconde exatamente os problemas que esta prática
// ensina a evitar. Não reduza.
// ============================================================

import type { Pet } from '../types/pet';

export const PETS: Pet[] = [
  {
    id: 'p1',
    nome: 'Rex',
    especie: 'cachorro',
    porte: 'medio',
    statusPasseio: 'pendente',
    idadeMeses: 24,
    criadoEm: new Date('2025-01-15'),
  },
  {
    id: 'p2',
    nome: 'Mia',
    especie: 'gato',
    porte: 'pequeno',
    statusPasseio: 'concluido',
    idadeMeses: 18,
    criadoEm: new Date('2025-03-10'),
  },
  {
    id: 'p3',
    nome: 'Blu',
    especie: 'ave',
    porte: 'pequeno',
    statusPasseio: 'cancelado',
    idadeMeses: 6,
    criadoEm: new Date('2025-06-20'),
    local: { latitude: -8.054, longitude: -34.871, precisaoMetros: 12 },
    fotoUri: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
  },
  { id: 'p4', nome: 'Luna', especie: 'cachorro', porte: 'grande', statusPasseio: 'pendente', idadeMeses: 42, criadoEm: new Date('2024-01-05') },
  { id: 'p5', nome: 'Nino', especie: 'gato', porte: 'pequeno', statusPasseio: 'concluido', idadeMeses: 10, criadoEm: new Date('2025-08-12') },
  { id: 'p6', nome: 'Mel', especie: 'cachorro', porte: 'pequeno', statusPasseio: 'cancelado', idadeMeses: 30, criadoEm: new Date('2024-07-21') },
  { id: 'p7', nome: 'Pipoca', especie: 'ave', porte: 'pequeno', statusPasseio: 'pendente', idadeMeses: 14, criadoEm: new Date('2025-04-18') },
  { id: 'p8', nome: 'Thor', especie: 'cachorro', porte: 'grande', statusPasseio: 'concluido', idadeMeses: 60, criadoEm: new Date('2022-11-03') },
  { id: 'p9', nome: 'Amora', especie: 'gato', porte: 'medio', statusPasseio: 'pendente', idadeMeses: 22, criadoEm: new Date('2025-02-27') },
  { id: 'p10', nome: 'Tico', especie: 'ave', porte: 'pequeno', statusPasseio: 'cancelado', idadeMeses: 8, criadoEm: new Date('2025-09-09') },
  { id: 'p11', nome: 'Nala', especie: 'cachorro', porte: 'medio', statusPasseio: 'concluido', idadeMeses: 36, criadoEm: new Date('2024-03-14') },
  { id: 'p12', nome: 'Simba', especie: 'gato', porte: 'medio', statusPasseio: 'pendente', idadeMeses: 48, criadoEm: new Date('2023-12-30') },
  { id: 'p13', nome: 'Jade', especie: 'outro', porte: 'pequeno', statusPasseio: 'concluido', idadeMeses: 16, criadoEm: new Date('2025-05-06') },
  { id: 'p14', nome: 'Bento', especie: 'cachorro', porte: 'grande', statusPasseio: 'cancelado', idadeMeses: 72, criadoEm: new Date('2021-10-19') },
  { id: 'p15', nome: 'Cacau', especie: 'gato', porte: 'pequeno', statusPasseio: 'pendente', idadeMeses: 7, criadoEm: new Date('2025-10-01') },
  { id: 'p16', nome: 'Lilo', especie: 'ave', porte: 'pequeno', statusPasseio: 'concluido', idadeMeses: 20, criadoEm: new Date('2025-01-29') },
  { id: 'p17', nome: 'Fred', especie: 'cachorro', porte: 'medio', statusPasseio: 'pendente', idadeMeses: 28, criadoEm: new Date('2024-12-11') },
  { id: 'p18', nome: 'Maya', especie: 'gato', porte: 'medio', statusPasseio: 'cancelado', idadeMeses: 54, criadoEm: new Date('2023-06-22') },
  { id: 'p19', nome: 'Zeca', especie: 'outro', porte: 'grande', statusPasseio: 'concluido', idadeMeses: 33, criadoEm: new Date('2024-05-17') },
  { id: 'p20', nome: 'Dora', especie: 'cachorro', porte: 'pequeno', statusPasseio: 'pendente', idadeMeses: 12, criadoEm: new Date('2025-07-08') },
  { id: 'p21', nome: 'Jujuba', especie: 'gato', porte: 'pequeno', statusPasseio: 'concluido', idadeMeses: 26, criadoEm: new Date('2024-09-25') },
];
