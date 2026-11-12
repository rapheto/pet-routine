// ============================================================
// Prática 1.2 — Estado de tela (arquivo 2 de 2)
// Leia o enunciado completo em `PRATICA.md` › "Prática 2".
//
// A lógica da tela, ainda sem tela. Componentes chegam na Aula 2 —
// aqui é TypeScript puro, verificável por `tsc`.
// ============================================================

// ------------------------------------------------------------
// Entrega da prática:
// 1. A união evita representar dados e erro simultaneamente, ou dados enquanto carrega.
// 2. `carregar()` converte falhas em estado visual para evitar que a tela quebre.
// 3. `criadoEm` usa `Date` para facilitar cálculos sem repetir conversões.
// ------------------------------------------------------------

import type { Pet } from './types/pet';
import { type EstadoTela, rotuloEspecie, rotuloStatusPasseio } from './types/pet';
import { buscarPetEmDestaque } from './services/pet-service';

export type { EstadoTela };

// Updated by AI.
export function descreverTela(estado: EstadoTela<Pet>): string {
  switch (estado.tipo) {
    case 'carregando':
      return 'Carregando…';
    case 'sucesso':
      return `${estado.dados.nome} · ${rotuloEspecie(estado.dados.especie)} · ${rotuloStatusPasseio(estado.dados.statusPasseio)}`;
    case 'erro':
      return `Erro: ${estado.mensagem}`;
  }
}

// Updated by AI.
export async function carregar(): Promise<EstadoTela<Pet>> {
  try {
    const dados = await buscarPetEmDestaque();
    return { tipo: 'sucesso', dados };
  } catch (erro: unknown) {
    const mensagem = erro instanceof Error ? erro.message : 'Erro desconhecido';
    return { tipo: 'erro', mensagem };
  }
}

// ============================================================
// VERIFICAÇÃO — não apague
// ============================================================
declare const petExemplo: Pet;

// `declare const` existe só para o compilador — ele é apagado na compilação.
// Por isso as chamadas abaixo ficam atrás deste guard: elas precisam ser
// TYPE-CHECKED, mas não podem EXECUTAR (dariam `ReferenceError: petExemplo
// is not defined` ao rodar o arquivo com tsx). O tipo explícito `: boolean`
// impede o TS de estreitar para `false` e marcar o bloco como inalcançável.
const VERIFICACAO_DE_TIPOS: boolean = false;

if (VERIFICACAO_DE_TIPOS) {
  // DEVEM compilar:
  descreverTela({ tipo: 'carregando' });
  descreverTela({ tipo: 'sucesso', dados: petExemplo });
  descreverTela({ tipo: 'erro', mensagem: 'Sem conexão' });
}

// DEVEM dar erro — descomente uma de cada vez (dentro do `if` acima):
// descreverTela({ tipo: 'carregando', dados: petExemplo });
// descreverTela({ tipo: 'erro', dados: petExemplo });
// descreverTela({ tipo: 'offline' });

// Rode com `npx tsx src/tela-pet.ts` depois de descomentar:
// carregar().then((estado) => console.log(descreverTela(estado)));

void rotuloEspecie;
void rotuloStatusPasseio;
void buscarPetEmDestaque;
