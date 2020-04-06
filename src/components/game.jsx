import React, { Component } from "react";
import Chat from "./chat";
import io from "socket.io-client";
import queryString from "query-string";
import GameBody from "./gamebody";
import GameHeader from "./gameheader";

import "./componentcss/game.css";
import "bootstrap/dist/css/bootstrap.css";

class Game extends Component {
  state = {
    color: "black",
    containersize: {},
    eraseasked: false,
    name: "",
    room: "",
    message: "",
    messages: [],
    newgameenable: false,
  };

  //ENDPOINT = "http://localhost:5000/";
  ENDPOINT = "https://pictionaryonlineapp.herokuapp.com/";
  socket = io(this.ENDPOINT);
  container = React.createRef();
  constructor(props) {
    super(props);
    this.setColor = this.setColor.bind(this);
    this.onColorChangeAsk = this.onColorChangeAsk.bind(this);
    this.handleErase = this.handleErase.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.onCanvasChange = this.onCanvasChange.bind(this);
    this.onNewGameAsk = this.onNewGameAsk.bind(this);
  }

  componentDidMount() {
    const containersize = this.container.current.getBoundingClientRect();
    this.setState({ containersize });

    const { name, room } = queryString.parse(this.props.location.search);
    this.setState({ name });
    this.setState({ room });

    this.socket.emit("join", { name, room }, (err) => {
      if (err) 
    });

    this.socket.on("message", (message) => {
      this.setState({ messages: [...this.state.messages, message] });
    });

    this.socket.on("roomData", ({ room, users }) => {
      if (users.length >= 2) this.setState({ newgamepossible: true, room });
    });

    this.socket.on("gameWon", ({ user, mysteryWord }) => {
      this.setState({ newgamepossible: true });
    });
  }

  componentWillUnmount() {
    this.socket.emit("disconnect");
    this.socket.off();
  }

  sendMessage = (event) => {
    event.preventDefault();
    if (this.state.message) {
      this.socket.emit("sendMessage", this.state.message, () =>
        this.setState({ message: "" })
      );
      this.setState({ message: "" });
    }
  };

  onCanvasChange(
    prevX,
    currX,
    prevY,
    currY,
    flag,
    dot_flag,
    func,
    res,
    eX,
    eY
  ) {
    this.socket.emit("canvasUpdate", {
      prevX,
      currX,
      prevY,
      currY,
      flag,
      dot_flag,
      func,
      res,
      eX,
      eY,
    });
  }

  setMessage = (message) => this.setState({ message });

  onColorChangeAsk(newcolor) {
    this.socket.emit("canvasUpdate", { color: newcolor });
  }
  setColor = (newcolor) => {
    this.setState({ color: newcolor.color });
  };

  handleErase() {
    this.socket.emit("canvasUpdate", { func: "erase" });
  }

  onNewGameAsk() {
    this.setState({ newgamepossible: false });
    this.setState({ eraseasked: true });
    this.socket.emit("newGame", {
      room: this.state.room,
      playername: this.state.name,
    });
  }
  onGame;
  render() {
    const {
      color,
      eraseasked,
      containersize,
      messages,
      message,
      name,
      room,
      newgamepossible,
    } = this.state;
    return (
      <div className="gameoutercontainer">
        <div className="gameinnercontainer ">
          <div className=" gameplatecontainer ">
            <div className="gameplateheader ">
              <GameHeader
                onColorChangeAsk={this.onColorChangeAsk}
                color={color}
                onEraseAsk={this.handleErase}
                socket={this.socket}
                newgamepossible={newgamepossible}
                onNewGameAsk={this.onNewGameAsk}
              />
            </div>
            <div className="gameplatebody" ref={this.container}>
              <GameBody
                color={color}
                containersize={containersize}
                eraseasked={eraseasked}
                onEraseDone={this.handleErase}
                onCanvasChange={this.onCanvasChange}
                socket={this.socket}
                setColor={this.setColor}
              />
            </div>
          </div>
          <div className="chat">
            <Chat
              message={message}
              messages={messages}
              name={name}
              room={room}
              setMessage={this.setMessage}
              sendMessage={this.sendMessage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
