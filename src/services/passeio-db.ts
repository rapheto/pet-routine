// Created by AI.

// ============================================================
// Etapa 3 — Histórico local de sessões de passeio (expo-sqlite)
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// O histórico de duração fica no aparelho, não no backend: é dado
// de uso pessoal e precisa funcionar sem rede.
//
// A conexão é aberta uma única vez e reaproveitada (promise em cache);
// abrir o banco a cada gravação/listagem seria desperdício.
// Todas as consultas usam placeholders (`?`) para evitar injeção de SQL.
// ============================================================
import * as SQLite from 'expo-sqlite';

// Created by AI.
export type PasseioLog = {
  id: number;
  petId: string;
  seconds: number;
  createdAt: string;
};

// Created by AI.
const NOME_BANCO = 'petroutine.db';

// Created by AI.
const SQL_CRIAR_TABELA = `
  CREATE TABLE IF NOT EXISTS passeio_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    petId TEXT NOT NULL,
    seconds INTEGER NOT NULL,
    createdAt TEXT NOT NULL
  );
`;

// Created by AI.
let conexao: Promise<SQLite.SQLiteDatabase> | null = null;

// Created by AI.
async function abrirEInicializar(): Promise<SQLite.SQLiteDatabase> {
  const db = await SQLite.openDatabaseAsync(NOME_BANCO);
  await db.execAsync(SQL_CRIAR_TABELA);
  return db;
}

/**
 * Devolve a conexão com o banco local já com a tabela criada.
 * A mesma promise é reaproveitada em todas as chamadas seguintes.
 */
// Created by AI.
export async function openPasseioDb(): Promise<SQLite.SQLiteDatabase> {
  if (!conexao) {
    conexao = abrirEInicializar();
    // Se a abertura falhar, descarta o cache para permitir nova tentativa.
    conexao.catch(() => {
      conexao = null;
    });
  }
  return conexao;
}

/**
 * Grava uma sessão concluída do cronômetro de passeio.
 */
// Created by AI.
export async function salvarSessaoPasseio(petId: string, seconds: number): Promise<PasseioLog> {
  const db = await openPasseioDb();
  const createdAt = new Date().toISOString();

  const resultado = await db.runAsync(
    'INSERT INTO passeio_logs (petId, seconds, createdAt) VALUES (?, ?, ?)',
    petId,
    seconds,
    createdAt,
  );

  return { id: resultado.lastInsertRowId, petId, seconds, createdAt };
}

/**
 * Lista as sessões do pet, da mais recente para a mais antiga.
 */
// Created by AI.
export async function listarSessoesPasseio(petId: string): Promise<PasseioLog[]> {
  const db = await openPasseioDb();
  const logs = await db.getAllAsync<PasseioLog>(
    'SELECT id, petId, seconds, createdAt FROM passeio_logs WHERE petId = ? ORDER BY id DESC',
    petId,
  );
  return logs;
}
