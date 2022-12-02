import { dirname, resolve } from "path";
import { URL, fileURLToPath } from "url";
import fs from "fs";

export const path = resolve(
  dirname(fileURLToPath(new URL(import.meta.url))),
  "."
);

const data = fs.readFileSync(`${path}/input`, "utf-8");
const elves = data
  .split(/\r?\n\r?\n/)
  .map((fg) => fg.split(/\r?\n/).map((f) => Number.parseInt(f)));

function sum(ns: number[]): number {
  return ns.reduce((sum, n) => sum + n);
}

function findElfWithMostFood(elves: number[][]): {
  index: number | undefined;
  total: number;
} {
  return elves.reduce<{ index: number | undefined; total: number }>(
    (max, elf, index) => {
      const total = sum(elf);
      return total > max.total ? { index, total } : max;
    },
    { index: undefined, total: 0 }
  );
}

const result = findElfWithMostFood(elves);

console.log(result);
