"use client";
import { useRef, useState } from "react";
import StartScreen from "./components/StartScreen";
import Sky from "../assets/images/sky.jpg";

export default function Home() {
  const [scores, setScores] = useState([
    {
      name: "Player1",
      score: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    },
  ]);

  const addPlayer = () => {
    setScores([
      ...scores,
      {
        name: `Player${scores.length + 1}`,
        score: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
      },
    ]);
  };

  const clearScores = () => {
    setScores(
      scores.map((e) => ({
        ...e,
        score: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
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
          <table className="table table-xs ">
            <thead>
              <tr>
                <th>Player Name</th>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((round) => (
                  <th key={round}>R{round}</th>
                ))}
                <th>Total</th>
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
                        className="bg-slate-700 rounded-sm p-1  focus:bg-slate-600 outline-none input input-bordered input-xs w-full max-w-xs"
                        id={`${playerIndex}-${round}`}
                        value={scores[playerIndex].score[round]}
                        onChange={handleInput}
                      />
                    </td>
                  ))}
                  <th>
                    {player.score.reduce(
                      (accumulator, currentValue) =>
                        accumulator + +currentValue,
                      0
                    )}
                  </th>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Player Name</th>
                <th>R1</th>
                <th>R2</th>
                <th>R3</th>
                <th>R4</th>
                <th>R5</th>
                <th>R6</th>
                <th>R7</th>
                <th>R8</th>
                <th>R9</th>
                <th>R10</th>
                <th>R11</th>
                <th>R12</th>
                <th>R13</th>
                <th>Total</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </main>
  );
}
