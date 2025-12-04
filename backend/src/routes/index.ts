import { Router } from 'express';
import { createTranscription, listTranscriptions } from '../controllers/transcription.controller';
import { createAzureTranscription } from '../controllers/azure.controller';

const router = Router();

router.post('/transcription', createTranscription);
router.get('/transcriptions', listTranscriptions);

router.post('/azure-transcription', createAzureTranscription);

export default router;
