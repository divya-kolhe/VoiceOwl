import dotenv from 'dotenv';
dotenv.config();

const AZURE_KEY = process.env.AZURE_SPEECH_KEY;
const AZURE_REGION = process.env.AZURE_SPEECH_REGION;

export async function transcribeWithAzure(audioUrl: string, locale = 'en-US'): Promise<string> {
  if (!AZURE_KEY || !AZURE_REGION) {
    // stubbed response
    await new Promise((res) => setTimeout(res, 150)); // simulate network
    return `azure-mocked transcription for ${audioUrl} (${locale})`;
  }

  // Real implementation placeholder:
  // - Use azure-cognitiveservices-speech SDK
  // - create SpeechConfig.fromSubscription(AZURE_KEY, AZURE_REGION)
  // - create audio config from file/stream
  // - call recognizer.recognizeOnceAsync or continuous recognition
  // For exam/test purpose we stub here.
  await new Promise((res) => setTimeout(res, 150));
  return `azure-realistic transcription (stubbed) for ${audioUrl} (${locale})`;
}
