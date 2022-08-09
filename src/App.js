import { useState, useRef } from "react";
import { getMon, getType } from "./APIcalls";
import DownArrow from "./downArrow/DownArrow";
import Eevee2 from "./Eevee/Eevee2";
import Egg from "./egg/Egg";
import FairyOrDragon from "./fairyOrDragon/FairyOrDragon";
import Bird from "./flying/Bird";
import Header from "./header/Header";
import PartyList from "./PartyList/PartyList";
// import Test from "./Test";

function App() {
  const [randomType, setRandomType] = useState();
  const [randomMon, setRandomMon] = useState();

  //get type
  const getRandomType = async () => {
    const randomNum = Math.floor(Math.random() * 20);
    const res = await getType(randomNum);
    setRandomType(res);
  };

  //get mon
  const getRandomMon = async () => {
    const randNum = Math.floor(Math.random() * randomType.pokemon.length);
    const monData = randomType.pokemon[randNum];
    const fetch = await getMon(monData);
    setRandomMon(fetch);
    console.log("fetch", fetch);
  };

  // for down arrow button
  const [fadeIn, setFadeIn] = useState({
    opacity: 0,
    paddingTop: "20px",
    transitionDelay: "2s",
    transition: "all 1s ease-in-out",
  });

  const windowHeight = window.innerHeight;
  // for scrolling to next section
  const scrolling = () => {
    window.scrollBy({
      top: windowHeight,
      behavior: "smooth",
    });
    setFadeIn({
      opacity: 0,
      transitionDelay: "0s",
      height: "0px",
      padding: "0px",
    });
  };

  // set state for party list
  const [party, setParty] = useState({
    slot1: ["", ""],
    slot2: ["", ""],
    slot3: ["", ""],
    slot4: ["", ""],
    slot5: ["", ""],
    slot6: ["", ""],
  });

  const [listEmptyMsg, setListEmptyMsg] = useState();

  const [count, setCount] = useState(0);
  const [addStarterDisabled, setAddStarterDisabled] = useState(false);
  const [rollDisabled, setRollDisabled] = useState(false);
  const [rollCount, setRollCount] = useState(3);

  const [birdRollCount, setBirdRollCount] = useState(5);
  const [addBirdDisabled, setAddBirdDisabled] = useState(false);
  const [birdRollDisabled, setBirdRollDisabled] = useState(false);

  const [fodRollCount, setFodRollCount] = useState(5);
  const [addFodDisabled, setAddFodDisabled] = useState(false);
  const [fodRollDisabled, setFodRollDisabled] = useState(false);

  const [eeveeRollCount, setEeveeRollCount] = useState(2);
  const [addEeveeDisabled, setAddEeveeDisabled] = useState(false);
  const [eeveeRollDisabled, setEeveeRollDisabled] = useState(false);

  const [eggRollCount, setEggRollCount] = useState(3);
  const [addEggDisabled, setAddEggDisabled] = useState(true);
  const [eggRollDisabled, setEggRollDisabled] = useState(true);

  const [rollMessage, setRollMessage] = useState(
    <>
      <p>Rolls</p>
      <p>Left!</p>
    </>
  );

  // add pokemon to party list function
  const addToParty = (mon) => {
    if (party.slot1[0] === "" && party.slot1[1] === "" && count === 0) {
      setParty({
        ...party,
        slot1: [
          mon.name,
          mon.sprites.versions["generation-vii"].icons.front_default === null
            ? mon.sprites.versions["generation-viii"].icons.front_default
            : mon.sprites.versions["generation-vii"].icons.front_default,
        ],
      });
      setCount(count + 1);
      setAddStarterDisabled(true);
      setRollDisabled(true);
      setRollCount(0);
      setListEmptyMsg({
        overflow: "hidden",
        height: "0px",
      });
      // for arrow
      setFadeIn({
        opacity: 1,
        transitionDelay: "0s",
        height: "115px",
        padding: "10px",
      });
    } else if (party.slot2[0] === "" && party.slot2[1] === "") {
      setParty({
        ...party,
        slot2: [
          mon.name,
          mon.sprites.versions["generation-vii"].icons.front_default === null
            ? mon.sprites.versions["generation-viii"].icons.front_default
            : mon.sprites.versions["generation-vii"].icons.front_default,
        ],
      });
      setCount(count + 1);
      setBirdRollDisabled(true);
      setBirdRollCount(0);
      setAddBirdDisabled(true);
      // for arrow
      setFadeIn({
        opacity: 1,
        transitionDelay: "0s",
        height: "115px",
        padding: "10px",
      });
    } else if (party.slot3[0] === "" && party.slot3[1] === "") {
      setParty({
        ...party,
        slot3: [
          mon.name,
          mon.sprites.versions["generation-vii"].icons.front_default === null
            ? mon.sprites.versions["generation-viii"].icons.front_default
            : mon.sprites.versions["generation-vii"].icons.front_default,
        ],
      });
      setCount(count + 1);
      setFodRollDisabled(true);
      setFodRollCount(0);
      setAddFodDisabled(true);
      // for arrow
      setFadeIn({
        opacity: 1,
        transitionDelay: "0s",
        height: "115px",
        padding: "10px",
      });
    } else if (party.slot4[0] === "" && party.slot4[1] === "") {
      setParty({
        ...party,
        slot4: [
          mon.name,
          mon.sprites.versions["generation-vii"].icons.front_default === null
            ? mon.sprites.versions["generation-viii"].icons.front_default
            : mon.sprites.versions["generation-vii"].icons.front_default,
        ],
      });
      setCount(count + 1);
      setEeveeRollDisabled(true);
      setEeveeRollCount(0);
      setAddEeveeDisabled(true);
    } else if (party.slot5[0] === "" && party.slot5[1] === "") {
      setParty({
        ...party,
        slot5: [
          mon.name,
          mon.sprites.versions["generation-vii"].icons.front_default === null
            ? mon.sprites.versions["generation-viii"].icons.front_default
            : mon.sprites.versions["generation-vii"].icons.front_default,
        ],
      });
      setCount(count + 1);
      setEggRollDisabled(true);
      setEggRollCount(0);
      setAddEggDisabled(true);
    } else if (party.slot6[0] === "" && party.slot6[1] === "") {
      setParty({
        ...party,
        slot6: mon.name,
      });
      setCount(count + 1);
    }
  };

  console.log("party :", party);

  return (
    <div className='App'>
      <PartyList party={party} count={count} listEmptyMsg={listEmptyMsg} />
      <DownArrow scrolling={scrolling} fadeIn={fadeIn} setFadeIn={setFadeIn} />
      <Header
        addToParty={addToParty}
        addStarterDisabled={addStarterDisabled}
        rollDisabled={rollDisabled}
        setRollDisabled={setRollDisabled}
        rollMessage={rollMessage}
        setRollMessage={setRollMessage}
        rollCount={rollCount}
        setRollCount={setRollCount}
      />

      <Bird
        addToParty={addToParty}
        rollMessage={rollMessage}
        setRollMessage={setRollMessage}
        birdRollCount={birdRollCount}
        setBirdRollCount={setBirdRollCount}
        birdRollDisabled={birdRollDisabled}
        setBirdRollDisabled={setBirdRollDisabled}
        addBirdDisabled={addBirdDisabled}
      />
      <FairyOrDragon
        addToParty={addToParty}
        rollMessage={rollMessage}
        addFodDisabled={addFodDisabled}
        fodRollDisabled={fodRollDisabled}
        fodRollCount={fodRollCount}
        setFodRollCount={setFodRollCount}
        setRollMessage={setRollMessage}
        setFodRollDisabled={setFodRollDisabled}
      />

      <Eevee2
        addToParty={addToParty}
        rollMessage={rollMessage}
        setRollMessage={setRollMessage}
        addEeveeDisabled={addEeveeDisabled}
        eeveeRollDisabled={eeveeRollDisabled}
        setEeveeRollDisabled={setEeveeRollDisabled}
        eeveeRollCount={eeveeRollCount}
        setEeveeRollCount={setEeveeRollCount}
      />

      <Egg
        addToParty={addToParty}
        rollMessage={rollMessage}
        setRollMessage={setRollMessage}
        eggRollCount={eggRollCount}
        setEggRollCount={setEggRollCount}
        addEggDisabled={addEggDisabled}
        setAddEggDisabled={setAddEggDisabled}
        eggRollDisabled={eggRollDisabled}
        setEggRollDisabled={setEggRollDisabled}
      />
      {/* <Test
        getRandomMon={getRandomMon}
        getRandomType={getRandomType}
        randomType={randomType}
        randomMon={randomMon}
      /> */}
    </div>
  );
}

export default App;
