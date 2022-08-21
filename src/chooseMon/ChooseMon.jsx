import React, { useEffect, useState } from "react";
import "./chooseMon.css";
import { typeData } from "./typeData";
import { getMon, getType } from "../APIcalls";
import PokeballAnimation from "../PokeballAnimation";

export default function ChooseMon({
  addToParty,
  rollMessage,
  setRollMessage,
  chooseRollCount,
  setChooseRollCount,
  addChooseDisabled,
  chooseRollDisabled,
  setChooseRollDisabled,
}) {
  const [selectedType, setSelectedType] = useState();
  const [typeColor, setTypeColor] = useState();

  const [typeResult, setTypeResult] = useState([]);
  const [loading, setLoading] = useState(false);

  // selected mon gather number / name
  const selected = async (obj) => {
    setSelectedType(obj.type);
    setTypeColor(obj.color);

    const res = await getType(obj.typeNum);
    setTypeResult(res);
  };

  // for input text
  const [letterValue, setLetterValue] = useState();

  const [arrayNum, setArrayNum] = useState([]);
  const [randomMon, setRandomMon] = useState();
  const [monImg, setMonImg] = useState();
  const [pokeShow, setPokeShow] = useState(false);
  const [noMon, setNoMon] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    setPokeShow(true);
    e.preventDefault();
    //filter selected type by letter value
    const filtered = typeResult.pokemon.filter(
      (mon) =>
        mon.pokemon.name[0] === letterValue.toLowerCase() &&
        !mon.pokemon.name.split("").includes("-")
    );
    setArrayNum(filtered);
    if (filtered.length === 0) {
      setNoMon(true);
    } else {
      setNoMon(false);
    }

    const randNum = Math.floor(Math.random() * filtered.length);
    const url = await getMon(filtered[randNum]);
    // console.log("url", url.name);
    setRandomMon(url);
    setMonImg(url.sprites.other["official-artwork"].front_default);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  //   reroll
  const reRollButton = () => {
    setChooseRollCount(chooseRollCount - 1);
    if (chooseRollCount === 2) {
      setRollMessage(
        <>
          <p>Roll</p>
          <p>Left!</p>
        </>
      );
    }
    if (chooseRollCount === 1) {
      setRollMessage(
        <>
          <p>Rolls</p>
          <p>Left!</p>
        </>
      );
      setChooseRollDisabled(true);
    }
  };

  // parallax scrolling
  const [offSet, setOffset] = useState(0);

  const handleScroll = () => setOffset(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // tutorial message
  const [msgDisplay, setMsgDisplay] = useState(true);

  const chooseMonMsgFunc = () => {
    setMsgDisplay(false);
  };

  return (
    <div className='chooseMonWrapper sectionContainer'>
      {/* tutorial message  */}
      {msgDisplay && (
        <div className='chooseMonMsgWrapper'>
          <div className='chooseMonMsg'>
            Here's your chance to get a Pokemon of your choice! Select your
            desired <span style={{ fontWeight: "bold" }}>Type</span> and type in
            the <span style={{ fontWeight: "bold" }}>First Letter</span> of your
            desired Pokemon's name!
            <button
              className='chooseMonMsgButton'
              onClick={() => chooseMonMsgFunc()}
            >
              <h3>Let's go!</h3>
            </button>
          </div>
        </div>
      )}

      {/* parallax BG  */}
      <div
        className='parallaxBackgroundChoose'
        style={{ transform: `translateY(${offSet * -0.2}px)` }}
      ></div>

      <div className='eggOuterChoose'>
        <div className='redTitle'>Choose!</div>
        <div className='eggInnerChoose'>
          <div className='form'>
            <form>
              <div className='instruction'>Select a Type</div>
              <div className='radioWrapper'>
                {typeData.map((obj) => {
                  return (
                    <div
                      className={`radioButton ${
                        selectedType === obj.type && "selected"
                      }`}
                      value={obj.type}
                      onClick={() => selected(obj)}
                    >
                      <input
                        type='radio'
                        value={obj.type}
                        id={obj.type}
                        name='typeList'
                      />
                      <label
                        for={obj.type}
                        style={{
                          background: obj.color,
                        }}
                      >
                        {obj.type}
                      </label>
                    </div>
                  );
                })}
              </div>

              <div className='instruction'>Type a Letter</div>
              <div className='textWrapper'>
                <input
                  type='text'
                  placeholder='Type a letter!'
                  className='letter'
                  maxlength='1'
                  value={letterValue}
                  onChange={(e) => setLetterValue(e.target.value)}
                />
              </div>

              {/* submit button  */}
              {noMon === false ? (
                <button
                  class='submit'
                  onClick={(e) => handleSubmit(e)}
                  disabled={
                    letterValue === undefined ||
                    selectedType === undefined ||
                    pokeShow === true
                      ? true
                      : false
                  }
                >
                  Submit
                </button>
              ) : (
                <button class='submit' onClick={(e) => handleSubmit(e)}>
                  Submit
                </button>
              )}
            </form>
          </div>

          {/* pokemon display  */}
          {/* */}
          {/*  */}
          <div className='monDisplay'>
            {loading === true && noMon === false ? (
              <PokeballAnimation />
            ) : (
              <>
                {pokeShow === true ? (
                  <>
                    <div className='results'>
                      {loading === true ? (
                        <span style={{ color: "white" }}>
                          <span className='bold'>{arrayNum.length}</span> &nbsp;
                          Results
                        </span>
                      ) : (
                        <>
                          <span className='bold'>{arrayNum.length}</span> &nbsp;
                          <span style={{ color: typeColor }}>Results</span>
                        </>
                      )}
                    </div>
                    {arrayNum.length === 0 ? (
                      <div className='errorMsg'>
                        <h3>No Results!</h3>
                        <p>
                          There are no Pokemon of that type that start with that
                          letter
                        </p>
                      </div>
                    ) : (
                      <>
                        {loading === true && pokeShow === true ? (
                          <PokeballAnimation />
                        ) : (
                          <>
                            <img src={monImg} className='monDisplayImg' />
                          </>
                        )}
                        {loading === true ? (
                          <h2 className='nameh2' style={{ color: "white" }}>
                            {randomMon.name}
                          </h2>
                        ) : (
                          <h2 className='nameh2'>{randomMon.name}</h2>
                        )}
                      </>
                    )}
                  </>
                ) : null}
                {/* end pokeshow */}
              </>
            )}
            {/* end mon display  */}

            {/* begin button wrapper  */}
            {pokeShow === true && noMon === false ? (
              <div className='buttonsWrapperChoose'>
                <button
                  className='add'
                  onClick={() => addToParty(randomMon)}
                  disabled={addChooseDisabled}
                >
                  Add to Party!
                </button>
                <div className='reRollWrapper'>
                  <button
                    className='reRoll'
                    onClick={(e) => handleSubmit(e) && reRollButton()}
                    disabled={chooseRollDisabled}
                  >
                    ReRoll
                  </button>
                  <div className='rollsLeftWrapper'>
                    <h1 className='rollCounth1'>{chooseRollCount}</h1>
                    <div className='rollsLeftText'>{rollMessage}</div>
                  </div>
                </div>
              </div>
            ) : null}
            {/* end button wrapper  */}
          </div>
        </div>
      </div>
    </div>
  );
}
