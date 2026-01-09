// backend/src/services/ai.service.ts
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const PROMPT_PATH = path.resolve(__dirname, '../prompts/profession_analysis.txt');
const ROUTELLM_BASE = process.env.ROUTELLM_BASE_URL || 'https://routellm.abacus.ai/v1';
const API_KEY = process.env.ROUTELLM_API_KEY || '';

export async function generateRecommendations(profession: string, extraContext: Record<string, any> = {}) {
  // Basit doğrulama
  if (!profession || profession.trim().length === 0) {
    throw new Error('Meslek bilgisi gerekli.');
  }
  if (!API_KEY) {
    throw new Error('ROUTELLM_API_KEY ortam değişkeni ayarlı değil.');
  }

  // Prompt'u oku
  const promptTemplate = fs.existsSync(PROMPT_PATH)
    ? fs.readFileSync(PROMPT_PATH, 'utf8')
    : `Sen CleverAIHub'ın satış ve analiz uzmanısın. Kullanıcı hangi dilde yazarsa o dilde cevap ver.`;

  // Prompt'u hazırla
  const prompt = `${promptTemplate}\n\nKullanıcının mesleği: ${profession}\nEk bilgiler: ${JSON.stringify(extraContext)}`;

  // API isteği
  const res = await fetch(`${ROUTELLM_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: `Lütfen önerileri maddeler halinde, her otomasyon için kısa açıklama, maliyet tahmini ve önerilen paket (Starter/Pro/Enterprise) formatında ver.` }
      ],
      max_tokens: 1200,
      temperature: 0.2
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`AI API error: ${res.status} ${res.statusText} ${text}`);
  }

  // Dönen veriyi parse et
  const data = await res.json().catch(() => null);
  if (!data) throw new Error('AI yanıtı boş veya parse edilemedi.');

  // Abacus/RouteLLM cevabının formatına göre döndür (ham JSON)
  return data;
}

export default { generateRecommendations };
