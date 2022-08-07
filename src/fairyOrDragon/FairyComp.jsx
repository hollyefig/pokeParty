import React, { useState, useEffect } from "react";
import { getFairyMonData, getType } from "../APIcalls";
import PokeballAnimation from "../PokeballAnimation";

export default function FairyComp({
  addToParty,
  rollMessage,
  addFodDisabled,
  fodRollDisabled,
  fodRollCount,
  setFodRollCount,
  setRollMessage,
  setFodRollDisabled,
}) {
  useEffect(() => {
    getFairyMon();
  }, []);

  const [fairyMon, setFairyMon] = useState();
  const [loading, setLoading] = useState(true);

  const getFairyMon = async () => {
    setLoading(true);
    const res = await getType(18);
    const fairyArray = res.pokemon;
    const randNum = Math.floor(Math.random() * fairyArray.length);
    const url = fairyArray[randNum].pokemon.url;
    const fetchedMon = await getFairyMonData(url);
    setFairyMon(fetchedMon);
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

  //   console.log("fairy mon:", fairyMon);

  return (
    <div className='fairyDataWrapper'>
      {loading ? (
        <>
          <PokeballAnimation />
          <h2>&nbsp;</h2>
        </>
      ) : (
        <>
          <img
            src={fairyMon.sprites.other["official-artwork"].front_default}
            className='monImgDouble'
          />
          <h2>{fairyMon.name}</h2>
        </>
      )}

      <button
        className='add'
        onClick={() => addToParty(fairyMon)}
        disabled={addFodDisabled}
      >
        Add to Party!
      </button>
      <div className='reRollWrapper'>
        <button
          className='reRoll'
          onClick={() => getFairyMon() && reRollButton()}
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
