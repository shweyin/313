"use client";
import { useEffect, useState } from "react";
import StartScreen from "./StartScreen";
import Sky from "../assets/sky.jpg";

// const colors = [
//   "bg-orange-400",
//   "bg-emerald-400",
//   "bg-cyan-400",
//   "bg-indigo-400",
//   "bg-pink-400",
// ];

const colors = [
  ["bg-slate-300", "text-black"],
  ["bg-slate-400", "text-black"],
  ["bg-slate-500", "text-white"],
  ["bg-slate-600", "text-white"],
  ["bg-slate-700", "text-white"],
];

const BLANK_GAME: Score[] = [
  {
    name: "1",
    score: ["", "", "", "", "", "", "", "", "", "", ""],
  },
];

type Score = {
  name: string;
  score: string[];
};

export default function Game() {
  const [scores, setScores] = useState<Score[]>(BLANK_GAME);

  useEffect(() => {
    const gamestate = window.localStorage.getItem("GAMESTATE");
    if (gamestate !== null) {
      setScores(JSON.parse(window.localStorage.getItem("GAMESTATE")!));
    }
  }, []);

  const setGamestate = (gamestate: Score[]) => {
    setScores(gamestate);
    window.localStorage.setItem("GAMESTATE", JSON.stringify(gamestate));
  };
  // const [scores, setScores] = useState<any[]>([
  //   {
  //     name: "1",
  //     score: ["", "", "", "", "", "", "", "", "", "", ""],
  //   },
  // ]);

  const addPlayer = () => {
    setGamestate([
      ...scores,
      {
        name: `${scores.length + 1}`,
        score: ["", "", "", "", "", "", "", "", "", "", ""],
      },
    ]);
  };

  const removePlayer = (index: number) => {
    if (scores.length === 1) return;
    const newGamestate = [...scores];
    newGamestate.splice(index, 1);
    setGamestate(newGamestate);
  };

  const clearScores = () => {
    setGamestate(
      scores.map((e) => ({
        ...e,
        score: ["", "", "", "", "", "", "", "", "", "", ""],
      }))
    );
  };

  const handleInput = (e: any) => {
    const playerIndex = e.target.id.substring(0, e.target.id.lastIndexOf("-"));
    const roundIndex = e.target.id.substring(e.target.id.indexOf("-") + 1);

    let newScores = [...scores];
    let newScore = scores[playerIndex].score;
    newScore[roundIndex] = e.target.value;

    newScores[playerIndex] = { ...scores[playerIndex], score: newScore };

    setGamestate(newScores);
  };

  const handleNameChange = (e: any) => {
    let newScores = [...scores];
    newScores[e.target.id].name = e.target.value;

    setGamestate(newScores);
  };

  const getScoreSum = (score: any) => {
    return score.reduce(
      (accumulator: any, currentValue: any) => accumulator + +currentValue,
      0
    );
  };

  const getPlaceNumber = (targetPlayer: any) => {
    const temp: any[] = [];
    const sortedScores: any[] = temp
      .concat(scores)
      .sort((playerA: any, playerB: any) => {
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

  return (
    <main
      style={{ backgroundImage: `url(${Sky.src})` }}
      className="bg-no-repeat bg-cover bg-center bg-fixed flex min-h-screen flex-col items-center justify-between p-10"
    >
      <div className="flex flex-col overflow-x-auto">
        <StartScreen />

        <div className="flex gap-3 items-center pb-5">
          <button className="btn bg-gray-800" onClick={addPlayer}>
            Add Player
          </button>
          <button className="btn bg-gray-800" onClick={clearScores}>
            New Game
          </button>
        </div>
        <div className="overflow-x-auto bg-gray-800	p-3 rounded-md">
          <table className="table table-xs table-zebra">
            <thead>
              <tr>
                <th>Player Name</th>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((round) => (
                  <th key={round}>R{round}</th>
                ))}
                <th>Total</th>
                <th>Place</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((player, playerIndex) => (
                <tr key={playerIndex}>
                  <th>
                    <input
                      onChange={handleNameChange}
                      id={`${playerIndex}`}
                      // value={scores[playerIndex].name}
                      value={"New Player"}
                      className="bg-transparent rounded-sm p-1  focus:bg-slate-700 outline-none input input-bordered input-xs w-full max-w-xs"
                      tabIndex={playerIndex + 1}
                      onFocus={(event) => {
                        event.target.select();
                      }}
                    />
                  </th>
                  {player.score.map((score: any, round: any) => (
                    <td key={round}>
                      <input
                        tabIndex={(round + 1) * scores.length + playerIndex + 1}
                        className={`${
                          colors[playerIndex % 5][0] +
                          " " +
                          colors[playerIndex % 5][1]
                        } focus:opacity-80 rounded-sm p-1 text-white focus:outline-white input input-bordered input-xs w-full max-w-xs`}
                        id={`${playerIndex}-${round}`}
                        value={scores[playerIndex].score[round]}
                        type="number"
                        onChange={handleInput}
                      />
                    </td>
                  ))}
                  <th className="text-center">{getScoreSum(player.score)}</th>
                  <th className="text-center">{getPlaceNumber(player)}</th>
                  <th>
                    <button
                      className=""
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
                  </th>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Player Name</th>
                <th>3 Cards</th>
                <th>4 Cards</th>
                <th>5 Cards</th>
                <th>6 Cards</th>
                <th>7 Cards</th>
                <th>8 Cards</th>
                <th>9 Cards</th>
                <th>10 Cards</th>
                <th>11 Cards</th>
                <th>12 Cards</th>
                <th>13 Cards</th>
                <th>Total</th>
                <th>Place</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </main>
  );
}
