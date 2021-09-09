import { useState, useEffect, useCallback } from "react";
import getImg from "./bg";
import "./index.css";

export default function () {
  const [cards, setCards] = useState({ top: [], left: [], right: [] });
  const [visible, setVisible] = useState(false);
  const toggleModal = () => setVisible(!visible);
  const generatePokers = useCallback(pokers => {
    var index = 0,
      tops = [],
      lefts = [];
    for (var i = 0, poker; i < 7; i++) {
      for (var j = 0; j < i + 1; j++) {
        poker = pokers[index];
        index += 1;
        let style = {
          top: i * 40,
          left: j * 130 + (6 - i) * 65 + 50,
          opacity: 1,
        };
        tops.push({ ...poker, style, className: ["pai"] });
      }
    }
    var index1 = 0;
    for (; index < pokers.length; index++) {
      poker = pokers[index];
      index1 += 1;
      let style = {
        top: 430,
        left: 190,
        opacity: 1,
      };
      lefts.push({ ...poker, style, className: ["pai", "left"] });
    }
    setCards({top: tops, left: lefts, right: []})
  }, []);
  const startFunc = useCallback(() => {
    generatePokers(generateList())
  }, []);
  useEffect(() => {
    startFunc()
  }, []);
  return (
    <div>
      <div className="screen bg-gray-300">
        {/* {cards.top.map(card => <Card key={`${card.number}_${card.color}`} {...card} />)} */}
        {/* {cards.left.map(card => <Card key={`${card.number}_${card.color}`} {...card} />)} */}
        <div className="moveright">MOVE</div>
        <div className="moveleft">BACK</div>
      </div>
      <div className="restart" onClick={startFunc}>重新开始</div>
      <div className="start text-purple-800" onClick={startFunc}>开始</div>
      <div className="game text-purple-800" onClick={toggleModal}>游戏介绍</div>
      <div className={visible ? "block mask" : "hidden"}>
        <div className="mask-inner">
          <h1 className="text-6xl">游戏介绍</h1>
          <p>
            &nbsp;&nbsp;此游戏是一种两张牌相加得13可以消除的纸牌游戏，若上方纸牌没有可以相互消除的牌，可以移动下面的纸牌来与上方纸牌相加。下方纸牌可以移动3次，3次过后没有消除完则不可再次移动。下方纸牌必须全部移动完后，方可移回。
          </p>
          <div className="close" onClick={toggleModal}></div>
        </div>
      </div>
      <div className="over">游戏结束</div>
    </div>
  );
}

function generateList() {
  var colors = ["h", "s", "d", "c"];
  var map = {};
  var pokers = [];
  while (pokers.length != 52) {
    var index = Math.floor(Math.random() * 4);
    var n = Math.ceil(Math.random() * 13);
    var c = colors[index];
    var poker = {
      color: c,
      number: n,
    };
    if (!map[c + n]) {
      pokers.push(poker);
      map[c + n] = true;
    }
  }
  return pokers;
}
const map = {
  1: "A",
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: "T",
  11: "J",
  12: "Q",
  13: "K",
};
function Card({ number, color, style, className }) {
  const key = `${map[number]}${color}`;
  return <div className={className.join(" ")} style={{ ...style, background: `url(${getImg(key)}) no-repeat center center / cover` }}></div>;
}
