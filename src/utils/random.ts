export function randomString(length = 8) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

export function uniqueName(prefix: string) {
  return `${prefix}-${Date.now()}-${randomString(4)}`;
}
