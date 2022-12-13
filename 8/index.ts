import { getTextInput } from '../lib/util';

const dataSets = {
  input: getTextInput(__dirname, 'input.txt'),
  test1: getTextInput(__dirname, 'test1.txt')
};

function parseInput(str: string): number[][] {
  return str.split('\n').filter(Boolean).map(r => r.split('').map(n => parseInt(n, 10)));
}
function transpose(arr: number[][]): number[][] {
  return arr[0].map((_, i) => arr.map(r => r[i]))
}

function setVisibility(visible: Set<string>, source: number[][], transposeGrid: boolean) {
  const grid = transposeGrid ? transpose(source) : source;
  for (let rownum = 0; rownum < grid.length; rownum++) {
    const row = grid[rownum];
    let lMax = -1;
    let rMax = -1;
    for (let left = 0; left < row.length; left++) {
      const right = row.length - left - 1;
      if (row[left] > lMax) {
        transposeGrid ? visible.add(`${left},${rownum}`) : visible.add(`${rownum},${left}`);
        lMax = row[left];
      }
      if (row[right] > rMax) {
        transposeGrid ? visible.add(`${right},${rownum}`) : visible.add(`${rownum},${right}`);
        rMax = row[right];
      }
    }
  }
}
function calcScore(size: number, sight: number[]): number {
  let score = 0;
  for (const tree of sight) {
    score++;
    if (tree >= size) break;
  }
  return score;
}

function mapMultIncr(map: Map<string, number>, key: string, val: number) {
  map.set(key, map.has(key) ? map.get(key) * val : val);
}

function setScores(scores: Map<string, number>, source: number[][], transposeGrid: boolean) {
  const grid = transposeGrid ? transpose(source) : source;
  for (let rownum = 0; rownum < grid.length; rownum++) {
    const row = grid[rownum];
    for (let left = 0; left < row.length; left++) {
      const right = row.length - left - 1;
      mapMultIncr(scores,transposeGrid ? `${left},${rownum}`: `${rownum},${left}`, calcScore(row[left], row.slice(left + 1)));
      mapMultIncr(scores,transposeGrid ? `${right},${rownum}`: `${rownum},${right}`, calcScore(row[right], row.slice(0, right).reverse()));
    }
  }
}
function part1(input: string) {
  const grid = parseInput(input);
  const visible = new Set<string>();
  setVisibility(visible, grid, false);
  setVisibility(visible, grid, true);
  return visible.size;
}

function part2(input: string) {
  const grid = parseInput(input);
  const scores = new Map<string, number>();
  setScores(scores, grid, false);
  setScores(scores, grid, true);
  return Math.max(...scores.values());
}
// console.log(part1(dataSets.test1));
console.log('part1:', part1(dataSets.input));

// console.log(part2(dataSets.test1));
console.log('part2:', part2(dataSets.input));
