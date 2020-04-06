import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { ScrollArea } from "react-scrollbar";

import Message from "./message";

const Messages = ({ messages, name }) => (
  <div className="messages">
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
  </div>
);

export default Messages;
