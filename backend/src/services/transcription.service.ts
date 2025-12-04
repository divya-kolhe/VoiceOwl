import { TranscriptionModel, ITranscription } from '../models/transcription.model';
import { mockDownloadAudio } from '../utils/download.mock';
import { retry } from '../utils/retry'

export interface CreateTranscriptionDTO {
  audioUrl: string;
}

export class TranscriptionService {
  static async create(dto: CreateTranscriptionDTO): Promise<ITranscription> {
    // Try to download (mocked) with retry
    const audioBuffer = await retry(() => mockDownloadAudio(dto.audioUrl), 3, 200);

    // "Transcribe" - MOCK
    // In a real implementation, we'd call a STT engine here
    const transcriptionText = `transcribed text for ${dto.audioUrl}`;

    const doc = await TranscriptionModel.create({
      audioUrl: dto.audioUrl,
      transcription: transcriptionText,
      createdAt: new Date()
    });

    // Return the saved doc
    return doc;
  }

  static async createFromAzure(audioUrl: string, transcriptionText: string) {
    const doc = await TranscriptionModel.create({
      audioUrl,
      transcription: transcriptionText,
      source: 'azure',
      createdAt: new Date()
    });
    return doc;
  }

  static async listRecent(days = 30) {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    return TranscriptionModel.find({ createdAt: { $gte: since } }).sort({ createdAt: -1 }).exec();
  }
}
