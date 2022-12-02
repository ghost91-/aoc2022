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

function foodOfTop3Elves(elves: number[][]): number {
  return sum(
    elves.reduce((top3, elf) => {
      const total = sum(elf);
      return [...top3, total].sort((a, b) => b - a).slice(0, 3);
    }, [])
  );
}

const result = foodOfTop3Elves(elves);

console.log(result);
