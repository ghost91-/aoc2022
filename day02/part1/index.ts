import { dirname, resolve } from "path";
import { URL, fileURLToPath } from "url";
import fs from "fs";

export const path = resolve(
  dirname(fileURLToPath(new URL(import.meta.url))),
  "."
);

type Round = ["A" | "B" | "C", "X" | "Y" | "Z"];

const data = fs.readFileSync(`${path}/input`, "utf-8");
const rounds = data.split(/\r?\n/).map((r) => r.split(" ")) as Round[];

function sum(ns: number[]): number {
  return ns.reduce((sum, n) => sum + n);
}

const scoreForChoice = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
} as const;

const evaluateRound = (round: Round) => {
  const s = scoreForChoice[round[1]];
  const difference = (s - scoreForChoice[round[0]] + 3) % 3;
  switch (difference) {
    case 0:
      return s + 3;
    case 1:
      return s + 6;
    case 2:
      return s;
    default:
      throw Error();
  }
};

const result = sum(rounds.map(evaluateRound));

console.log(result);
