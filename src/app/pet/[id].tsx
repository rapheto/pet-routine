// Created by AI.

// ============================================================
// Etapa 2 — Rota dinâmica "/pet/[id]"
// Disciplina: Desenvolvimento Mobile (2026.2.DM) — CESAR School
//
// Regra 16: nome de arquivo de rota em minúsculas (a pasta dinâmica
// usa `[id]` por convenção do Expo Router).
// O parâmetro é lido aqui e a tela recebe o `id` já resolvido.
// ============================================================
import { useLocalSearchParams } from 'expo-router';

import { TelaPetDetalhe } from '../../screens/tela-pet-detalhe';

// Created by AI.
// Updated by AI.
export default function RotaPet() {
  const { id, registrar } = useLocalSearchParams<{ id?: string; registrar?: string }>();
  return <TelaPetDetalhe petId={id} iniciarRegistro={registrar === 'true'} />;
}
