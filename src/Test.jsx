import React from "react";

export default function Test({
  getRandomMon,
  getRandomType,
  randomType,
  randomMon,
}) {
  return (
    <div>
      <button onClick={() => getRandomType()}>get random type</button>
      {randomType !== undefined && (
        <button onClick={() => getRandomMon()}>get random mon</button>
      )}
      {randomMon !== undefined && <div>{randomMon.name}</div>}

      <div></div>
    </div>
  );
}
