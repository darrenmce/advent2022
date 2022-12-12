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

function part1(input: string) {
  const grid = parseInput(input);
  const visible = new Set<string>();
  setVisibility(visible, grid, false);
  setVisibility(visible, grid, true);
  return visible.size;
}

// console.log(part1(dataSets.test1));
console.log('part1:', part1(dataSets.input));

// console.log(part2(dataSets.test1));
// console.log('part2:', part2(dataSets.input));
