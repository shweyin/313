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

export const getScoreSum = (score: any) => {
  return score.reduce(
    (accumulator: any, currentValue: any) => accumulator + +currentValue,
    0
  );
};
