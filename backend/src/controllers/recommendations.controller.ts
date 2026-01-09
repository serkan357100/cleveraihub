import { Request, Response } from 'express';
import { generateRecommendations } from '../services/ai.service';

export async function getRecommendations(req: Request, res: Response) {
  try {
    const { profession } = req.body;
    if (!profession) {
      return res.status(400).json({ error: 'Meslek bilgisi gerekli' });
    }

    const aiResponse = await generateRecommendations(profession);
    return res.json(aiResponse);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Bir hata oluştu' });
  }
}
