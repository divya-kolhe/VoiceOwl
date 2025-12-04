/**
 * Simple retry helper that supports attempts and exponential backoff.
 */
export async function retry<T>(
    fn: () => Promise<T>,
    attempts = 3,
    baseDelayMs = 200
  ): Promise<T> {
    let lastErr: any;
    for (let i = 0; i < attempts; i++) {
      try {
        return await fn();
      } catch (err) {
        lastErr = err;
        const delay = baseDelayMs * Math.pow(2, i);
        await new Promise((res) => setTimeout(res, delay));
      }
    }
    throw lastErr;
  }
  