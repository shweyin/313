"use client";
import { useState } from "react";
import Image from "next/image";
import sign from "../assets/sign.png";
import Snow from "../assets/snow.jpg";
import santa from "../assets/santa.gif";

const StartScreen = () => {
  const [showStartScreen, setShowStartScreen] = useState(true);
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${Snow.src})` }}
        className={`bg-white bg-no-repeat bg-cover bg-center bg-fixed absolute flex flex-col justify-center inset-0 z-10 text-center cursor-pointer duration-300 ${
          showStartScreen ? "translate-y-0" : "translate-y-[-100%]"
        }`}
        onClick={() => setShowStartScreen(false)}
      >
        <Image
          className="mt-0 mb-o mr-auto ml-auto p-4 w-64 object-cover lg:w-[540px]"
          src={sign}
          alt="sign"
        />
        <Image
          className="mt-0 mb-o mr-auto ml-auto w-24 lg:w-32"
          src={santa}
          alt="my gif"
        />
        <button
          type="button"
          className="pt-5 text-top-button font-medium animate-bounce "
        >
          Tap to Start...
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
