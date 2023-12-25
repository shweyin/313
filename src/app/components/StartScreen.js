"use client";
import { useState } from "react";
import Image from "next/image";
import sign from "../../assets/images/sign.png";
import santa from "../../assets/images/santa.gif";

const StartScreen = () => {
  const [showStartScreen, setShowStartScreen] = useState(true);
  return (
    <div>
      {showStartScreen && (
        <div
          className="absolute bg-top inset-0 z-10 text-center"
          onClick={() => setShowStartScreen(false)}
        >
          <Image
            className="mt-0 mb-o mr-auto ml-auto p-4 w-96"
            src={sign}
            width={500}
            height={500}
            alt="sign"
          />
          <Image
            className="mt-0 mb-o mr-auto ml-auto w-36"
            src={santa}
            alt="my gif"
            height={500}
            width={500}
          />
          <button type="button" className="text-top-button font-medium">Tap to Start...</button>
        </div>
      )}
    </div>
  );
};

export default StartScreen;
