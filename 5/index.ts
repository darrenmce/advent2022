import { getTextInput } from '../lib/util';

const dataSets = {
  input: getTextInput(__dirname, 'input.txt'),
  test1: getTextInput(__dirname, 'test1.txt')
};

type Stack = string[][];
type Moves = [number, number, number][];

function parseStack(str: string): Stack {
  const r = str.split('\n');
  const stack: Stack = r.pop().trim().split(/\s+/).map(() => []);
  while (r.length) {
    const row = r.pop();
    stack.forEach((col, i) => {
      const stackChar = row.charAt((i * 4) + 1).trim();
      if (stackChar) stack[i].push(stackChar);
    });
  }
  return stack;
}

function parseMoves(str: string): Moves {
  return str.trim().split('\n').map((moveStr) =>
    moveStr.replace(/move|from|to/g, '').trim().split(/\s+/).map(Number) as [number, number, number]
  );
}

function parseInput(input: string): [Stack, Moves] {
  const [stackStr, movesStr] = input.split('\n\n');
  return [parseStack(stackStr), parseMoves(movesStr)];
}

function part1(input: string) {
  const [stack, moves] = parseInput(input);
  moves.forEach(([num, from, to]) => {
    while (num--) stack[to - 1].push(stack[from - 1].pop());
  });
  return stack.map(s => s.pop()).join('');
}

function part2(input: string) {
  const [stack, moves] = parseInput(input);
  moves.forEach(([num, from, to]) => {
    stack[to - 1].push(...stack[from - 1].splice(stack[from - 1].length - num));
  });
  return stack.map(s => s.pop()).join('');
}

// console.log(part1(dataSets.test1));
console.log('part1:', part1(dataSets.input));

// console.log(part2(dataSets.test1));
console.log('part2:', part2(dataSets.input));
