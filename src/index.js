import React from "react";
import ReactDOM from "react-dom";

import "./styles.scss";

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.innerRef = React.createRef();
    this.slideshowRef = React.createRef();
    this.steps = 100;
    this.state = {
      x: 0,
      originalX: 0,
      originalMovedX: 0,
      distanceMoved: 0
    };
  }

  componentDidMount() {
    // const innerContainerWidth = this.innerRef.current.clientWidth;
    // const slideBoxWidth = this.slideshowRef.current.clientWidth;
    this.steps = 200;

    this.maxSlideRight =
      this.innerRef.current.clientWidth - this.slideshowRef.current.clientWidth;
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  }

  handleLeftClick = () => {
    const { x: currentX } = this.state;

    if (currentX === 0) {
      return;
    }

    this.setState({
      x: currentX + this.steps
    });
  };

  handleRightClick = () => {
    const { x: currentX } = this.state;

    const destination = Math.abs(currentX - this.steps);

    if (destination > this.maxSlideRight) {
      return;
    }
    this.setState({
      x: currentX - this.steps
    });
  };

  get leftControl() {
    const { x } = this.state;
    if (x === 0) {
      return null;
    }
    return (
      <div className="left-control">
        <ArrowButton handleClick={this.handleLeftClick}>
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </ArrowButton>
      </div>
    );
  }

  get rightControl() {
    const { x } = this.state;
    if (Math.abs(x) >= this.maxSlideRight) {
      return null;
    }
    return (
      <div className="right-control">
        <ArrowButton handleClick={this.handleRightClick}>
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </ArrowButton>
      </div>
    );
  }

  get moverBox() {
    const { children } = this.props;
    return (
      <div
        ref={this.innerRef}
        className="mover-1"
        style={{
          transform: `translateX(${this.state.x}px)`,
          transition: "0.1s"
        }}
      >
        {children}
      </div>
    );
  }

  unify = e =>  e.changedTouches ? e.changedTouches[0] : e;

  handleMouseUp = (event) => {
    const { clientX } = this.unify(event);
    const { x: currentX } = this.state;

    const distance = this.state.originalX - clientX;

    if (distance === 0) {
      return;
    }

    let resultedDistance = -distance + currentX;

    if (Math.abs(resultedDistance) > this.maxSlideRight) {
      resultedDistance = -this.maxSlideRight;
    }

    if (resultedDistance > 0) {
      resultedDistance = 0;
    }

    this.setState(
      {
        x: resultedDistance
      },
      () => {
        console.log("after handle mouse up, current x is ", this.state.x);
      }
    );
  };

  handleMove = event => {
    const { clientX } = this.unify(event);

    const { 
      originalMovedX, 
      x: currentX,
      distanceMoved 
    } = this.state;

    const distance = originalMovedX - clientX;

    const realDistanceMoved = distance - distanceMoved ;

    if (realDistanceMoved === 0) {
      return;
    }

    let resultedDistance = -realDistanceMoved + currentX;

    console.log('real distance travel is ', realDistanceMoved);

    console.log('resulted distance is ', resultedDistance);

    if (Math.abs(resultedDistance) > this.maxSlideRight) {
      resultedDistance = -this.maxSlideRight;
    }

    if (resultedDistance > 0) {
      resultedDistance = 0;
    }

    this.setState(
      {
        x: resultedDistance,
        distanceMoved: distance
      },
      () => {
        console.log("after handleMove, current x is ", this.state.x);
      }
    );
  }

  handleTouchEnd = () => {
    this.setState({
      distanceMoved: 0
    })
  }

  handleMouseDown = event => {
    const { clientX } = this.unify(event);
    this.setState({
      originalX: clientX,
      originalMovedX: clientX
    });
  };


  render() {
    return (
      <div className="container" onClick={this.onScroll}>
        {this.leftControl}
        <div
          className="slideshow"
          ref={this.slideshowRef}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onTouchEnd={this.handleTouchEnd}
          onTouchStart={this.handleMouseDown}
          onTouchMove={this.handleMove}
          onDrag={this.handleDragStart}
        >
          {this.moverBox}
        </div>
        {this.rightControl}
      </div>
    );
  }
}

function ArrowButton(props) {
  return (
    <div className="arrow-box" onClick={props.handleClick}>
      <span className="arrow">
        <svg
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          {props.children}
        </svg>
      </span>
    </div>
  );
}

const Card = props => (
  <div className="card">
    <div className="header" style={{background: props.headerColor}}> {props.title }</div>
    <div className="content">
      <div style={{ width: "50%" }} className="line" />
      <div style={{ width: "20%" }} className="line" />
      <div className="line" />
      <div style={{ width: "80%" }} className="line" />
      <div style={{ width: "60%" }} className="line" />
      <div style={{ width: "90%" }} className="line" />
    </div>
  </div>
);


function App() {
  const MoverBox = props => (
    <div
      style={{
        background: `url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/collage.jpg)`,
        width: "100%",
        height: "100%",
        backgroundPosition: "0 -200px"
      }}
    />
  );
  
  const generateCards = () => {
    const cards = [];
    for (let i = 0; i < 10; i++) {
      cards.push(<Card key={i} title={`CARD ${i+1}`} headerColor={i%2 === 0 ? getRandomColor(): '#FF7077'}/>);
    }
    return cards;
  };

  return (
    <div className="App">
      <>
        <h3> Slider 1 </h3>
        <Slider>
          <MoverBox />
        </Slider>
      </>

      <>
        <h3> Slider 2 </h3>
        <Slider>{generateCards()}</Slider>
      </>
    </div>
  );
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
