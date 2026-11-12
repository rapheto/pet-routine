// ============================================================
// Prática 1.1 — Modelagem do domínio Pet
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Enunciado completo em `PRATICA.md` › "Prática 1".
// Os blocos marcados como VERIFICAÇÃO **não devem ser apagados**.
//
// Regras do domínio (resumo — o enunciado manda):
//   • Um pet tem exatamente UMA espécie e exatamente UM porte.
//   • O passeio do dia tem três desfechos: pendente, concluído ou cancelado.
//   • `id`, `criadoEm` e o `statusPasseio` inicial são gerados pelo SERVIDOR —
//     o formulário de cadastro não envia nenhum dos três.
//   • A lista "Meus pets" mostra só nome, espécie e status do passeio (+ `id`).
//
// Restrições de avaliação: nenhum `any`; `as` só com justificativa em
// comentário; nenhum campo de domínio tipado como `string` genérica.
// ============================================================

// Updated by AI.
export type EspeciePet = 'cachorro' | 'gato' | 'ave' | 'outro';
// Updated by AI.
export type PortePet = 'pequeno' | 'medio' | 'grande';
// Updated by AI.
export type StatusPasseio = 'pendente' | 'concluido' | 'cancelado';

// Updated by AI.
export interface Pet {
  id: string;
  nome: string;
  especie: EspeciePet;
  porte: PortePet;
  statusPasseio: StatusPasseio;
  idadeMeses: number;
  criadoEm: Date;
  // Prática 3 — campos de sensor (opcionais de propósito):
  // O usuário pode negar permissão, e o app tem que continuar funcionando.
  // Um pet sem foto e sem local ainda é um pet.
  local?: { latitude: number; longitude: number; precisaoMetros: number };
  fotoUri?: string;
}

// Created by AI.
// Etapa 4: formato devolvido pelo backend, onde `criadoEm` chega como
// string ISO. A conversão para `Date` acontece na fronteira da store.
export type PetDoServidor = Omit<Pet, 'criadoEm'> & { criadoEm: string };

// Updated by AI.
export type NovoPet = Omit<Pet, 'id' | 'statusPasseio' | 'criadoEm'>;
// Updated by AI.
export type ResumoPet = Pick<Pet, 'id' | 'nome' | 'especie' | 'statusPasseio'>;
// Updated by AI.
export type AtualizacaoPet = Partial<Omit<Pet, 'id' | 'criadoEm'>>;

// Updated by AI.
export function rotuloStatusPasseio(status: StatusPasseio): string {
  switch (status) {
    case 'pendente': return 'Pendente';
    case 'concluido': return 'Concluído';
    case 'cancelado': return 'Cancelado';
  }
}

// Updated by AI.
export function rotuloEspecie(especie: EspeciePet): string {
  switch (especie) {
    case 'cachorro': return 'Cachorro';
    case 'gato': return 'Gato';
    case 'ave': return 'Ave';
    case 'outro': return 'Outro';
  }
}

// Created by AI.
// Etapa 5: o rótulo do porte passou a ser usado pelo CardPet (badge) e
// pela tela de detalhe, então saiu da tela e virou função de domínio.
export function rotuloPorte(porte: PortePet): string {
  switch (porte) {
    case 'pequeno': return 'Pequeno';
    case 'medio': return 'Médio';
    case 'grande': return 'Grande';
  }
}

// ============================================================
// Estado de tela — união discriminada para qualquer tela do app.
// Definido aqui (junto ao domínio) para ser reutilizado tanto em
// lógica pura (tela-pet.ts) quanto nos componentes React (App.tsx).
// ============================================================
export type EstadoTela<T> =
  | { tipo: 'carregando' }
  | { tipo: 'sucesso'; dados: T }
  | { tipo: 'erro'; mensagem: string };

// ============================================================
// VERIFICAÇÃO — não apague
// ============================================================

// DEVEM compilar exatamente assim, sem campos a mais nem a menos:
const novo: NovoPet = {
  nome: 'Fubá',
  especie: 'gato',
  porte: 'pequeno',
  idadeMeses: 30,
};

const resumo: ResumoPet = {
  id: 'p1',
  nome: 'Fubá',
  especie: 'gato',
  statusPasseio: 'pendente',
};

const parcial: AtualizacaoPet = { idadeMeses: 31 };

// DEVEM dar erro — descomente uma de cada vez para confirmar:
// const errado1: NovoPet = { nome: 'Fubá', especie: 'gato', porte: 'pequeno', idadeMeses: 30, id: 'p1' };
// const errado2: NovoPet = { nome: 'Fubá', especie: 'peixe', porte: 'pequeno', idadeMeses: 30 };
// const errado3: ResumoPet = { id: 'p1', nome: 'Fubá', especie: 'gato' };
// const errado4: AtualizacaoPet = { statusPasseio: 'concluido' };

// Só para o `tsc` não reclamar de variáveis não usadas na verificação:
void novo;
void resumo;
void parcial;

// Verificação: os tipos derivados acompanham `Pet` via `Omit`, `Pick` e `Partial`.
