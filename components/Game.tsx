"use client";
import { useEffect, useState } from "react";
import Sky from "../assets/sky.jpg";
import { RankingsBoard } from "./RankingsBoard";
import { Scoreboard } from "./Scoreboard";
import StartScreen from "./StartScreen";

const BLANK_GAME: Score[] = [
  {
    name: "New Player",
    score: new Array(11).fill(null),
  },
];

export type Score = {
  name: string;
  score: (number | null)[];
};

export default function Game() {
  const [scores, setScores] = useState<Score[]>(BLANK_GAME);

  useEffect(() => {
    const gamestate = window.localStorage.getItem("GAMESTATE");
    if (gamestate !== null) {
      setScores(JSON.parse(window.localStorage.getItem("GAMESTATE")!));
    }
  }, []);

  const setGameState = (gamestate: Score[]) => {
    setScores(gamestate);
    window.localStorage.setItem("GAMESTATE", JSON.stringify(gamestate));
  };

  const addPlayer = () => {
    setGameState([
      ...scores,
      {
        name: `New Player`,
        score: new Array(11).fill(null),
      },
    ]);
  };

  const clearScores = () => {
    setGameState(
      scores.map((e) => ({
        ...e,
        score: new Array(11).fill(null),
      }))
    );
  };

  return (
    <main
      style={{ backgroundImage: `url(${Sky.src})` }}
      className="bg-no-repeat bg-cover bg-center bg-fixed flex absolute inset-0 p-5 sm:p-10"
    >
      <div className="flex grow flex-col overflow-x-auto">
        <StartScreen />

        <div className="flex gap-3 items-center pb-5">
          <button className="btn bg-gray-800" onClick={addPlayer}>
            Add Player
          </button>
          <button className="btn bg-gray-800" onClick={clearScores}>
            New Game
          </button>
        </div>
        <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name="my_tabs"
            role="tab"
            className="tab"
            aria-label="Scoreboard"
            defaultChecked
          />
          <div
            role="tabpanel"
            className="tab-content bg-gray-800 rounded-box p-6"
          >
            <Scoreboard scores={scores} setGameState={setGameState} />
          </div>

          <input
            type="radio"
            name="my_tabs"
            role="tab"
            className="tab"
            aria-label="Rankings"
          />
          <div
            role="tabpanel"
            className="tab-content bg-gray-800 rounded-box p-6"
          >
            <RankingsBoard scores={scores} />
          </div>
        </div>
      </div>
    </main>
  );
}
