import { getScoreSum, sortScores } from "@/utils/helpers/calculateScores";
import { Score } from "./Game";
import { ChangeEvent } from "react";

const colors = [
  ["bg-slate-300", "text-black"],
  ["bg-slate-400", "text-black"],
  ["bg-slate-500", "text-black"],
  ["bg-slate-600", "text-white"],
  ["bg-slate-700", "text-white"],
];

const Scoreboard = ({
  scores,
  setGameState,
}: {
  scores: Score[];
  setGameState: (gameState: Score[]) => void;
}) => {
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newScores = [...scores];
    newScores[+e.target.id].name = e.target.value;

    setGameState(newScores);
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const playerIndex = +e.target.id.substring(0, e.target.id.lastIndexOf("-"));
    const roundIndex = +e.target.id.substring(e.target.id.indexOf("-") + 1);

    const newScores = scores.map((player, index) => {
      if (index === playerIndex) {
        const newScore = [...player.score];
        newScore[roundIndex] = e.target.value === "" ? null : +e.target.value;
        return { ...player, score: newScore };
      }
      return player;
    });

    setGameState(newScores);
  };

  const removePlayer = (index: number) => {
    if (scores.length === 0) return;
    const newGameState = [...scores];
    newGameState.splice(index, 1);
    setGameState(newGameState);
  };

  return (
    <div className="flex flex-col p-5 gap-5 text-xs rounded-md">
      <div className="grid grid-cols-[100px_repeat(11,1fr)_30px_30px] text-center gap-2">
        <div>Player</div>
        {["3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s", "J", "Q", "K"].map(
          (round) => (
            <div key={round}>{round}</div>
          )
        )}
        <div>Total</div>
        <div></div>
      </div>
      {scores.map((player, playerIndex) => (
        <div
          key={playerIndex}
          className="grid grid-cols-[100px_repeat(11,1fr)_30px_30px] items-center gap-2"
        >
          <input
            onChange={handleNameChange}
            id={`${playerIndex}`}
            value={scores[playerIndex].name}
            className="min-w-0 bg-transparent rounded-sm p-1  focus:bg-slate-700 outline-none input input-bordered input-xs"
            tabIndex={playerIndex + 1}
            onFocus={(event) => {
              event.target.select();
            }}
          />
          {player.score.map((score: number | null, round: number) => (
            <input
              key={round}
              type="number"
              tabIndex={(round + 1) * scores.length + playerIndex + 1}
              className={`${
                colors[playerIndex % 5][0] + " " + colors[playerIndex % 5][1]
              } min-w-0 focus:opacity-80 rounded-sm p-1 focus:outline-white input input-bordered input-xs`}
              id={`${playerIndex}-${round}`}
              value={scores[playerIndex].score[round] ?? ""}
              onChange={handleInput}
            />
          ))}
          <div className="text-center">{getScoreSum(player.score)}</div>
          <button
            className="flex justify-center hover:opacity-70"
            onClick={() => removePlayer(playerIndex)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export { Scoreboard };
