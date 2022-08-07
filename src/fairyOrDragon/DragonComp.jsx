import React, { useState, useEffect } from "react";
import { getType, getDragonMonData } from "../APIcalls";
import PokeballAnimation from "../PokeballAnimation";

export default function DragonComp({
  addToParty,
  rollMessage,
  addFodDisabled,
  fodRollDisabled,
  fodRollCount,
  setFodRollCount,
  setRollMessage,
  setFodRollDisabled,
}) {
  const [dragonMon, setDragonMon] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDragonMon();
  }, []);

  const getDragonMon = async () => {
    setLoading(true);
    const res = await getType(16);
    const mons = res.pokemon;
    const randNum = Math.floor(Math.random() * mons.length);
    const url = mons[randNum].pokemon.url;
    const fetchedMon = await getDragonMonData(url);
    setDragonMon(fetchedMon);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  //reroll
  const reRollButton = () => {
    setFodRollCount((prev) => prev - 1);
    if (fodRollCount === 2) {
      setRollMessage(
        <>
          <p>Roll</p>
          <p>Left!</p>
        </>
      );
    }
    if (fodRollCount === 1) {
      setRollMessage(
        <>
          <p>Rolls</p>
          <p>Left!</p>
        </>
      );
      setFodRollDisabled(true);
    }
  };

  // console.log("get dragon info: ", dragonMon);

  return (
    <div className='dragonDataWrapper'>
      {loading ? (
        <>
          <PokeballAnimation />
          <h2>&nbsp;</h2>
        </>
      ) : (
        <>
          <img
            src={dragonMon.sprites.other["official-artwork"].front_default}
            className='monImgDouble'
          />
          <h2>{dragonMon.name}</h2>
        </>
      )}

      <button
        className='add'
        onClick={() => addToParty(dragonMon)}
        disabled={addFodDisabled}
      >
        Add to Party!
      </button>
      <div className='reRollWrapper'>
        <button
          className='reRoll'
          onClick={() => getDragonMon() && reRollButton()}
          disabled={fodRollDisabled}
        >
          ReRoll
        </button>
        <div className='rollsLeftWrapper'>
          <h1>{fodRollCount}</h1>
          <div className='rollsLeftText'>{rollMessage}</div>
        </div>
      </div>
    </div>
  );
}
