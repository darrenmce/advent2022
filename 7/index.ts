import { getTextInput, sumReducer } from '../lib/util';

const dataSets = {
  input: getTextInput(__dirname, 'input.txt'),
  test1: getTextInput(__dirname, 'test1.txt')
};

type File = {
  name: string,
  size: number
}

type FileSystem = {
  root?: boolean,
  files: File[],
  dirs: Record<string, FileSystem>,
  parent?: FileSystem
  size?: number
}

function calcSizes(fs: FileSystem): number {
  fs.size = (fs.files.length ? fs.files.map(f => f.size).reduce(sumReducer) : 0)
    + (Object.keys(fs.dirs).length ? Object.keys(fs.dirs).map(k => calcSizes(fs.dirs[k])).reduce(sumReducer) : 0);
  return fs.size;
}

function parseInput(str: string): FileSystem {
  const root: FileSystem = { root: true, files: [], dirs: {} };
  let currFs = root;
  const lines = str.split('\n');
  let i = 0;
  while (i < lines.length) {
    if (lines[i].startsWith('$ cd')) {
      const cdCmd = lines[i].split('cd')[1].trim();
      if (cdCmd === '/') currFs = root;
      else if (cdCmd === '..') currFs = currFs.parent
      else if (currFs.dirs[cdCmd]) currFs = currFs.dirs[cdCmd]
      else {
        const newFs = { files: [], dirs: {}, parent: currFs };
        currFs.dirs[cdCmd] = newFs;
        currFs = newFs;
      }
      i++;
    } else if (lines[i].startsWith('$ ls')) {
      while (lines[++i] && !lines[i].startsWith('$')) {
        const [k, v] = lines[i].split(' ');
        if (k !== 'dir') {
          currFs.files.push({ name: v, size: parseInt(k) })
        }
      }
    } else break;
  }
  calcSizes(root);
  return root;
}

function traverse(fs: FileSystem, fn: (fs: FileSystem) => void) {
  fn(fs);
  Object.values(fs.dirs).forEach((f) => traverse(f, fn));
}

function part1(input: string) {
  const rootFs = parseInput(input);
  let validSizes = [];
  traverse(rootFs, (fs) => {
    if (fs.size <= 100000) validSizes.push(fs.size);
  });
  return validSizes.reduce(sumReducer);
}

function part2(input: string) {
  const rootFs = parseInput(input);
  const freeSpace = 70000000 - rootFs.size;
  let validSizes = [];
  traverse(rootFs, (fs) => {
    if ((freeSpace + fs.size) >= 30000000) validSizes.push(fs.size);
  });
  return Math.min(...validSizes);
}

// console.log(part1(dataSets.test1));
console.log('part1:', part1(dataSets.input));

// console.log(part2(dataSets.test1));
console.log('part2:', part2(dataSets.input));
