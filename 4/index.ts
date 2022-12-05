import { getTextInput } from '../lib/util';

const dataSets = {
  input: getTextInput(__dirname, 'input.txt'),
  test1: getTextInput(__dirname, 'test1.txt')
};

function convertRangeToBinaryNumber(str: string): bigint {
  const [start, end] = str.split('-').map(Number);
  return BigInt('0b' + Array.from(Array(101)).map((_, i) => i + 1 < start || i + 1 > end ? 0 : 1).reverse().join(''));
}
function part1(input: string) {
  return input.trim().split('\n')
    .map((l) => l.split(',').map(convertRangeToBinaryNumber).sort((a, b) => Number(b - a)))
    .map(([larger, smaller]) => (larger | smaller) === larger)
    .reduce((p, n) => n ? p + 1 : p, 0)
}
function part2(input: string) {
  return input.trim().split('\n')
    .map((l) => l.split(',').map(convertRangeToBinaryNumber).sort((a, b) => Number(b - a)))
    .map(([larger, smaller]) => (larger & smaller) > 0)
    .reduce((p, n) => n ? p + 1 : p, 0)
}

// console.log(part1(dataSets.test1));
console.log('part1:', part1(dataSets.input));

// console.log(part2(dataSets.test1));
console.log('part2:', part2(dataSets.input));
