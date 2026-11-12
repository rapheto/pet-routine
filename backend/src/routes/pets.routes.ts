import { Router, type Response } from 'express';
import { randomUUID } from 'node:crypto';
import { authMiddleware, type AuthenticatedRequest } from '../auth.js';
import {
  db,
  findPetById,
  findPetByIdAndUser,
  listPetsByUser,
  rowToPetDTO,
  seedPetsForUser,
} from '../db.js';
import { isRecord } from '../request-body.js';
import type { EspeciePet, PortePet, StatusPasseio } from '../types.js';

export const petsRouter = Router();

petsRouter.use(authMiddleware);

const ESPECIES_VALIDAS: ReadonlySet<string> = new Set(['cachorro', 'gato', 'ave', 'outro']);
const PORTES_VALIDOS: ReadonlySet<string> = new Set(['pequeno', 'medio', 'grande']);
const STATUS_VALIDOS: ReadonlySet<string> = new Set(['pendente', 'concluido', 'cancelado']);

// Updated by AI.
function isEspeciePet(val: unknown): val is EspeciePet {
  return typeof val === 'string' && ESPECIES_VALIDAS.has(val);
}

// Updated by AI.
function isPortePet(val: unknown): val is PortePet {
  return typeof val === 'string' && PORTES_VALIDOS.has(val);
}

// Updated by AI.
function isStatusPasseio(val: unknown): val is StatusPasseio {
  return typeof val === 'string' && STATUS_VALIDOS.has(val);
}

// GET /pets — Lista todos os pets do tutor autenticado
petsRouter.get('/', (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const rows = listPetsByUser(userId);
    res.status(200).json(rows.map(rowToPetDTO));
  } catch (err) {
    console.error('[GET /pets ERROR]', err);
    res.status(500).json({ error: 'Falha ao listar pets.' });
  }
});

// POST /pets/seed — Popula os 20 pets de exemplo na conta do tutor autenticado
petsRouter.post('/seed', (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    seedPetsForUser(userId, false);
    const rows = listPetsByUser(userId);
    res.status(201).json(rows.map(rowToPetDTO));
  } catch (err) {
    console.error('[POST /pets/seed ERROR]', err);
    res.status(500).json({ error: 'Falha ao popular pets de exemplo.' });
  }
});

// GET /pets/:id — Busca detalhe de um pet específico do tutor
petsRouter.get('/:id', (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const id = String(req.params.id);

    const row = findPetByIdAndUser(id, userId);

    if (!row) {
      res.status(404).json({ error: 'Pet não encontrado.' });
      return;
    }

    res.status(200).json(rowToPetDTO(row));
  } catch (err) {
    console.error('[GET /pets/:id ERROR]', err);
    res.status(500).json({ error: 'Falha ao buscar detalhe do pet.' });
  }
});

