import React from "react";

const GameHeader = ({
  newgamepossible,
  color,
  onColorChangeAsk,
  onEraseAsk,
  onNewGameAsk,
}) => {
  const color_list = [
    "black",
    "red",
    "blue",
    "green",
    "orange",
    "yellow",
    "violet",
    "white",
  ];
  return (
    <React.Fragment>
      <h4>Choisissez une couleur</h4>
      <div className="colorpicked">
        {color_list.map((colorname) => {
          return (
            <div
              key={colorname}
              className={
                colorname === color
                  ? `coloritem ${colorname} choosed`
                  : `coloritem  ${colorname}`
              }
              onClick={() => onColorChangeAsk(`${colorname}`)}
            ></div>
          );
        })}
        <div className="coloritem erase" onClick={() => onEraseAsk()}>
          Effacer
        </div>
        <button
          className="coloritem newgame"
          disabled={!newgamepossible}
          onClick={() => onNewGameAsk()}
        >
          Commencer une partie
        </button>
      </div>
    </React.Fragment>
  );
};

export default GameHeader;
