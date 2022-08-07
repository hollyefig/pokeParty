import React, { useEffect, useState } from "react";
import "./fairyOrDragon.css";
import { getItemData } from "../APIcalls";
import FairyComp from "./FairyComp";
import DragonComp from "./DragonComp";

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

  const [fadeIn, setFadeIn] = useState({
    opacity: 0,
  });
  const [fadeOut, setFadeOut] = useState({
    opacity: 1,
  });

  const [fairyFlexStyle, setFairyFlexStyle] = useState({
    flex: 1,
  });

  const [dragonFlexStyle, setDragonFlexStyle] = useState({
    flex: 1,
  });

  const [collapse, setCollapse] = useState({
    transition: "all .3s linear",
    transitionDelay: "1s",
  });

  const [fairyQuestionWrapper, setFairyQuestionWrapper] = useState();
  const [dragonQuestionWrapper, setDragonQuestionWrapper] = useState();

  const [fairyOuterWrapperChange, setFairyOuterWrapperChange] = useState();

  const [dragonOuterWrapperChange, setDragonOuterWrapperChange] = useState();

  //when fairy is clicked
  const toFairy = () => {
    setDragonFlexStyle({
      flex: 0,
    });

    setFairyFlexStyle({
      flex: 1,
      width: "100vw",
    });

    setFadeIn({
      opacity: 1,
      height: "auto",
      display: "block",
    });

    setFadeOut({
      opacity: 0,
      height: "0px",
      width: "0px",
      margin: "0px",
      padding: "0px",
    });

    if (window.innerWidth >= 0 && window.innerWidth <= 425) {
      setFairyOuterWrapperChange({
        height: "380px",
      });

      setFairyQuestionWrapper({
        width: "300px",
        height: "480px",
      });
    } else if (window.innerWidth >= 769 && window.innerWidth <= 426) {
      setFairyOuterWrapperChange({
        height: "430px",
      });
    } else if (window.innerWidth >= 768) {
      setFairyOuterWrapperChange({
        height: "430px",
      });
    }
  };

  //when dragon is clicked
  const toDragon = () => {
    setFairyFlexStyle({
      flex: 0,
    });

    setDragonFlexStyle({
      flex: 1,
      width: "100vw",
    });

    setFadeIn({
      opacity: 1,
      height: "auto",
      display: "block",
    });

    setFadeOut({
      opacity: 0,
      height: "0px",
      width: "0px",
      margin: "0px",
      padding: "0px",
    });

    if (window.innerWidth >= 0 && window.innerWidth <= 425) {
      setDragonOuterWrapperChange({
        height: "380px",
      });

      setDragonQuestionWrapper({
        width: "300px",
        height: "480px",
      });
    } else if (window.innerWidth >= 769 && window.innerWidth <= 426) {
      setDragonOuterWrapperChange({
        height: "430px",
      });
    } else if (window.innerWidth >= 768) {
      setDragonOuterWrapperChange({
        height: "430px",
      });
    }
  };

  return (
    <div className='fodWrapper'>
      {/* begin fairy section  */}
      <div className='fairyWrapper' style={fairyFlexStyle}>
        <div
          className='fairyQuestionWrapper pkmDisplay'
          style={fairyQuestionWrapper}
        >
          <h3 style={fadeIn} className='fadeIn'>
            Who is Your
          </h3>
          <h1 className='cardTitleDouble'>Fairy?</h1>

          {/* hidden wrapper */}
          <div
            className='fairyOuterHiddenWrapper'
            style={fairyOuterWrapperChange}
          >
            <button
              onClick={toFairy}
              className='fairyButton fadeOut'
              style={fadeOut}
            >
              <img
                src={dreamBall}
                className='ball dreamball'
                style={collapse}
              />
            </button>
            {/* place in component */}
            <div className='fadeIn' style={fadeIn}>
              <FairyComp
                addToParty={addToParty}
                rollMessage={rollMessage}
                addFodDisabled={addFodDisabled}
                fodRollDisabled={fodRollDisabled}
                fodRollCount={fodRollCount}
                setFodRollCount={setFodRollCount}
                setRollMessage={setRollMessage}
                setFodRollDisabled={setFodRollDisabled}
              />
            </div>
          </div>
        </div>
      </div>

      {/* begin dragon section  */}
      <div className='dragonWrapper' style={dragonFlexStyle}>
        <div
          className='dragonQuestionWrapper pkmDisplay'
          style={dragonQuestionWrapper}
        >
          <h3 style={fadeIn} className='fadeIn'>
            Who is Your
          </h3>
          <h1 className='cardTitleDouble'>Dragon?</h1>
          {/* hidden wrapper */}
          <div
            className='dragonOuterHiddenWrapper'
            style={dragonOuterWrapperChange}
          >
            <button
              onClick={toDragon}
              className='dragonButton fadeOut'
              style={fadeOut}
            >
              <img
                src={heavyBall}
                className='ball heavyball'
                style={collapse}
              />
            </button>
            {/* place in component  */}
            <div className='fadeIn' style={fadeIn}>
              <DragonComp
                addToParty={addToParty}
                rollMessage={rollMessage}
                addFodDisabled={addFodDisabled}
                fodRollDisabled={fodRollDisabled}
                fodRollCount={fodRollCount}
                setFodRollCount={setFodRollCount}
                setRollMessage={setRollMessage}
                setFodRollDisabled={setFodRollDisabled}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