// POST /pets — Cadastra um novo pet para o tutor autenticado
// Updated by AI.
petsRouter.post('/', (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const body = isRecord(req.body) ? req.body : {};

    const nome = typeof body.nome === 'string' ? body.nome.trim() : '';
    if (!nome) {
      res.status(400).json({ error: 'O campo "nome" do pet é obrigatório.' });
      return;
    }

    const especie: EspeciePet = isEspeciePet(body.especie) ? body.especie : 'cachorro';
    const porte: PortePet = isPortePet(body.porte) ? body.porte : 'medio';
    const statusPasseio: StatusPasseio = isStatusPasseio(body.statusPasseio)
      ? body.statusPasseio
      : 'pendente';
    const idadeMeses =
      typeof body.idadeMeses === 'number' && Number.isFinite(body.idadeMeses) && body.idadeMeses >= 0
        ? Math.round(body.idadeMeses)
        : 12;

    const id = randomUUID();
    const criadoEm = new Date().toISOString();
    const local = isRecord(body.local) ? body.local : {};
    const latitude = typeof local.latitude === 'number' ? local.latitude : null;
    const longitude = typeof local.longitude === 'number' ? local.longitude : null;
    const precisaoMetros =
      typeof local.precisaoMetros === 'number' ? local.precisaoMetros : null;
    const fotoUri = typeof body.fotoUri === 'string' && body.fotoUri.trim() !== '' ? body.fotoUri.trim() : null;

    db.prepare(`
      INSERT INTO pets (
        id, userId, nome, especie, porte, statusPasseio, idadeMeses, criadoEm, latitude, longitude, precisaoMetros, fotoUri
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      userId,
      nome,
      especie,
      porte,
      statusPasseio,
      idadeMeses,
      criadoEm,
      latitude,
      longitude,
      precisaoMetros,
      fotoUri
    );

    const created = findPetById(id)!;
    res.status(201).json(rowToPetDTO(created));
  } catch (err) {
    console.error('[POST /pets ERROR]', err);
    res.status(500).json({ error: 'Falha ao cadastrar pet.' });
  }
});

// Handler compartilhado para atualizar/alternar passeio ou dados do pet
// Updated by AI.
function updatePetHandler(req: AuthenticatedRequest, res: Response, toggleDefault: boolean): void {
  try {
    const userId = req.user!.id;
    const id = String(req.params.id);
    const body = isRecord(req.body) ? req.body : {};

    const existing = findPetById(id);

    if (!existing) {
      res.status(404).json({ error: 'Pet não encontrado.' });
      return;
    }

    if (existing.userId !== userId) {
      res.status(403).json({ error: 'Acesso negado a este pet.' });
      return;
    }

    const nome =
      typeof body.nome === 'string' && body.nome.trim() !== '' ? body.nome.trim() : existing.nome;
    const especie: EspeciePet = isEspeciePet(body.especie) ? body.especie : existing.especie;
    const porte: PortePet = isPortePet(body.porte) ? body.porte : existing.porte;
    const idadeMeses =
      typeof body.idadeMeses === 'number' && Number.isFinite(body.idadeMeses) && body.idadeMeses >= 0
        ? Math.round(body.idadeMeses)
        : existing.idadeMeses;

    let statusPasseio: StatusPasseio = existing.statusPasseio;
    if (isStatusPasseio(body.statusPasseio)) {
      statusPasseio = body.statusPasseio;
    } else if (toggleDefault) {
      statusPasseio = existing.statusPasseio === 'concluido' ? 'pendente' : 'concluido';
    }

    const local = isRecord(body.local) ? body.local : undefined;
    const latitude =
      body.local === null
        ? null
        : typeof local?.latitude === 'number'
          ? local.latitude
          : existing.latitude;
    const longitude =
      body.local === null
        ? null
        : typeof local?.longitude === 'number'
          ? local.longitude
          : existing.longitude;
    const precisaoMetros =
      body.local === null
        ? null
        : typeof local?.precisaoMetros === 'number'
          ? local.precisaoMetros
          : existing.precisaoMetros;

    const fotoUri =
      body.fotoUri === null
        ? null
        : typeof body.fotoUri === 'string'
          ? body.fotoUri.trim() || null
          : existing.fotoUri;

    db.prepare(`
      UPDATE pets
      SET nome = ?, especie = ?, porte = ?, statusPasseio = ?, idadeMeses = ?,
          latitude = ?, longitude = ?, precisaoMetros = ?, fotoUri = ?
      WHERE id = ? AND userId = ?
    `).run(
      nome,
      especie,
      porte,
      statusPasseio,
      idadeMeses,
      latitude,
      longitude,
      precisaoMetros,
      fotoUri,
      id,
      userId
    );

    const updated = findPetById(id)!;
    res.status(200).json(rowToPetDTO(updated));
  } catch (err) {
    console.error('[UPDATE /pets/:id ERROR]', err);
    res.status(500).json({ error: 'Falha ao atualizar pet.' });
  }
}

// PATCH /pets/:id/toggle — Alterna statusPasseio (pendente <-> concluido) ou aplica statusPasseio/local/fotoUri enviado
petsRouter.patch('/:id/toggle', (req: AuthenticatedRequest, res: Response) => {
  updatePetHandler(req, res, true);
});

// PATCH /pets/:id/passeio — Registra passeio com local/fotoUri opcionais e marca como concluído por padrão
// Updated by AI.
petsRouter.patch('/:id/passeio', (req: AuthenticatedRequest, res: Response) => {
  const body = isRecord(req.body) ? req.body : {};
  if (!body.statusPasseio) {
    req.body = { ...body, statusPasseio: 'concluido' };
  }
  updatePetHandler(req, res, false);
});

// PATCH /pets/:id e PUT /pets/:id — Atualização parcial ou completa do pet
petsRouter.patch('/:id', (req: AuthenticatedRequest, res: Response) => {
  updatePetHandler(req, res, false);
});

petsRouter.put('/:id', (req: AuthenticatedRequest, res: Response) => {
  updatePetHandler(req, res, false);
});

// DELETE /pets/:id — Remove o pet do tutor autenticado
petsRouter.delete('/:id', (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const id = String(req.params.id);

    const existing = findPetById(id);

    if (!existing) {
      res.status(404).json({ error: 'Pet não encontrado.' });
      return;
    }

    if (existing.userId !== userId) {
      res.status(403).json({ error: 'Acesso negado a este pet.' });
      return;
    }

    db.prepare('DELETE FROM pets WHERE id = ? AND userId = ?').run(id, userId);
    res.status(200).json({ success: true, id });
  } catch (err) {
    console.error('[DELETE /pets/:id ERROR]', err);
    res.status(500).json({ error: 'Falha ao remover pet.' });
  }
});
