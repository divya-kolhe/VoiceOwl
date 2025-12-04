import mongoose from 'mongoose';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app';
import { TranscriptionModel } from '../models/transcription.model';

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongo) await mongo.stop();
});

afterEach(async () => {
  await TranscriptionModel.deleteMany({});
});

describe('POST /api/transcription', () => {
  it('creates a transcription and returns id', async () => {
    const res = await request(app)
      .post('/api/transcription')
      .send({ audioUrl: 'https://example.com/test.mp3' })
      .expect(200);

    expect(res.body.id).toBeDefined();
    const created = await TranscriptionModel.findById(res.body.id).exec();
    expect(created).not.toBeNull();
    expect(created?.audioUrl).toBe('https://example.com/test.mp3');
  });

  it('rejects without audioUrl', async () => {
    const res = await request(app).post('/api/transcription').send({}).expect(400);
    expect(res.body.error).toBeDefined();
  });
});

describe('GET /api/transcriptions', () => {
  it('returns only recent transcriptions (30 days)', async () => {
    // create one old and one new
    const old = await TranscriptionModel.create({
      audioUrl: 'old.mp3',
      transcription: 'old',
      createdAt: new Date(Date.now() - 40 * 24 * 3600 * 1000)
    });
    const recent = await TranscriptionModel.create({
      audioUrl: 'recent.mp3',
      transcription: 'recent',
      createdAt: new Date()
    });

    const res = await request(app).get('/api/transcriptions').expect(200);
    const urls = res.body.map((r: any) => r.audioUrl);
    expect(urls).toContain('recent.mp3');
    expect(urls).not.toContain('old.mp3');
  });
});
