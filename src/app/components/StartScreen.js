"use client";
import { useState } from "react";

const StartScreen = () => {
  const [showStartScreen, setShowStartScreen] = useState(true);
  return (
    <div>
      {showStartScreen && (
        <div
          className="absolute bg-black inset-0 z-10"
          onClick={() => setShowStartScreen(false)}
        ></div>
      )}
    </div>
  );
};

export default StartScreen;
