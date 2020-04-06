import React, { Component } from "react";

class GameBody extends Component {
  state = {
    eraseasked: this.props.eraseasked,
    containersize: this.props.containersize,
    prevX: 0,
    currX: 0,
    prevY: 0,
    currY: 0,
    flag: false,
    dot_flag: false,
    socket: this.props.socket,
    width: window.innerWidth,
    height: window.innerHeight,
  };

  constructor(props) {
    super(props);

    this.canvas = React.createRef();
    this.onDown = this.onDown.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onOut = this.onOut.bind(this);
    this.onUp = this.onUp.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    //La ref n'est pas prête dés le début, il faut attendre que le composant charge ...
    this.ctx = this.canvas.current.getContext("2d");
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    this.init(); //On lance le script

    this.props.socket.on(
      "canvasChange",
      ({
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
        color,
      }) => {
        if (prevX || currX || prevY || currY || flag || dot_flag) {
          this.setState({ prevX, currX, prevY, currY, flag, dot_flag });
        }
        if (color) {
          this.props.setColor({ color });
        }
        if (func) {
          if (func === "findxy") this.findxy(res, eX, eY);
          else if (func === "erase") this.erase();
        }
      }
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.containersize !== this.props.containersize) {
      this.setState({ containersize: this.props.containersize });
      this.canvas.current.width = this.props.containersize.width;
      this.canvas.current.height = this.props.containersize.height;
    }
    if (this.props.eraseasked) {
      this.erase();
      this.props.onEraseDone();
    }
    if (prevProps.socket !== this.props.socket) {
      this.setState({ socket: this.props.socket });
    }
  }
  componentWillUpdate(nextProps, nextState) {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  onMove(e) {
    let { prevX, currX, prevY, currY, flag, dot_flag } = this.state;
    //this.findxy("move", e);
    this.props.onCanvasChange(
      prevX,
      currX,
      prevY,
      currY,
      flag,
      dot_flag,
      "findxy",
      "move",
      e.clientX,
      e.clientY
    );
  }
  onDown(e) {
    let { prevX, currX, prevY, currY, flag, dot_flag } = this.state;
    //this.findxy("down", e);
    this.props.onCanvasChange(
      prevX,
      currX,
      prevY,
      currY,
      flag,
      dot_flag,
      "findxy",
      "down",
      e.clientX,
      e.clientY
    );
  }
  onUp(e) {
    let { prevX, currX, prevY, currY, flag, dot_flag } = this.state;
    //this.findxy("up", e);
    this.props.onCanvasChange(
      prevX,
      currX,
      prevY,
      currY,
      flag,
      dot_flag,
      "findxy",
      "up",
      e.clientX,
      e.clientY
    );
  }
  onOut(e) {
    let { prevX, currX, prevY, currY, flag, dot_flag } = this.state;
    //this.findxy("out", e);
    this.props.onCanvasChange(
      prevX,
      currX,
      prevY,
      currY,
      flag,
      dot_flag,
      this.findxy,
      "out",
      e.clientX,
      e.clientY
    );
  }
  init() {
    this.canvas.current.addEventListener("mousemove", this.onMove, false);
    this.canvas.current.addEventListener("mousedown", this.onDown, false);
    this.canvas.current.addEventListener("mouseup", this.onUp, false);
    this.canvas.current.addEventListener("mouseout", this.onOut, false);
  }

  draw() {
    const { prevX, prevY, currX, currY } = this.state;
    this.ctx.beginPath();
    this.ctx.moveTo(prevX, prevY);
    this.ctx.lineTo(currX, currY);
    this.ctx.strokeStyle = this.props.color;
    this.ctx.lineWidth = this.props.color === "white" ? 14 : 3;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  erase() {
    const { current: canvasDOM } = this.canvas;
    this.ctx.clearRect(0, 0, canvasDOM.width, canvasDOM.height);
  }

  findxy(res, eX, eY) {
    let { prevX, prevY, currX, currY, flag, dot_flag } = this.state;
    let y = this.props.color === "white" ? 14 : 3;
    const { current: canvasDOM } = this.canvas;

    if (res === "down") {
      currX = eX - canvasDOM.offsetLeft;
      currY = eY - canvasDOM.offsetTop;
      prevX = currX;
      prevY = currY;

      flag = true;
      dot_flag = true;
      if (dot_flag) {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.props.color;
        this.ctx.fillRect(currX, currY, y, y);
        this.ctx.closePath();
        dot_flag = false;
      }
    }
    if (res === "up" || res === "out") {
      flag = false;
    }
    if (res === "move") {
      if (flag) {
        prevX = currX;
        prevY = currY;
        currX = eX - canvasDOM.offsetLeft;
        currY = eY - canvasDOM.offsetTop;
        this.draw();
      }
    }
    this.setState({ prevX, prevY, currX, currY, flag, dot_flag });
  }
  render() {
    return <canvas ref={this.canvas} id="can"></canvas>;
  }
}

export default GameBody;
