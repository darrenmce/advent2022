import { getTextInput } from '../lib/util';

const dataSets = {
  input: getTextInput(__dirname, 'input.txt'),
  test1: getTextInput(__dirname, 'test1.txt')
};

const hasDupeChar = (str: string) => str.length > new Set(str.split('')).size;
function part1(input: string, size = 4) {
  for (let i = 0; i < input.length - size; i++) if (!hasDupeChar(input.slice(i, i+size))) return i+size;
}
const part2 = (input: string) => part1(input, 14);

// console.log(part1(dataSets.test1));
console.log('part1:', part1(dataSets.input));
//
// console.log(part2(dataSets.test1));
console.log('part2:', part2(dataSets.input));
