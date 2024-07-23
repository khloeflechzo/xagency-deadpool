export const leadingZeroes = (num: number, length: number): string => {
  return String(num).padStart(length, '0');
};
