import { Score } from "@/components/Game";

export const getPlaceNumber = (scores: Score[], targetPlayer: Score) => {
  const temp: Score[] = [];
  const sortedScores: Score[] = temp
    .concat(scores)
    .sort((playerA: Score, playerB: Score) => {
      return getScoreSum(playerA.score) > getScoreSum(playerB.score) ? 1 : -1;
    });

  let res = 0;
  sortedScores.forEach((player, index) => {
    if (player.name === targetPlayer.name) {
      res = index;
    }
  });

  return res + 1;
};

export const sortScores = (scores: Score[]) => {
  return scores.toSorted((playerA: Score, playerB: Score) => {
    return getScoreSum(playerA.score) > getScoreSum(playerB.score) ? 1 : -1;
  });
}

export const getScoreSum = (score: (number | null)[]) => {
  return score.reduce(
    (accumulator: number, currentValue: number 
      | null
    ) => {
      const value = currentValue === null ? 0 : currentValue;
      return accumulator + value
    },
    0
  );
};
