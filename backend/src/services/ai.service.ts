import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const PROMPT_PATH = path.resolve(__dirname, '../prompts/profession_analysis.txt');
const ROUTELLM_BASE = process.env.ROUTELLM_BASE_URL || 'https://routellm.abacus.ai/v1';
const API_KEY = process.env.ROUTELLM_API_KEY || '';

export async function generateRecommendations(profession: string) {
  const promptTemplate = fs.readFileSync(PROMPT_PATH, 'utf8');
  const prompt = `${promptTemplate}\n\nKullanıcının mesleği: ${profession}`;

  const response = await fetch(`${ROUTELLM_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: prompt }],
      max_tokens: 1200,
    }),
  });

  if (!response.ok) {
    throw new Error(`AI API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
