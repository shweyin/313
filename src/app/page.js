"use client";
import { useRef, useState } from "react";

export default function Home() {
  const [round, setRound] = useState(1);
  const [scores, setScores] = useState([
    {
      name: "Player1",
      score: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    },
  ]);
  const inputsRef = useRef([]);

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

  const handleButtonPress = (e, rowIndex, colIndex) => {
    if (e.key !== "Tab" && e.key !== "Enter") return;
    e.preventDefault();

    // Calculate the index of the input below
    const nextRowIndex = rowIndex + 1;
    const nextInputIndex =
      nextRowIndex * inputsRef.current[0].length + colIndex;

    // Focus on the input below
    if (
      inputsRef.current[nextRowIndex] &&
      inputsRef.current[nextRowIndex][colIndex]
    ) {
      inputsRef.current[nextRowIndex][colIndex].focus();
    } else if (inputsRef.current[nextInputIndex]) {
      inputsRef.current[nextInputIndex].focus();
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="overflow-x-auto">
        <div className="flex gap-3 items-center pb-5">
          <div className="flex grow">Round: {round}</div>
          <button className="btn" onClick={addPlayer}>
            +
          </button>
          <button className="btn" onClick={clearScores}>
            Clear
          </button>
        </div>
        <div className="overflow-x-auto ">
          <table className="table table-xs ">
            <thead>
              <tr>
                <th>Player</th>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((round) => (
                  <th key={round}>
                    <button onClick={() => setRound(round)}>R{round}</button>
                  </th>
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
                    />
                  </th>
                  {player.score.map((score, round) => (
                    <td key={round}>
                      <input
                        className="w-[30px] bg-slate-700 rounded-sm"
                        id={`${playerIndex}-${round}`}
                        value={scores[playerIndex].score[round]}
                        ref={(input) =>
                          (inputsRef.current[
                            playerIndex * scores.length + round
                          ] = input)
                        }
                        onKeyDown={(e) =>
                          handleButtonPress(e, playerIndex, round)
                        }
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
            {/* <tfoot>
            <tr>
              <th>Player</th>
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
          </tfoot> */}
          </table>
        </div>
      </div>
    </main>
  );
}
