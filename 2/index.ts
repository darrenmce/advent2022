import { getTextInput, sumReducer } from '../lib/util';

const dataSets = {
  input: getTextInput(__dirname, 'input.txt'),
  test1: getTextInput(__dirname, 'test1.txt')
};

type RPSPlay = 1 | 2 | 3;
const ALL_PLAYS: RPSPlay[] = [1, 2, 3];
type RPSRound = [RPSPlay, RPSPlay];
const DecodeRPSMap: Record<string, RPSPlay> = { A: 1,  B: 2,  C: 3,  X: 1,  Y: 2,  Z: 3 };

function decodeRPS(str: string): RPSRound {
  return str.split(' ').map(c => DecodeRPSMap[c]) as RPSRound;
}

function outcome([them, us]: RPSRound): 0 | 3 | 6 {
  if (us === them) return 3;
  return us - them === 1 || us - them === -2 ? 6 : 0;
}

function parseInput(input: string): string[] {
  return input.split('\n').filter(Boolean);
}

function part1(input: string) {
  return parseInput(input)
    .map(decodeRPS)
    .map((r) => r[1] + outcome(r))
    .reduce(sumReducer);
}

function decodeRPSPart2([them, result]: RPSRound): RPSRound {
  return [them, ALL_PLAYS.find((play) => outcome([them, play]) === (result - 1) * 3) as RPSPlay];
}

function part2(input: string) {
  return parseInput(input)
    .map(decodeRPS)
    .map(decodeRPSPart2)
    .map((r) => r[1] + outcome(r))
    .reduce(sumReducer);
}

// console.log(part1(dataSets.test1));
console.log('part1:', part1(dataSets.input));

// console.log(part2(dataSets.test1));
console.log('part2:', part2(dataSets.input));
