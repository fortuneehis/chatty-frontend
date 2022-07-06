export const textOverflowFix = (word: string, max: number): string => {
  return word.length > max ? `${word.slice(0, max)}...` : word
}
