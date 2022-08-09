import React, { useState, useEffect } from "react";
import "./eevee.css";
import { getEeveeData, getEevee } from "../APIcalls";
import PokeballAnimation from "../PokeballAnimation";

export default function Eevee({
  addToParty,
  rollMessage,
  setRollMessage,
  addEeveeDisabled,
  eeveeRollDisabled,
  setEeveeRollDisabled,
  eeveeRollCount,
  setEeveeRollCount,
}) {
  const [loading, setLoading] = useState(true);

  const [eevee, setEevee] = useState();
  const [eeveeArray, setEeveeArray] = useState([]);

  const fetchEevees = async () => {
    const water = await getEeveeData(134);
    const elec = await getEeveeData(135);
    const fire = await getEeveeData(136);
    const psy = await getEeveeData(196);
    const dark = await getEeveeData(197);
    const leaf = await getEeveeData(470);
    const ice = await getEeveeData(471);
    const fairy = await getEeveeData(700);
    setEeveeArray([water, elec, fire, psy, dark, leaf, ice, fairy]);
  };

  useEffect(() => {
    fetchEevees();
    getEeveeFunc();
  }, []);

  const getEeveeFunc = async () => {
    setLoading(true);
    setEevee(await getEevee());
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const getEeveelution = async () => {
    setLoading(true);
    setEevee(eeveeArray[Math.floor(Math.random() * eeveeArray.length)]);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  //   reroll
  const reRollButton = () => {
    setEeveeRollCount(eeveeRollCount - 1);
    if (eeveeRollCount === 2) {
      setRollMessage(
        <>
          <p>Roll</p>
          <p>Left!</p>
        </>
      );
    }
    if (eeveeRollCount === 1) {
      setRollMessage(
        <>
          <p>Rolls</p>
          <p>Left!</p>
        </>
      );
      setEeveeRollDisabled(true);
    }
  };

  // parallax scrolling
  const [offSet, setOffset] = useState(0);

  const handleScroll = () => setOffset(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className='eeveeWrapper'>
      <div
        className='parallaxBackgroundEevee'
        style={{ transform: `translateY(${offSet * -0.2}px)` }}
      ></div>
      <div className='eeveeDataWrapper pkmDisplay'>
        <h3>Who is your</h3>
        <h1 className='cardTitleSingle'>Eevee Type?</h1>
        <div className='cardImgWrapperSingle'>
          {loading ? (
            <>
              <PokeballAnimation />
            </>
          ) : (
            <>
              <img
                src={eevee.sprites.other["official-artwork"].front_default}
                className='monImgSingle'
              />
              <h2 className='eggh2'>{eevee.name}</h2>
            </>
          )}
        </div>
        <button
          className='add'
          onClick={() => addToParty(eevee)}
          disabled={addEeveeDisabled}
        >
          Add to Party!
        </button>
        <div className='reRollWrapper'>
          <button
            className='reRoll'
            onClick={() => getEeveelution() && reRollButton()}
            disabled={eeveeRollDisabled}
          >
            Evolve!
          </button>
          <div className='rollsLeftWrapper'>
            <h1 className='rollCounth1'>{eeveeRollCount}</h1>
            <div className='rollsLeftText'>{rollMessage}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
