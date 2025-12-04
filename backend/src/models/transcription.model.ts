import mongoose, { Schema, Document } from 'mongoose';

export interface ITranscription extends Document {
  audioUrl: string;
  transcription: string;
  source?: string;
  createdAt: Date;
}

const TranscriptionSchema = new Schema<ITranscription>({
  audioUrl: { type: String, required: true, index: true },
  transcription: { type: String, required: true },
  source: { type: String, required: false },
  createdAt: { type: Date, default: () => new Date(), index: true }
});

// create index on createdAt for queries (good for time-range queries)
TranscriptionSchema.index({ createdAt: 1 });

export const TranscriptionModel = mongoose.model<ITranscription>('Transcription', TranscriptionSchema);
