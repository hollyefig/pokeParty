import React, { useEffect, useState } from "react";
import "./fairyOrDragon.css";
import {
  getItemData,
  getFairyMonData,
  getType,
  getDragonMonData,
} from "../APIcalls";
import PokeballAnimation from "../PokeballAnimation";

export default function FairyOrDragon({
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
    funcItemData();
    getFairyMon();
    getDragonMon();
  }, []);
  // grab data
  const [dreamBall, setDreamBall] = useState();
  const [heavyBall, setHeavyBall] = useState();

  const funcItemData = async () => {
    const res = await getItemData("dream-ball");
    const img = res.sprites.default;
    setDreamBall(img);
    const res2 = await getItemData("heavy-ball");
    const img2 = res2.sprites.default;
    setHeavyBall(img2);
  };

  // end data
  // begin styling

  const [fadeIn, setFadeIn] = useState({});
  const [fadeOut, setFadeOut] = useState({
    opacity: 1,
  });
  const [fairyFlexStyle, setFairyFlexStyle] = useState({
    flex: 1,
  });
  const [isFairyOpen, setIsFairyOpen] = useState(false);
  const [isDragonOpen, setIsDragonOpen] = useState(false);
  const [heightChange, setHeightChange] = useState({});

  const [dragonFlexStyle, setDragonFlexStyle] = useState({
    flex: 1,
  });

  //fairy data
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
  const reRollButtonFairy = () => {
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

  //dragon data
  const [dragonMon, setDragonMon] = useState();

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
  const reRollButtonDragon = () => {
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

  //when fairy is clicked
  const toFairy = () => {
    setTimeout(() => {
      setHeightChange({
        height: "550px",
      });
      setFadeOut({
        opacity: 0,
      });
    }, 1000);

    setTimeout(() => {
      setIsFairyOpen(true);
      setFadeIn({
        opacity: 1,
      });
    }, 2000);

    setDragonFlexStyle({
      flex: 0,
    });

    setFairyFlexStyle({
      flex: 1,
      width: "100vw",
    });
  };

  //when dragon is clicked
  const toDragon = () => {
    setTimeout(() => {
      setHeightChange({
        height: "550px",
      });
      setFadeOut({
        opacity: 0,
      });
    }, 1000);

    setTimeout(() => {
      setIsDragonOpen(true);
      setFadeIn({
        opacity: 1,
      });
    }, 2000);

    setFairyFlexStyle({
      flex: 0,
    });

    setDragonFlexStyle({
      flex: 1,
      width: "100vw",
    });
  };

  return (
    <div className='fodWrapper sectionContainer'>
      {/* begin fairy section  */}
      <div className='fairyWrapper' style={fairyFlexStyle}>
        <div>
          <div
            className={
              isFairyOpen === true ? "eggOuterDoubleOpen" : "eggOuterDouble"
            }
            style={heightChange}
          >
            <div className='redTitleDouble'>Fairy</div>
            <div
              className={
                isFairyOpen === true ? "eggInnerDoubleOpen" : "eggInnerDouble"
              }
            >
              <div className='eggCopyDouble'>
                <div className='eggImgWrapperDouble'>
                  <div className='eggAniWrapperDouble' onClick={toFairy}>
                    {isFairyOpen === true ? (
                      loading ? (
                        <>
                          <PokeballAnimation />
                        </>
                      ) : (
                        <>
                          <img
                            src={
                              fairyMon.sprites.other["official-artwork"]
                                .front_default
                            }
                            className='eeveeImg'
                          />
                        </>
                      )
                    ) : (
                      <img
                        src={dreamBall}
                        className='ball dreamball'
                        style={fadeOut}
                      />
                    )}
                  </div>
                </div>

                {isFairyOpen === true ? (
                  <div className='buttonsWrapperDouble' style={fadeIn}>
                    {loading === true ? (
                      <h2 className='nameh2' style={{ visibility: "hidden" }}>
                        {fairyMon.name}
                      </h2>
                    ) : (
                      <h2 className='nameh2'>{fairyMon.name}</h2>
                    )}

                    <button
                      className='add'
                      onClick={() => addToParty(fairyMon)}
                      disabled={addFodDisabled}
                      style={fadeIn}
                    >
                      Add to Party!
                    </button>
                    <div className='reRollWrapper'>
                      <button
                        className='reRoll'
                        onClick={() => getFairyMon() && reRollButtonFairy()}
                        disabled={fodRollDisabled}
                      >
                        ReRoll
                      </button>
                      <div className='rollsLeftWrapper'>
                        <h1 className='rollCounth1'>{fodRollCount}</h1>
                        <div className='rollsLeftText'>{rollMessage}</div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* end copy  */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* begin dragon section  */}
      <div className='dragonWrapper' style={dragonFlexStyle}>
        <div>
          <div
            className={
              isDragonOpen === true ? "eggOuterDoubleOpen" : "eggOuterDouble"
            }
            style={heightChange}
          >
            <div className='redTitleDouble'>Dragon</div>
            <div
              className={
                isDragonOpen === true ? "eggInnerDoubleOpen" : "eggInnerDouble"
              }
            >
              <div className='eggCopyDouble'>
                <div className='eggImgWrapperDouble'>
                  <div className='eggAniWrapperDouble' onClick={toDragon}>
                    {isDragonOpen === true ? (
                      loading ? (
                        <>
                          <PokeballAnimation />
                        </>
                      ) : (
                        <>
                          <img
                            src={
                              dragonMon.sprites.other["official-artwork"]
                                .front_default
                            }
                            className='eeveeImg'
                          />
                        </>
                      )
                    ) : (
                      <img
                        src={heavyBall}
                        className='ball heavyball'
                        style={fadeOut}
                      />
                    )}
                  </div>
                </div>

                {isDragonOpen === true ? (
                  <div className='buttonsWrapperDouble' style={fadeIn}>
                    {loading === true ? (
                      <h2 className='nameh2' style={{ visibility: "hidden" }}>
                        {dragonMon.name}
                      </h2>
                    ) : (
                      <h2 className='nameh2'>{dragonMon.name}</h2>
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
                        onClick={() => getDragonMon() && reRollButtonDragon()}
                        disabled={fodRollDisabled}
                      >
                        ReRoll
                      </button>
                      <div className='rollsLeftWrapper'>
                        <h1 className='rollCounth1'>{fodRollCount}</h1>
                        <div className='rollsLeftText'>{rollMessage}</div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* end copy  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
