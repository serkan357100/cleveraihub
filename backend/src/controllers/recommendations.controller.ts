import { Request, Response } from 'express';
import { generateRecommendations } from '../services/ai.service';

export async function getRecommendations(req: Request, res: Response) {
  try {
    const { profession } = req.body;
    if (!profession) {
      return res.status(400).json({ error: 'Meslek bilgisi gerekli' });
    }

    const aiResponse = await generateRecommendations(profession);
    res.json(aiResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
