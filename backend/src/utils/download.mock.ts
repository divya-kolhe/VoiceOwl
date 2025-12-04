/**
 * Mock download function that simulates network download.
 * It intentionally fails randomly to demonstrate retry logic.
 */

export async function mockDownloadAudio(url: string): Promise<Buffer> {
    // simulate latency
    await new Promise((res) => setTimeout(res, 100));
  
    // simple validation
    if (!url.startsWith('http')) {
      const e = new Error('Invalid URL');
      // @ts-ignore
      e.code = 'EINVALIDURL';
      throw e;
    }
  
    // Randomly fail to test retry logic (20% failure)
    if (Math.random() < 0.2) {
      const e = new Error('Simulated download failure');
      // @ts-ignore
      e.code = 'EDOWNLOAD';
      throw e;
    }
  
    // Return a dummy buffer representing audio bytes
    return Buffer.from(`audio-data:${url}`);
  }
  