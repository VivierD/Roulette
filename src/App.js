import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import "./App.css";

export default () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [data, setData] = useState([
    {
      option: "",
      id: 0,
    },
  ]);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const film = form.elements.film.value;

    const updateData = [
      ...data,
      {
        option: film,
        id: data.length,
      },
    ];
    setData(updateData);
  };

  const onStop = (prizeNumber) => {
    if (data.length === 0) {
      setMustSpin(false);
    } else {
      const index = data.findIndex(({ id }) => id === prizeNumber);
      if (index !== -1) {
        setData([...data.slice(0, index), ...data.slice(index + 1)]);
      }
      setMustSpin(false);
    }
  };

  useEffect(() => {
    console.log(data);
    console.log(prizeNumber)
  }, [handleSpinClick]);

  return (
    <div className="container-main">
      <div className="container">
        <div className="title">La roulette à élimination</div>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            id="film"
            placeholder="Rentrez votre film"
          />
        </form>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={() => {
            onStop(prizeNumber);
          }}
          backgroundColors={["#314755", "#26a0da"]}
          outerBorderColor="white"
          radiusLineColor="white"
          fontFamily="Calibri"
        />
        <button className="btn-grad" onClick={handleSpinClick}>
          SPIN
        </button>
      </div>
    </div>
  );
};
