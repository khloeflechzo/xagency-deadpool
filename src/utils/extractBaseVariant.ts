export default function extractBaseVariant(input: string): string | null {
  const match = input.match(/^([a-zA-Z0-9]+)(?:_[a-zA-Z0-9]+)?$/);

  return match ? match[1] : null;
}
