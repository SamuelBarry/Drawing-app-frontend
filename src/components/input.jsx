import React from "react";
import { MdSend } from "react-icons/md";

const Input = ({ message, setMessage, sendMessage }) => (
  <div className="chatform">
    <input
      className="chatinput"
      placeholder="Ecris un message ..."
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      onKeyPress={(event) => {
        if (event.key === "Enter") sendMessage(event);
      }}
    />
    <button className="sendmessage" onClick={(event) => sendMessage(event)}>
      <MdSend />
    </button>
  </div>
);

export default Input;
