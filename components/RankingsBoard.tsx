import { getScoreSum, sortScores } from "@/utils/helpers/calculateScores";
import { Score } from "./Game";

const RankingsBoard = ({ scores }: { scores: Score[] }) => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        {sortScores(scores).map((player: Score, index: number) => (
          <div key={player.name}>
            {index + 1}: {player.name}: {getScoreSum(player.score)}
          </div>
        ))}
      </div>
    </div>
  );
};

export { RankingsBoard };
