import React, { useEffect, useState } from "react";
import "./partyList.css";

export default function PartyList({ party, count, listEmptyMsg }) {
  console.log("party list :", party.slot1[1]);

  const [fadeIn, setFadeIn] = useState({
    opacity: 0,
    top: "20px",
  });

  useEffect(() => {
    setFadeIn({
      opacity: 1,
      top: "0px",
    });
  }, []);

  return (
    <div className='partyListWrapper' style={fadeIn}>
      <div className='partyListBox'>
        <div className='partyListHeader'>
          {/* ball and count  */}
          <div className='ballAndCount'>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1024px-Pok%C3%A9_Ball_icon.svg.png'
              className='pokeBallIcon'
            />
            <div className='countWrapper'>
              <h3>{count}</h3>
            </div>
          </div>
        </div>

        <div className='divide'></div>
        <div className='monList' id='monList'>
          {/*  */}
          <div
            className='listEmptyMsg'
            class='listEmptyMsg'
            style={listEmptyMsg}
          >
            List is empty!
          </div>
          {/*  */}
          <ol>
            {Object.values(party).map((mon) => {
              return (
                <li>
                  {/* <div
                    className='spriteWrapper'
                    style={{ backgroundImage: `url(${mon[1]})` }}></div> */}
                  <img src={mon[1]} className='sprite' />
                  <a
                    href={
                      "https://bulbapedia.bulbagarden.net/wiki/" +
                      mon[0] +
                      "_(Pokémon)"
                    }
                    target='_blank'
                  >
                    {mon[0]}
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
