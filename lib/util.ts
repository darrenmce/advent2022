import fs from 'fs';
import path from 'path';

export function getTextInput(...paths: string[]): string {
  return fs.readFileSync(path.resolve(...paths), { encoding: 'utf-8' });
}

export function toTrimmedLineArray(data: string): string[] {
  return data.split('\n').map(s => s.trim());
}

export const multiplier = (x: number, y: number) => x * y;

export const sumReducer = (t: number, val: number): number => t + val;

export const debugMapper = (val: any) => {
  console.log(val);
  return val;
}
