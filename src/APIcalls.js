import axios from "axios";

export const getType = async (type) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
  return res.data;
};

export const getMon = async (mon) => {
  const res = await axios.get(mon.pokemon.url);
  return res.data;
};

export const getFlyingMonData = async (fly) => {
  const res = await axios.get(fly);
  return res.data;
};

export const getGrassMonData = async (grass) => {
  const res = await axios.get(grass);
  return res.data;
};

export const getFireMonData = async (fire) => {
  const res = await axios.get(fire);
  return res.data;
};

export const getWaterMonData = async (water) => {
  const res = await axios.get(water);
  return res.data;
};

export const getItemData = async (pokeball) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/item/${pokeball}`);
  return res.data;
};

export const getFairyMonData = async (fairy) => {
  const res = await axios.get(fairy);
  return res.data;
};

export const getDragonMonData = async (dragon) => {
  const res = await axios.get(dragon);
  return res.data;
};

export const getEevee = async () => {
  const res = await axios.get("https://pokeapi.co/api/v2/pokemon/eevee");
  return res.data;
};

export const getEeveeData = async (eevee) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${eevee}`);
  return res.data;
};
