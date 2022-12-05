import { getTextInput, sumReducer } from '../lib/util';

const dataSets = {
  input: getTextInput(__dirname, 'input.txt'),
  test1: getTextInput(__dirname, 'test1.txt')
};

function getPriority(char: string): number {
  const code = char.charCodeAt(0);
  return code >= 97 ? code - 96 : code - 38;
}

function findCommonChar([str1, str2, str3]: [string, string, string?]): string {
  const str1Tokens = str1.split('');
  const str3Tokens = str3?.split('') ?? undefined;
  return str2.split('').find((t) => str1Tokens.includes(t) && (!str3Tokens || str3Tokens.includes(t)));
}

function part1(input: string) {
  return input.trim().split('\n')
    .map(s => [s.slice(0, s.length / 2), s.slice(s.length / 2)])
    .map(findCommonChar)
    .map(getPriority)
    .reduce(sumReducer, 0)
}

function part2(input: string) {
  return input.trim().split('\n')
    .reduce((prev, line) => {
      if (prev[prev.length - 1]?.length < 3) prev[prev.length - 1].push(line);
      else prev.push([line])
      return prev;
    }, [])
    .map(findCommonChar)
    .map(getPriority)
    .reduce(sumReducer, 0)
}

// console.log(part1(dataSets.test1));
console.log('part1:', part1(dataSets.input));

// console.log(part2(dataSets.test1));
console.log('part2:', part2(dataSets.input));
