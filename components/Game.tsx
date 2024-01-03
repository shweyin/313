"use client";
import { useState } from "react";
import StartScreen from "./StartScreen";
import Sky from "../assets/sky.jpg";

const colors = [
  "bg-orange-700",
  "bg-emerald-700",
  "bg-cyan-700",
  "bg-indigo-700",
  "bg-pink-700",
];

export default function Game() {
  const [scores, setScores] = useState([
    {
      name: "Player1",
      score: ["", "", "", "", "", "", "", "", "", "", ""],
    },
  ]);

  const addPlayer = () => {
    setScores([
      ...scores,
      {
        name: `Player${scores.length + 1}`,
        score: ["", "", "", "", "", "", "", "", "", "", ""],
      },
    ]);
  };

  const clearScores = () => {
    setScores(
      scores.map((e) => ({
        ...e,
        score: ["", "", "", "", "", "", "", "", "", "", ""],
      }))
    );
  };

  const handleInput = (e) => {
    const playerIndex = e.target.id.substring(0, e.target.id.lastIndexOf("-"));
    const roundIndex = e.target.id.substring(e.target.id.indexOf("-") + 1);

    let newScores = [...scores];
    let newScore = scores[playerIndex].score;
    newScore[roundIndex] = e.target.value;

    newScores[playerIndex] = { ...scores[playerIndex], score: newScore };

    setScores(newScores);
  };

  const handleNameChange = (e) => {
    let newScores = [...scores];
    newScores[e.target.id].name = e.target.value;

    setScores(newScores);
  };

  const getScoreSum = (score) => {
    return score.reduce(
      (accumulator, currentValue) => accumulator + +currentValue,
      0
    );
  };

  const getPlaceNumber = (targetPlayer) => {
    const sortedScores = [].concat(scores).sort((playerA, playerB) => {
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
                      value={scores[playerIndex].name}
                      className="bg-transparent rounded-sm p-1  focus:bg-slate-700 outline-none input input-bordered input-xs w-full max-w-xs"
                      tabIndex={playerIndex + 1}
                    />
                  </th>
                  {player.score.map((score, round) => (
                    <td key={round}>
                      <input
                        tabIndex={(round + 1) * scores.length + playerIndex + 1}
                        className={`${
                          colors[playerIndex % 5]
                        } focus:opacity-80 rounded-sm p-1 text-white focus:outline-white input input-bordered input-xs w-full max-w-xs`}
                        id={`${playerIndex}-${round}`}
                        value={scores[playerIndex].score[round]}
                        type="number"
                        onChange={handleInput}
                      />
                    </td>
                  ))}
                  <th>{getScoreSum(player.score)}</th>
                  <th>{getPlaceNumber(player)}</th>
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
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </main>
  );
}
