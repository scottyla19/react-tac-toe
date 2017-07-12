import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./recall.css";
export default class RecallGame extends React.Component {
  constructor() {
    super();

    this.strictClicked = this.strictClicked.bind(this);
    this.startClicked = this.startClicked.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = { isStrictMode: false };
  }

  handleClick(event) {
    let classes = event.target.className;
    if (classes.indexOf("greenRecallBtn") !== -1) {
      console.log("green pushed");
    }
    if (classes.indexOf("blueRecallBtn") !== -1) {
      console.log("blue pushed");
    }
    if (classes.indexOf("redRecallBtn") !== -1) {
      console.log("red pushed");
    }

    if (classes.indexOf("yellowRecallBtn") !== -1) {
      console.log("yellow pushed");
    }
  }
  startClicked() {
    console.log("start clicked");
  }
  strictClicked() {
    this.setState({
      isStrictMode: !this.state.isStrictMode
    });
  }
  render() {
    let yellowStyle = { backgroundColor: "yellow" };
    let blackStyle = { backgroundColor: "black" };
    return (
      <div className="boardWrapper">
        <div className=" recallBtn greenRecallBtn" onClick={this.handleClick} />
        <div className=" recallBtn redRecallBtn" onClick={this.handleClick} />
        <div className=" recallBtn blueRecallBtn" onClick={this.handleClick} />
        <div
          className=" recallBtn yellowRecallBtn"
          onClick={this.handleClick}
        />
        <div className="recallCenter" onClick={this.handleClick}>
          <div className="scoreBoard">00</div>
          <div className="centerBtns">
            <div
              className="startStrict startButton"
              onClick={this.startClicked}
            />
            Start
          </div>
          <div className="centerBtns">
            {this.state.isStrictMode
              ? <div className="led" style={yellowStyle} />
              : <div className="led" style={blackStyle} />}
            <div
              className="startStrict strictButton"
              onClick={this.strictClicked}
            />
            Strict
          </div>
        </div>
      </div>
    );
  }
}
