import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0
    };
  }
  handleLeftClick = () => {
    const { x: currentX } = this.state;

    if (currentX === 0) {
      return;
    }

    this.setState({
      x: currentX + 100
    });
  };

  handleRightClick = () => {
    const { x: currentX } = this.state;

    if (Math.abs(currentX) > 1500) {
      return;
    }
    this.setState({
      x: currentX - 100
    });
  };
  render() {
    console.log(this.state.x);
    return (
      <div className="container">
        <div className="left-control">
          <LeftArrow handleClick={this.handleLeftClick} />
        </div>
        <div className="slideshow">
          <div
            className="mover-1"
            style={{
              transform: `translateX(${this.state.x}px)`,
              transition: "0.5s"
            }}
          />
        </div>
        <div className="right-control">
          <RightArrow handleClick={this.handleRightClick} />
        </div>
      </div>
    );
  }
}

function LeftArrow(props) {
  const handleLeftClick = () => {
    props.handleClick();
  };
  return (
    <div className="arrow-box" onClick={props.handleClick}>
      <span className="arrow">
        <svg
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </span>
    </div>
  );
}

function RightArrow(props) {
  return (
    <div className="arrow-box" onClick={props.handleClick}>
      <span className="arrow">
        <svg
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </span>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Slider />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
