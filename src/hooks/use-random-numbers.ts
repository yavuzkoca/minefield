export const useRandomNumbers = () => {
  const generateNumbersArray = (n: number): number[] =>
    Array(n)
      .fill(null)
      .map((_, i) => i);

  const generateRandom2DIndexes = (n: number, quantity: number) => {
    const numbers = generateNumbersArray(n * n);
    const randomNumbers = numbers
      .map(value => ({value, sort: Math.random()}))
      .sort((a, b) => a.sort - b.sort)
      .map(({value}) => value)
      .slice(0, quantity);

    return randomNumbers.map(number => [Math.floor(number / 10), number % 10]);
  };

  return {generateRandom2DIndexes};
};
