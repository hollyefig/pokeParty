import React, { useEffect, useState } from "react";
import "./header.css";
import PokemonSelection from "/Users/hollyfigenshu/Desktop/Web Work/code/pokemonevolution/src/StarterSelection/PokemonSelection.js";

export default function Header({
  addToParty,
  addStarterDisabled,
  rollDisabled,
  setRollDisabled,
  rollMessage,
  setRollMessage,
  rollCount,
  setRollCount,
}) {
  // parallax scrolling
  const [offSet, setOffset] = useState(0);

  const handleScroll = () => setOffset(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [fadeIn, setFadeIn] = useState({
    opacity: 0,
    top: "20px",
  });

  useEffect(() => {
    setFadeIn({
      opacity: 1,
      top: "0px",
    });
  }, []);

  return (
    <div className='headerWrapper'>
      <div
        className='parallaxBackground'
        style={{ transform: `translateY(${offSet * -0.5}px)` }}
      ></div>

      <div className='title'>
        <h2 style={fadeIn}>Assemble Your </h2>
        <h1 style={fadeIn}>Pokemon Party</h1>
      </div>

      <PokemonSelection
        addToParty={addToParty}
        addStarterDisabled={addStarterDisabled}
        rollDisabled={rollDisabled}
        setRollDisabled={setRollDisabled}
        rollMessage={rollMessage}
        setRollMessage={setRollMessage}
        rollCount={rollCount}
        setRollCount={setRollCount}
      />
    </div>
  );
}
