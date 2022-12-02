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

const scoreForResult = {
  X: 0,
  Y: 3,
  Z: 6,
} as const;

const choiceToNumber = {
  A: 0,
  B: 1,
  C: 2,
} as const;

const resultToDifference = {
  X: -1,
  Y: 0,
  Z: 1,
} as const;

const evaluateRound = (round: Round) => {
  const s = scoreForResult[round[1]];
  return (
    ((choiceToNumber[round[0]] + resultToDifference[round[1]] + 3) % 3) + 1 + s
  );
};

const result = sum(rounds.map(evaluateRound));

console.log(result);
