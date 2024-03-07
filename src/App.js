import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import "./App.css";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from "react-confetti";

export default () => {
  const { width, height } = useWindowSize();
  const [winnerAnnounced, setWinnerAnnounced] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [i, setI] = useState(0);
  const [data, setData] = useState([
    {
      option: "Saltburn",
      id: 0,
    },
  ]);

  //Détermine le vainqueur de la roue.
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
    const filmInput = form.elements.film; // Ajouter cette ligne pour récupérer l'élément d'entrée film

    const film = filmInput.value;

    //Vérifie que l'entrée ne soit pas nulle, et qu'elle n'est pas égale au film précédent
    if (film !== "") {
      const lastFilm = data.length > 0 ? data[data.length - 1].option : "";

      if (film !== lastFilm) {
        //Remplace la valeur initial du useState si il s'agit du premier film entrée
        if (data.length === 1 && data[0].option === "Saltburn") {
          setData([
            {
              option: film,
              id: 0,
            },
          ]);
          //Ajoute des films à la roue
        } else {
          const updateData = [
            ...data,
            {
              option: film,
              id: data.length,
            },
          ];
          setData(updateData);
        }

        filmInput.value = ""; // Réinitialiser la valeur de l'entrée film à zéro
      }
    }
  };

  //Tant qu'il ne reste pas qu'un film, supprime le film sur lequel la roue s'arrête
  const onStop = (prizeNumber) => {
    if (data.length > 1) {
      const updatedData = data.filter((item, index) => index !== prizeNumber);
      setData(updatedData);
      setMustSpin(false);

      // Votre animation annonçant le vainqueur
      if (updatedData.length === 1) {
        setTimeout(() => {
          setWinnerAnnounced(true);
        }, 0); // Ajoutez un délai de 2 secondes avant d'afficher l'annonce du vainqueur
      }
    }
  };

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
        {winnerAnnounced ? (
          <div className="winner-announcement">
            <h2>Le gagnant est {data[0].option}!</h2>
            <Confetti width={width} height={height} />
          </div>
        ) : (
          <div>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              onStopSpinning={() => {
                onStop(prizeNumber);
              }}
              backgroundColors={["#26a0da", "#314755"]}
              outerBorderColor="white"
              radiusLineColor="white"
              fontFamily="Calibri"
            />
            <button className="btn-grad" onClick={handleSpinClick}>
              SPIN
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
