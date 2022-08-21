import React from "react";

export default function Msg({ clearMsg }) {
  return (
    <div className='msgWrapper'>
      <div className='overlay'></div>
      <div className='msg'>
        Choose your starter, but choose wisely! Your rerolls between the 3 are
        shared.
        <button className='okay' onClick={() => clearMsg()}>
          <h3>Okay!</h3>
        </button>
      </div>
    </div>
  );
}
