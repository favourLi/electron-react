import { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import getImg from "./bg";
import lib from "../../util/lib";
import "./index.css";

function isSame(oldCard, newCard) {
  return oldCard.number === newCard.number && oldCard.color === newCard.color;
}

export default function () {
  const [cards, setCards] = useState({ top: [], left: [], right: [] });
  const [activePokers, setActivePokers] = useState([]);
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
        tops.push({ ...poker, style, className: ["pai"], pos: `${i}_${j}` });
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
    setCards({ top: tops, left: lefts, right: [] });
  }, []);
  const startFunc = useCallback(() => {
    generatePokers(generateList());
  }, []);
  useEffect(() => {
    startFunc();
  }, []);
  useEffect(() => {
    if (activePokers.length == 2) {
      let sum = activePokers.reduce((prev, curr) => prev + curr.number, 0);
      if (sum == 13) {
        setCards(cards => {
          let tops = cards.top.filter(item => !activePokers.some(ite => isSame(item, ite)))
          console.log(tops)
        })
      }
    } else if (activePokers.length == 1) {
      setCards(cards => {
        Object.values(cards).map(list => {
          list.map(item => {
            if (isSame(item, activePokers[0])) {
              item.className = item.className.concat(['active'])
            }
          })
        })
        return lib.clone(cards)
      })
    }
  }, [activePokers])
  return (
    <div>
      <div className="screen bg-gray-300">
        {cards.top.map(card => <Poker key={`${card.number}_${card.color}`} card={card} setActivePokers={setActivePokers} />)}
        {cards.left.map(card => <Poker key={`${card.number}_${card.color}`} card={card} setActivePokers={setActivePokers}  />)}
        <div className="moveright">MOVE</div>
        <div className="moveleft">BACK</div>
      </div>
      <div className="restart" onClick={startFunc}>
        重新开始
      </div>
      <div className="start text-purple-800" onClick={startFunc}>
        开始
      </div>
      <div className="game text-purple-800" onClick={toggleModal}>
        游戏介绍
      </div>
      <Dialog>
        <div
          className={
            (visible ? "block" : "hidden") +
            " w-full absolute z-50 bg-black bg-opacity-30 top-0 left-0 bottom-0 right-0 m-auto z-50"
          }
        >
          <div className="mask">
            <div className="mask-inner">
              <h1 className="text-3xl">游戏介绍</h1>
              <p className="text-base mt-10">此游戏是一种两张牌相加得13可以消除的纸牌游戏。</p>
              <p className="text-base mt-6">1.若上方纸牌没有可以相互消除的牌，可以移动下面的纸牌来与上方纸牌相加。</p>
              <p className="text-base mt-6">2.下方纸牌可以移动3次，3次过后没有消除完则不可再次移动。</p>
              <p className="text-base mt-6">3.下方纸牌必须全部移动完后，方可移回。</p>
              <div className="close" onClick={toggleModal}></div>
            </div>
          </div>
        </div>
      </Dialog>
      <div className="over">游戏结束</div>
    </div>
  );
}

function Dialog({ children }) {
  return ReactDOM.createPortal(children, document.querySelector("body"));
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
const map = ['', 'A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
function Poker({ card, setActivePokers }) {
  const { number, color, style, className } = card;
  const key = `${map[number]}${color}`;
  return (
    <div
      onClick={() => setActivePokers(p => [...p, card])}
      className={className.join(" ")}
      data={`${map[number]}${color}`}
      style={{ ...style, background: `url(${getImg(key)}) no-repeat center center / cover` }}
    ></div>
  );
}
