import React, { useState, useEffect } from "react";
import PokeballAnimation from "../PokeballAnimation";
import "./bird.css";
import { getFlyingMonData, getType } from "../APIcalls";

export default function Bird({
  addToParty,
  rollMessage,
  setRollMessage,
  birdRollCount,
  setBirdRollCount,
  birdRollDisabled,
  setBirdRollDisabled,
  addBirdDisabled,
}) {
  const [flyingMon, setFlyingMon] = useState();
  const [loading, setLoading] = useState(true);

  //get flying data
  const getRandomFlyingData = async () => {
    setLoading(true);
    // get type from API
    const res = await getType(3);
    //gets random number based on length of array
    const randNum = Math.floor(Math.random() * res.pokemon.length);
    // apply info into a variable so it's nice and ready for the next step
    const url = res.pokemon[randNum].pokemon.url;
    // place the var to do next API call (specific pokemon), place in new var so its ready for setState
    const fetchedMon = await getFlyingMonData(url);
    // set to setState
    setFlyingMon(fetchedMon);
    // give it some loading time for loading animation
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  //keep this on to trigger the start
  useEffect(() => {
    getRandomFlyingData();
  }, []);

  //reroll
  const reRollButton = () => {
    setBirdRollCount(birdRollCount - 1);
    if (birdRollCount === 2) {
      setRollMessage(
        <>
          <p>Roll</p>
          <p>Left!</p>
        </>
      );
    }
    if (birdRollCount === 1) {
      setRollMessage(
        <>
          <p>Rolls</p>
          <p>Left!</p>
        </>
      );
      setBirdRollDisabled(true);
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
    <div className='birdWrapper sectionContainer'>
      <div
        className='parallaxBackgroundBird'
        style={{ transform: `translateY(${offSet * -0.2}px)` }}
      ></div>
      <div className='eggOuter'>
        <div className='redTitle'>Flying Type</div>
        <div className='eggInner'>
          <div className='eggCopy'>
            <div className='eggImgWrapper'>
              <div className='eggAniWrapper'>
                {loading ? (
                  <>
                    <PokeballAnimation />
                  </>
                ) : (
                  <>
                    <img
                      src={
                        flyingMon.sprites.other["official-artwork"]
                          .front_default
                      }
                      className='birdImg'
                    />
                    <h2 className='nameh2'>{flyingMon.name}</h2>
                  </>
                )}
              </div>
            </div>

            <button
              className='add'
              onClick={() => addToParty(flyingMon)}
              disabled={addBirdDisabled}
            >
              Add to Party!
            </button>
            <div className='reRollWrapper'>
              <button
                className='reRoll'
                onClick={() => getRandomFlyingData() && reRollButton()}
                disabled={birdRollDisabled}
              >
                ReRoll
              </button>
              <div className='rollsLeftWrapper'>
                <h1 className='rollCounth1'>{birdRollCount}</h1>
                <div className='rollsLeftText'>{rollMessage}</div>
              </div>
            </div>

            {/* end copy  */}
          </div>
        </div>
      </div>
    </div>
  );
}
