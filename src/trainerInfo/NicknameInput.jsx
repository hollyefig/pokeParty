import React, { useState } from "react";

export default function NicknameInput({
  obj,
  index,
  nickNameParty,
  setNickNameParty,
}) {
  const [nickname, setNickname] = useState("");

  const updateNickNames = (newNickName, i) => {
    setNickname(newNickName);
    let update = {};
    update[i] = newNickName;
    setNickNameParty({
      ...nickNameParty,
      ...update,
    });
  };

  return (
    <div className='pokemonInfoWrapper'>
      <div className='pokemonLeft'>
        <img src={obj.sprites.front_default} className='spriteList' />
      </div>
      <div className='pokemonRight'>
        <input
          type='text'
          value={nickname}
          onChange={(e) => updateNickNames(e.target.value, index)}
        />
      </div>
      {/* end info wrapper  */}
    </div>
  );
}
