export function clampNumber(num, a, b) {
  return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
}

export function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

