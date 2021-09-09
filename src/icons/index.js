import game from "./icons/game";

const map = new Map();
map.set("game", game)

export default function icon ({type}) {
  return map.get(type)();
}