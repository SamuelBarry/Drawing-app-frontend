import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./componentcss/join.css";
import "bootstrap/dist/css/bootstrap.css";

const roomArray = [1, 2, 3, 4, 5];

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="joinheading">Jouer</h1>
        <div>
          <label htmlFor="nickname">Pseudo :</label>
          <input
            id="nickname"
            placeholder=""
            className="joinInput form-control"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="room">Salle de jeu : </label>
          <select
            defaultValue=""
            id="room"
            placeholder="Choisir"
            className="joinInput form-control"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          >
            <option value="" disabled>
              Choisir
            </option>
            {roomArray.map((i) => (
              <option key={i} value={i} className="joinOption ">
                {i}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Link
            onClick={(event) =>
              !name || !room ? event.preventDefault() : null
            }
            to={`/game?name=${name}&room=${room}`}
          >
            <button
              className="btn btn-secondary"
              type="submit"
              disabled={!name || !room}
            >
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
