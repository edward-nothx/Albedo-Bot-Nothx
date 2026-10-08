import { config } from '../config.js';
import { ALBEDO_SYSTEM } from './personality.js';
import { getMemory, addMemory } from '../database/db.js';

function extractText(data) {
  return data?.choices?.[0]?.message?.content
    ?? data?.choices?.[0]?.text
    ?? data?.result?.content
    ?? data?.result
    ?? data?.response
    ?? '';
}

export async function askNoth(identity, text, extra = {}) {
  if (!config.nothApiKey) throw new Error('Falta NOTH_API_KEY en .env');

  const memories = getMemory(identity.key);
  const context = [
    `Usuario: ${identity.name}`,
    `Rol: ${identity.role}`,
    `Relación con Albedo: ${identity.relationship}`,
    `JID disponible: ${identity.jid || 'no disponible'}`,
    `Contexto: ${extra.isGroup ? 'grupo' : 'privado'}`,
    memories.length ? `Memoria reciente: ${JSON.stringify(memories.slice(-10))}` : 'Memoria reciente: vacía'
  ].join('\n');

  const payload = {
    model: config.nothModel,
    messages: [
      { role: 'system', content: ALBEDO_SYSTEM },
      { role: 'system', content: context },
      { role: 'user', content: text }
    ]
  };

  const response = await fetch(config.nothApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.nothApiKey}`
    },
    body: JSON.stringify(payload)
  });

  const raw = await response.text();
  let data;
  try { data = JSON.parse(raw); } catch { data = { response: raw }; }
  if (!response.ok) {
    throw new Error(data?.error?.message || data?.error || `Noth IA respondió ${response.status}`);
  }

  const answer = String(extractText(data)).trim();
  if (!answer) throw new Error('Noth IA devolvió una respuesta vacía');

  addMemory(identity.key, { role: 'user', content: text, at: Date.now() });
  addMemory(identity.key, { role: 'assistant', content: answer, at: Date.now() });
  return answer;
}
