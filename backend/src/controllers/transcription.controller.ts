import { Request, Response, NextFunction } from 'express';
import { TranscriptionService } from '../services/transcription.service';

export async function createTranscription(req: Request, res: Response, next: NextFunction) {
  try {
    const { audioUrl } = req.body;
    if (!audioUrl) {
      return res.status(400).json({ error: 'audioUrl is required' });
    }

    const doc = await TranscriptionService.create({ audioUrl });
    res.json({ id: doc._id });
  } catch (err) {
    next(err);
  }
}

export async function listTranscriptions(req: Request, res: Response, next: NextFunction) {
  try {
    // fetch last 30 days by default
    const daysParam = req.query.days ? Number(req.query.days) : 30;
    const days = isNaN(daysParam) ? 30 : daysParam;
    const docs = await TranscriptionService.listRecent(days);
    res.json(docs);
  } catch (err) {
    next(err);
  }
}
