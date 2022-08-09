import React, { useEffect, useState } from "react";
import "./pokemonSelection.css";
import {
  getFireMonData,
  getGrassMonData,
  getWaterMonData,
  getType,
} from "../APIcalls";
import PokeballAnimation from "../PokeballAnimation";

export default function PokemonSelection({
  addToParty,
  addStarterDisabled,
  rollDisabled,
  setRollDisabled,
  rollMessage,
  setRollMessage,
  rollCount,
  setRollCount,
}) {
  useEffect(() => {
    getGrassTypeData();
    getFireTypeData();
    getWaterTypeData();
  }, []);

  const [loading, setLoading] = useState(true);
  const [grassTypeMon, setGrassTypeMon] = useState();
  const [fireTypeMon, setFireTypeMon] = useState();
  const [waterTypeMon, setWaterTypeMon] = useState();

  const getGrassTypeData = async () => {
    setLoading(true);
    //get array of grass type data
    const res = await getType(12);
    //get array of only grass pokemon
    const obj = res.pokemon;
    //filter for starters
    const filteredObj = obj.filter(
      (obj) =>
        obj.pokemon.name === "bulbasaur" ||
        obj.pokemon.name === "chikorita" ||
        obj.pokemon.name === "treecko" ||
        obj.pokemon.name === "turtwig" ||
        obj.pokemon.name === "snivy" ||
        obj.pokemon.name === "chespin" ||
        obj.pokemon.name === "rowlet" ||
        obj.pokemon.name === "grookey"
    );
    const randNum = Math.floor(Math.random() * filteredObj.length);
    const url = filteredObj[randNum].pokemon.url;
    const fetchedMon = await getGrassMonData(url);
    setGrassTypeMon(fetchedMon);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const getFireTypeData = async () => {
    setLoading(true);
    const res = await getType(10);
    const obj = res.pokemon;
    const filteredObj = obj.filter(
      (obj) =>
        obj.pokemon.name === "charmander" ||
        obj.pokemon.name === "cyndaquil" ||
        obj.pokemon.name === "torchic" ||
        obj.pokemon.name === "chimchar" ||
        obj.pokemon.name === "tepig" ||
        obj.pokemon.name === "fennekin" ||
        obj.pokemon.name === "litten" ||
        obj.pokemon.name === "scorbunny"
    );
    const randNum = Math.floor(Math.random() * filteredObj.length);
    const url = filteredObj[randNum].pokemon.url;
    const fetchedMon = await getFireMonData(url);
    setFireTypeMon(fetchedMon);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const getWaterTypeData = async () => {
    setLoading(true);
    const res = await getType(11);
    const obj = res.pokemon;
    const filteredObj = obj.filter(
      (obj) =>
        obj.pokemon.name === "squirtle" ||
        obj.pokemon.name === "totodile" ||
        obj.pokemon.name === "mudkip" ||
        obj.pokemon.name === "piplup" ||
        obj.pokemon.name === "oshawott" ||
        obj.pokemon.name === "froakie" ||
        obj.pokemon.name === "popplio" ||
        obj.pokemon.name === "sobble"
    );
    const randNum = Math.floor(Math.random() * filteredObj.length);
    const url = filteredObj[randNum].pokemon.url;
    const fetchedMon = await getWaterMonData(url);
    setWaterTypeMon(fetchedMon);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const refresh = (monState) => {
    if (
      monState === "grassState" ||
      monState === "fireState" ||
      monState === "waterState"
    ) {
      setRollCount((prev) => prev - 1);
      if (rollCount === 1) {
        setRollDisabled(true);
        setRollMessage(
          <>
            <p>Rolls</p>
            <p>Left!</p>
          </>
        );
      }
    }
    if (rollCount === 2) {
      setRollMessage(
        <>
          <p>Roll</p>
          <p>Left!</p>
        </>
      );
    }
    if (monState === "grassState") {
      console.log(`grass roll has been clicked`);
    }
    if (monState === "fireState") {
      console.log(`fire roll has been clicked`);
    }
    if (monState === "waterState") {
      console.log(`Water roll has been clicked`);
    }
  };

  return (
    <div className='wrapper'>
      <div className='grassWrapper'>
        <div className='cardWrapper pkmDisplay'>
          <div className='cardMobileFlex'>
            <div className='cardTextButtonMobile'>
              <h3>Who is your</h3>
              <h1 className='cardTitle'>Grass Starter?</h1>
              {/* end card text button mobile  */}
              {/* start mobile show  */}
              <div className='mobileShow'>
                <button
                  className='add'
                  onClick={() => addToParty(grassTypeMon)}
                  disabled={addStarterDisabled}
                >
                  Add to Party!
                </button>

                <div className='reRollWrapper'>
                  <button
                    className='reRoll'
                    value='grassState'
                    disabled={rollDisabled}
                    onClick={() => getGrassTypeData() && refresh("grassState")}
                  >
                    ReRoll
                  </button>
                  <div className='rollsLeftWrapper'>
                    <h1 className='rollCounth1'>{rollCount}</h1>
                    <div className='rollsLeftText'>{rollMessage}</div>
                  </div>
                </div>
                {/* end mobile show  */}
              </div>
            </div>

            <div className='cardImgWrapper'>
              {loading ? (
                <>
                  <PokeballAnimation />
                  <h2>&nbsp;</h2>
                </>
              ) : (
                <>
                  <img
                    src={
                      grassTypeMon.sprites.other["official-artwork"]
                        .front_default
                    }
                    className='monImg'
                  />
                  <h2>{grassTypeMon.name}</h2>
                </>
              )}
            </div>

            {/* end mobile flex  */}
          </div>
          {/* start mobile hide  */}
          <div className='buttonWrapper'>
            <button
              className='add'
              onClick={() => addToParty(grassTypeMon)}
              disabled={addStarterDisabled}
            >
              Add to Party!
            </button>

            <div className='reRollWrapper'>
              <button
                className='reRoll'
                value='grassState'
                disabled={rollDisabled}
                onClick={() => getGrassTypeData() && refresh("grassState")}
              >
                ReRoll
              </button>
              <div className='rollsLeftWrapper'>
                <h1 className='rollCounth1'>{rollCount}</h1>
                <div className='rollsLeftText'>{rollMessage}</div>
              </div>
            </div>
            {/* end mobile hide  */}
          </div>
        </div>
        {/*  */}
      </div>

      {/* fire starter  */}
      {/* */}
      {/*  */}
      <div className='fireWrapper'>
        <div className='cardWrapper pkmDisplay'>
          <div className='cardMobileFlex'>
            <div className='cardTextButtonMobile'>
              <h3>Who is your</h3>
              <h1 className='cardTitle'>Fire Starter?</h1>
              {/* end card text button mobile  */}
              {/* mobile show  */}
              <div className='mobileShow'>
                <button
                  className='add'
                  onClick={() => addToParty(fireTypeMon)}
                  disabled={addStarterDisabled}
                >
                  Add to Party!
                </button>

                <div className='reRollWrapper'>
                  <button
                    className='reRoll'
                    value='fireState'
                    disabled={rollDisabled}
                    onClick={() => getFireTypeData() && refresh("fireState")}
                  >
                    ReRoll
                  </button>
                  <div className='rollsLeftWrapper'>
                    <h1 className='rollCounth1'>{rollCount}</h1>
                    <div className='rollsLeftText'>{rollMessage}</div>
                  </div>
                </div>
                {/* end mobile show  */}
              </div>
            </div>

            <div className='cardImgWrapper'>
              {loading ? (
                <>
                  <PokeballAnimation />
                  <h2>&nbsp;</h2>
                </>
              ) : (
                <>
                  <img
                    src={
                      fireTypeMon.sprites.other["official-artwork"]
                        .front_default
                    }
                    className='monImg'
                  />
                  <h2>{fireTypeMon.name}</h2>
                </>
              )}
            </div>
            {/* end mobile flex */}
          </div>

          {/* mobile hide  */}
          <div className='buttonWrapper'>
            <button
              className='add'
              onClick={() => addToParty(fireTypeMon)}
              disabled={addStarterDisabled}
            >
              Add to Party!
            </button>

            <div className='reRollWrapper'>
              <button
                className='reRoll'
                value='fireState'
                disabled={rollDisabled}
                onClick={() => getFireTypeData() && refresh("fireState")}
              >
                ReRoll
              </button>
              <div className='rollsLeftWrapper'>
                <h1 className='rollCounth1'>{rollCount}</h1>
                <div className='rollsLeftText'>{rollMessage}</div>
              </div>
            </div>
            {/* end mobile hide  */}
          </div>
        </div>
      </div>

      {/* water starter */}
      {/*  */}
      {/*  */}
      <div className='waterWrapper'>
        <div className='cardWrapper pkmDisplay'>
          <div className='cardMobileFlex'>
            <div className='cardTextButtonMobile'>
              <h3>Who is your</h3>
              <h1 className='cardTitle'>Water Starter?</h1>
              {/* end card text button mobile  */}
              {/* mobile show  */}
              <div className='mobileShow'>
                <button
                  className='add'
                  onClick={() => addToParty(waterTypeMon)}
                  disabled={addStarterDisabled}
                >
                  Add to Party!
                </button>

                <div className='reRollWrapper'>
                  <button
                    className='reRoll'
                    value='waterState'
                    disabled={rollDisabled}
                    onClick={() => getWaterTypeData() && refresh("waterState")}
                  >
                    ReRoll
                  </button>
                  <div className='rollsLeftWrapper'>
                    <h1 className='rollCounth1'>{rollCount}</h1>
                    <div className='rollsLeftText'>{rollMessage}</div>
                  </div>
                </div>
                {/* end mobile show  */}
              </div>
            </div>

            <div className='cardImgWrapper'>
              {loading ? (
                <>
                  <PokeballAnimation />
                  <h2>&nbsp;</h2>
                </>
              ) : (
                <>
                  <img
                    src={
                      waterTypeMon.sprites.other["official-artwork"]
                        .front_default
                    }
                    className='monImg'
                  />
                  <h2>{waterTypeMon.name}</h2>
                </>
              )}
            </div>
            {/* end mobile flex  */}
          </div>

          {/* mobile hide  */}
          <div className='buttonWrapper'>
            <button
              className='add'
              onClick={() => addToParty(waterTypeMon)}
              disabled={addStarterDisabled}
            >
              Add to Party!
            </button>

            <div className='reRollWrapper'>
              <button
                className='reRoll'
                value='waterState'
                disabled={rollDisabled}
                onClick={() => getWaterTypeData() && refresh("waterState")}
              >
                ReRoll
              </button>
              <div className='rollsLeftWrapper'>
                <h1 className='rollCounth1'>{rollCount}</h1>
                <div className='rollsLeftText'>{rollMessage}</div>
              </div>
            </div>
            {/* end mobile hide  */}
          </div>
        </div>
      </div>
    </div>
  );
}
