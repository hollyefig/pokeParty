import React, { useState, useEffect } from "react";
import "./egg.css";
import { getEeveeData } from "../APIcalls";
import PokeballAnimation from "../PokeballAnimation";
import { click } from "@testing-library/user-event/dist/click";

export default function Egg({
  addToParty,
  rollMessage,
  setRollMessage,
  eggRollCount,
  setEggRollCount,
  addEggDisabled,
  setAddEggDisabled,
  eggRollDisabled,
  setEggRollDisabled,
}) {
  useEffect(() => {
    fetchEggs();
  }, []);

  const [eggArray, setEggArray] = useState([]);
  const [egg, setEgg] = useState(
    "https://www.pngkey.com/png/full/26-260102_pokemon-egg-png.png"
  );
  const [hatchAni, setHatchAni] = useState();
  const [isHatched, setIsHatched] = useState(false);
  const [loading, setLoading] = useState();
  const disabled = true;
  const [clickMsg, setClickMsg] = useState("Click me!");

  const fetchEggs = async () => {
    const pichu = await getEeveeData(172);
    const cleffa = await getEeveeData(173);
    const igglybuff = await getEeveeData(174);
    const togepi = await getEeveeData(175);
    const tyrogue = await getEeveeData(236);
    const smoochum = await getEeveeData(238);
    const elekid = await getEeveeData(239);
    const magby = await getEeveeData(240);
    const azurill = await getEeveeData(298);
    const wynaut = await getEeveeData(360);
    const budew = await getEeveeData(406);
    const chingling = await getEeveeData(433);
    const bonsly = await getEeveeData(438);
    const mimejr = await getEeveeData(439);
    const happiny = await getEeveeData(440);
    const munchlax = await getEeveeData(446);
    const riolu = await getEeveeData(447);
    const mantyke = await getEeveeData(458);
    const toxel = await getEeveeData(848);
    setEggArray([
      pichu,
      cleffa,
      igglybuff,
      togepi,
      tyrogue,
      smoochum,
      elekid,
      magby,
      azurill,
      wynaut,
      budew,
      chingling,
      bonsly,
      mimejr,
      happiny,
      munchlax,
      riolu,
      mantyke,
      toxel,
    ]);
  };

  const hatch = () => {
    if (eggRollDisabled === true) {
      setHatchAni({
        opacity: 0,
      });
      setTimeout(() => {
        setEgg(eggArray[Math.floor(Math.random() * eggArray.length)]);
        setIsHatched(true);
        setEggRollDisabled(eggRollCount === 1 ? true : false);
        setAddEggDisabled(false);
        setHatchAni({
          opacity: 1,
        });
      }, 1000);
    } else if (eggRollDisabled === false) {
      setLoading(true);
      setEgg(eggArray[Math.floor(Math.random() * eggArray.length)]);
      setEggRollCount(eggRollCount - 1);
      if (eggRollCount === 2) {
        setRollMessage(
          <>
            <p>Roll</p>
            <p>Left!</p>
          </>
        );
      }
      if (eggRollCount === 1) {
        setRollMessage(
          <>
            <p>Rolls</p>
            <p>Left!</p>
          </>
        );
        setEggRollDisabled(true);
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (window.screen.width <= 768) {
      setClickMsg("Tap me!");
    }
  }, [window.screen.width]);

  // parallax scrolling
  const [offSet, setOffset] = useState(0);

  const handleScroll = () => setOffset(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className='eggWrapper'>
      <div
        className='parallaxBackgroundEgg'
        style={{ transform: `translateY(${offSet * -0.2}px)` }}
      ></div>
      <div className='eggOuter'>
        <div className='redTitle'>Hatch the Egg</div>

        <div className='eggInner'>
          <div className='eggCopy'>
            <div
              className='eggImgWrapper'
              onClick={isHatched === true ? disabled : hatch}
            >
              <div className='eggAniWrapper'>
                {isHatched === true ? (
                  loading ? (
                    <>
                      <PokeballAnimation />
                    </>
                  ) : (
                    <>
                      <img
                        src={
                          isHatched === true
                            ? egg.sprites.other["official-artwork"]
                                .front_default
                            : egg
                        }
                        className={
                          isHatched === true ? "eggStatic" : "eggAnimation"
                        }
                        style={hatchAni}
                      />
                      <h2
                        className='eggh2'
                        style={
                          isHatched === true ? { opacity: 1 } : { opacity: 0 }
                        }
                      >
                        {isHatched === true ? egg.name : "empty"}
                      </h2>
                    </>
                  )
                ) : (
                  <>
                    <img
                      src={
                        isHatched === true
                          ? egg.sprites.other["official-artwork"].front_default
                          : egg
                      }
                      className={
                        isHatched === true ? "eggStatic" : "eggAnimation"
                      }
                      style={hatchAni}
                    />
                    <h2
                      className='eggh2'
                      style={
                        isHatched === true ? { opacity: 1 } : { opacity: 0 }
                      }
                    >
                      {isHatched === true ? egg.name : "empty"}
                    </h2>
                  </>
                )}
              </div>
            </div>

            <div
              className='eggMsg'
              style={isHatched === true ? { opacity: 0 } : { opacity: 1 }}
            >
              {clickMsg}
            </div>

            <button
              className='add'
              onClick={() => addToParty(egg)}
              disabled={addEggDisabled}
            >
              Add to Party!
            </button>
            <div className='reRollWrapper'>
              <button
                className='reRoll'
                onClick={() => hatch()}
                disabled={eggRollDisabled}
              >
                ReRoll
              </button>
              <div className='rollsLeftWrapper'>
                <h1 className='rollCounth1'>{eggRollCount}</h1>
                <div className='rollsLeftText'>{rollMessage}</div>
              </div>
            </div>

            {/* end egg copy  */}
          </div>
        </div>
      </div>
    </div>
  );
}
