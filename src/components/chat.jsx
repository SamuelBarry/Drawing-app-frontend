import React from "react";
import Input from "./input";
import Messages from "./messages";

import "./componentcss/chat.css";

const Chat = ({ message, messages, name, room, setMessage, sendMessage }) => {
  return (
    <div className="chatoutercontainer">
      <div className="chatinnercontainer">
        <h3 className="chattitle">Salle de jeu {room}</h3>
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
