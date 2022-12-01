import { getTextInput, sumReducer } from '../lib/util';

const dataSets = {
  input: getTextInput(__dirname, 'input.txt'),
  test1: getTextInput(__dirname, 'test1.txt')
};

function countCalories(data: string): number[] {
  return data
    .replace(/\n$/, '')
    .split('\n\n')
    .map(s =>
      s.split('\n')
        .map(Number)
        .reduce(sumReducer, 0)
    );
}

function part1(calories: number[]): number {
  return Math.max(...calories);
}

function part2(calories: number[]): number {
  return calories
    .reduce((top3, next) =>
        next <= top3[0]
          ? top3
          : [next, ...top3.slice(1)].sort((a, b) => a - b)
      , [0, 0, 0])
    .reduce(sumReducer, 0);
}

// console.log(part1(countCalories(dataSets.test1)));
console.log('part1:', part1(countCalories(dataSets.input)));

// console.log(part2(countCalories(dataSets.test1)));
console.log('part2:', part2(countCalories(dataSets.input)));
