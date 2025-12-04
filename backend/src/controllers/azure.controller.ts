import { Request, Response, NextFunction } from 'express';
import { transcribeWithAzure } from '../services/azure.service';
import { TranscriptionService } from '../services/transcription.service';

export async function createAzureTranscription(req: Request, res: Response, next: NextFunction) {
  try {
    const { audioUrl, locale } = req.body;
    if (!audioUrl) return res.status(400).json({ error: 'audioUrl is required' });

    // Mock download handled inside Azure service or prior. Here we directly call azure transcribe stub.
    const transcriptionText = await transcribeWithAzure(audioUrl, locale || 'en-US');

    const doc = await TranscriptionService.createFromAzure(audioUrl, transcriptionText);

    res.json({ id: doc._id });
  } catch (err) {
    next(err);
  }
}
