import { getScoreSum } from "@/utils/helpers/calculateScores";
import { Score } from "./Game";

const RankingsBoard = ({ scores }: { scores: Score[] }) => {
  return (
    <div>
      {scores.map((player, index) => (
        <div key={player.name}>
          {player.name}: {getScoreSum(player.score)}
        </div>
      ))}
    </div>
  );
};

export { RankingsBoard };
