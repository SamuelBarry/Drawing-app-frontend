import React from "react";
import ReactEmoji from "react-emoji";

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;

  const trimedName = name.trim();
  if (user === trimedName) isSentByCurrentUser = true;

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sendingUser pright-10">{trimedName}</p>
      <div className="messageBox backGroundRed">
        <p className="messageText">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backGroundBlue">
        <p className="messageText">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sendingUser pleft-10">{user}</p>
    </div>
  );
};

export default Message;
