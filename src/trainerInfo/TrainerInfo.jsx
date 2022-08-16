import React, { useState, useEffect } from "react";
import "./trainerInfo.css";
import { trainerData } from "./trainerData";
import NicknameInput from "./NicknameInput";

export default function TrainerInfo({ party, listFull }) {
  // trainer info
  const [trainerName, setTrainerName] = useState();
  const [selectedTrainer, setSelectedTrainer] = useState();

  const selected = (obj) => {
    setSelectedTrainer(obj.gender);
  };

  //   party info
  const mappedParty = Object.values(party).map((obj) => obj[2]);

  const [nickNameParty, setNickNameParty] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  });

  console.log("nickname party", nickNameParty[2]);

  const [opacity, setOpacity] = useState(1);
  const [height, setHeight] = useState();
  const [appear, setAppear] = useState({
    height: "0px",
    opacity: 0,
    padding: "0px",
  });
  const [resultsShow, setResultsShow] = useState(false);

  // on Submit
  const submitTrainerInfo = () => {
    console.log("submit button clicked");
    setOpacity(0);
    setResultsShow(true);
    setTimeout(() => {
      setHeight("0px");
      setAppear({
        height: "0px",
        opacity: 0,
        padding: "20px",
      });
    }, 1000);
    setTimeout(() => {
      setAppear({
        height: "auto",
        opacity: 1,
        padding: "20px",
      });
    }, 1500);
  };

  // parallax scrolling
  const [offSet, setOffset] = useState(0);

  const handleScroll = () => setOffset(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className='trainerInfoWrapper sectionContainer'>
      <div
        className='parallaxBackgroundTrainer'
        style={{ transform: `translateY(${offSet * -0.2}px)` }}
      ></div>
      <div
        className={`trainerAndNicknameWrapper ${
          resultsShow === true
            ? "tanWrapperHeightResultsShow"
            : "tanWrapperHeight"
        }`}
      >
        <div
          className='infoWrapper'
          style={{ opacity: opacity, height: height }}
        >
          {/* trainer section  */}
          <div className='trainerSection'>
            <h2>Enter Your Name</h2>
            <form>
              <input
                type='text'
                className='trainerName'
                value={trainerName}
                onChange={(e) => setTrainerName(e.target.value)}
              />

              <h2>Choose Your Look</h2>
              <div className='trainerCharaWrapper'>
                {trainerData.map((obj, i) => {
                  return (
                    <div
                      key={`${obj.gender}-${i}`}
                      className={
                        selectedTrainer === obj.gender ? "selected" : "faded"
                      }
                      onClick={() => selected(obj)}
                    >
                      <input
                        type='radio'
                        value={obj.gender}
                        id={obj.gender}
                        name='genderSelect'
                      />
                      <label for={obj.gender}>
                        <img src={obj.img} className='charaImg' />
                      </label>
                    </div>
                  );
                })}
              </div>
            </form>
          </div>
          {/* Pokemon Section  */}
          <div className='pokemonSection'>
            <h2>Give a Nickname?</h2>
            {listFull === true
              ? Object.values(mappedParty).map((obj, i) => {
                  return (
                    <div key={`${obj.name}-${i}`}>
                      <NicknameInput
                        obj={obj}
                        index={i}
                        nickNameParty={nickNameParty}
                        setNickNameParty={setNickNameParty}
                      />
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        <div
          className={`submitWrapper ${
            trainerName === undefined || selectedTrainer === undefined
              ? "submitWrapperDisabled"
              : "submitWrapperEnabled"
          }`}
          style={{ opacity: opacity, height: height }}
        >
          <button
            className={`trainerSubmitButton ${
              trainerName === undefined || selectedTrainer === undefined
                ? "trainerSubmitButtonDisabled"
                : "trainerSubmitButtonEnabled"
            }`}
            onClick={() => submitTrainerInfo()}
            disabled={
              trainerName === undefined || selectedTrainer === undefined
                ? true
                : false
            }
          >
            Submit
          </button>
        </div>
        <div className='resultsAppear' style={appear}>
          <div className='resultsWrapper'>
            <div className='trainerNameAndPic'>
              <div>
                <h4>Trainer Name:</h4>
                <h1>{trainerName}</h1>
              </div>
              <div className='trainerResultsImg'>
                {selectedTrainer === undefined ? null : selectedTrainer ===
                  "female" ? (
                  <>
                    <img src={trainerData[1].img} />
                  </>
                ) : (
                  <>
                    <img src={trainerData[0].img} />
                  </>
                )}
              </div>
            </div>
            <div className='pokemonResultsWrapper'>
              <div className='monWrapper'>
                {listFull === true
                  ? mappedParty.map((obj, i) => {
                      return (
                        <div className='monCard'>
                          <div className='cardNameAndImg'>
                            <h2 className='resultsName'>{obj.name}</h2>
                            <div className='monBackground'>
                              <img src={obj.sprites.front_default} />
                            </div>
                          </div>
                          <div>
                            <div className='nicknameResult'>
                              {nickNameParty[i] === "" ? (
                                <>
                                  Nickname: <p>n/a</p>
                                </>
                              ) : (
                                <>
                                  Nickname: <h3>{nickNameParty[i]}</h3>
                                </>
                              )}
                            </div>
                            <div className='number'>
                              <span className='pound'># </span>
                              <h3>{obj.id}</h3>
                            </div>
                            <div className='type'>
                              Type:
                              <h3>
                                {obj.types[0].type.name}
                                {obj.types[1] === undefined
                                  ? null
                                  : `/ ${obj.types[1].type.name}`}
                              </h3>
                            </div>
                            <div className='bulbapedia'>
                              <a
                                href={
                                  "https://bulbapedia.bulbagarden.net/wiki/" +
                                  obj.name +
                                  "_(Pokémon)"
                                }
                                target='_blank'
                              >
                                See Bulbapedia
                              </a>
                            </div>
                          </div>
                          {/*  */}
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
