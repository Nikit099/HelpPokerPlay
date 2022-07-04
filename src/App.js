import React, { useEffect, useState } from "react";
import Footer from "./components/footer";
import Players from "./components/players";
import Stocks from "./components/stocks";

function App() {
  const [players, setPlayers] = useState([]);
  const [step, setStep] = useState(1);
  const [bonds, setBonds] = useState({ first: "", second: "" });
  const [blind, setBlind] = useState([1, 2, 3]);
  const [stocks, setStocks] = useState([
    { cost: 1, up: 1, id: new Date().getMilliseconds() * Math.random() },
    { cost: 2, up: 1, id: new Date().getMilliseconds() * Math.random() },
    { cost: 5, up: 1, id: new Date().getMilliseconds() * Math.random() },
  ]);
  const [copyBonds, setCopyBonds] = useState();
  const [copyBlind, setCopyBlind] = useState();
  const [copyStep, setCopyStep] = useState();
  const [loss, setLoss] = useState(0);
  const [dividents, setDividents] = useState(false);

  const addPlayers = (name) => {
    if (name !== "") {
      setPlayers([
        ...players,
        {
          name: name,
          id: new Date().getMilliseconds() * Math.random(),
          order: players.length + 1,
        },
      ]);
    }
  };
  const delPlayers = (id) => {
    setPlayers(players.filter((i) => i.id !== id));
  };

  const changeStocks = (type, score) => {
    const obj = stocks.filter((i, index) => index === score)[0];

    if (type > 3 && type < 6) {
      if (obj.cost > -4 && obj.cost <= 1) {
        obj.cost += 2;
      } else if (obj.cost > 1 && obj.cost <= 11) {
        obj.cost += 1;
      } else if (obj.cost > 11) {
        obj.cost -= 1;
      }
    } else if (type > 1 && type < 4) {
      if (obj.cost > -4 && obj.cost <= 1) {
        if (obj.cost !== -3) {
          obj.cost += 1;
        } else {
          obj.cost = -3;
        }
      } else if (obj.cost > 1 && obj.cost <= 11) {
        obj.cost -= 1;
      } else if (obj.cost > 11) {
        obj.cost -= 2;
      }
    } else if (type === 6) {
      if (obj.cost > -4 && obj.cost <= 1) {
        obj.cost += 3;
      } else if (obj.cost > 1 && obj.cost <= 11) {
        obj.cost += 2;
      } else if (obj.cost > 11) {
        obj.cost += 1;
      }
    } else if (type === 1) {
      if (obj.cost > -4 && obj.cost <= 1) {
        if (obj.cost !== -3) {
          obj.cost -= 1;
        } else {
          obj.cost = -3;
        }
      } else if (obj.cost > 1 && obj.cost <= 11) {
        obj.cost -= 2;
      } else if (obj.cost > 11) {
        obj.cost -= 3;
      }
    }
    return obj;
  };

  const getStocks = () => {
    let low = Math.ceil(Math.random() * 6);
    let midle = Math.ceil(Math.random() * 6);
    let high = Math.ceil(Math.random() * 6);
    console.log(stocks);
    setStocks([
      changeStocks(low, 0),
      changeStocks(midle, 1),
      changeStocks(high, 2),
    ]);
  };
  const copyNumbers = () => {
    setCopyBonds(bonds);
    setCopyBlind(blind);
    setCopyStep(step);
  };
  const nextStep = () => {
    copyNumbers();
    setStep(step + 1);

    setBlind(
      blind.map((i) => {
        if (i === players.length) {
          return (i = 1);
        } else {
          i += 1;
          return i;
        }
      })
    );
    if (step % 2 === 0) {
      setDividents((prevState) => !prevState);
    } else {
      setDividents((prevState) => !prevState);
    }
    if (loss === 0) {
      if (step % 3 === 0) {
        let randomFirst = Math.ceil(Math.random() * 6);

        setBonds({ ...bonds, first: randomFirst });
        if (randomFirst === 1) {
          let randomSecond = Math.ceil(Math.random() * 6);
          setBonds({ first: randomFirst, second: randomSecond });
          setLoss((prevState) => prevState + 1);
        }
      } else {
        setBonds({ first: "", second: "" });
      }
    } else {
      setBonds({ first: "", second: "" });
      if (loss !== 5) {
        setLoss((prevState) => prevState + 1);
      } else {
        setLoss(0);
      }
    }

    getStocks();
  };
  const boostDown = (id, count) => {
    if (count > 1) {
      setStocks(
        stocks.map((i) => (i.id === id ? { ...i, up: i.up - 1 } : { ...i }))
      );
    }
  };
  const boostUp = (id, count) => {
    if (count < 4) {
      setStocks(
        stocks.map((i) => (i.id === id ? { ...i, up: i.up + 1 } : { ...i }))
      );
    }
  };
  const backUp = () => {
    if (step > 1) {
      setDividents((prevState) => !prevState);
      setStep(copyStep);
      setBonds(copyBonds);
      setBlind(copyBlind);
    }
  };
  return (
    <div className="App">
      <div className="container">
        <Stocks
          dividents={dividents}
          backUp={backUp}
          boostDown={boostDown}
          stocks={stocks}
          boostUp={boostUp}
        />
      </div>
      <Players
        players={players}
        delPlayers={delPlayers}
        addPlayers={addPlayers}
        blind={blind}
        step={step}
      />
      <Footer
        players={players.length}
        nextStep={nextStep}
        step={step}
        bonds={bonds}
      />
    </div>
  );
}

export default App;
