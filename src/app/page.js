"use client";
import { useRef, useState } from "react";

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
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="overflow-x-auto">
        <div className="flex gap-3 items-center pb-5">
          <button className="btn" onClick={addPlayer}>
            Add Player
          </button>
          <button className="btn" onClick={clearScores}>
            New Game
          </button>
        </div>
        <div className="overflow-x-auto ">
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
                      // onKeyDown={handleButtonPress}
                      className="w-[100px] bg-transparent"
                      tabIndex={playerIndex + 1}
                    />
                  </th>
                  {player.score.map((score, round) => (
                    <td key={round}>
                      <input
                        tabIndex={(round + 1) * scores.length + playerIndex + 1}
                        className="w-[30px] bg-slate-700 rounded-sm"
                        id={`${playerIndex}-${round}`}
                        value={scores[playerIndex].score[round]}
                        // value={(round + 1) * scores.length + playerIndex + 1}
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
