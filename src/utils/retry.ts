export async function retry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  let error;

  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      error = e;
    }
  }

  throw error;
}
