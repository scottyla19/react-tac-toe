import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Snackbar from "material-ui/Snackbar";

import "./recall.css";

export default class RecallGame extends React.Component {
  constructor() {
    super();

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleHighlight = this.handleHighlight.bind(this);
    this.strictClicked = this.strictClicked.bind(this);
    this.startClicked = this.startClicked.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      correctMoves: [],
      playerMoves: [],
      correctSequences: 0,
      seqIndex: 0,
      isPlayerRecall: false,
      isStrictMode: false,
      greenSelected: "inactive",
      blueSelected: "inactive",
      redSelected: "inactive",
      yellowSelected: "inactive"
    };
  }
  getNextMove() {
    let nextNum = Math.round(Math.random() * 4) + 1;
    let nextMove = null;
    switch (nextNum) {
      case 1:
        nextMove = "green";
        break;
      case 2:
        nextMove = "red";
        break;
      case 3:
        nextMove = "blue";
        break;
      case 4:
        nextMove = "yellow";
        break;
      default:
        nextMove = "green";
    }
    let movesArray = this.state.correctMoves;
    movesArray.push(nextMove);
    if (!this.state.isPlayerRecall) {
      this.setState({
        correctMoves: movesArray
      });
    }
  }
  //async for each to wait for handlehighlight to finish
  // https://h3manth.com/content/async-foreach-javascript
  asyncEach(array, iterator, delay) {
    void (function iteration(index) {
      if (index === array.length) return;
      iterator(array[index]);
      setTimeout(function() {
        iteration(index + 1);
      }, delay + 400);
    })(0);
  }
  arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (var i = arr1.length; i--; ) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  }
  handleHighlight(color) {
    let myClass = color + "Selected";
    this.setState({
      [myClass]: "highlight"
    });
    var game = this;
    setTimeout(function() {
      game.setState({
        [myClass]: "inactive"
      });
    }, 400);
  }
  showSequence() {
    this.asyncEach(this.state.correctMoves, this.handleHighlight, 200);
    this.setState({
      isPlayerRecall: true
    });
  }
  handelPlayerInput(color) {
    let currentPlayerMoves = this.state.playerMoves;
    let currentCorrectMoves = this.state.correctMoves;
    console.log(this.state.isPlayerRecall);

    if (this.state.isPlayerRecall) {
      this.handleHighlight(color);
      if (color === currentCorrectMoves[this.state.seqIndex]) {
        currentPlayerMoves.push(color);
        this.setState({
          playerMoves: currentPlayerMoves,
          seqIndex: this.state.seqIndex + 1
        });
        console.log(currentPlayerMoves, currentCorrectMoves);
        if (this.arraysEqual(currentPlayerMoves, currentCorrectMoves)) {
          this.setState({
            isPlayerRecall: false,
            playerMoves: [],
            seqIndex: 0,
            correctSequences: this.state.correctSequences + 1,
            message: "Correct!",
            open: true,
            snackbarTimeout:1000
          });
          this.getNextMove();
          let game = this;
          setTimeout(function() {
            game.showSequence();
          }, 1500);
        }
      } else {
        if (this.state.isStrictMode) {
          //reset to default state
          this.setState({
            correctMoves: [],
            playerMoves: [],
            correctSequences: 0,
            seqIndex: 0,
            isPlayerRecall: false,
            isStrictMode: true,
            greenSelected: "inactive",
            blueSelected: "inactive",
            redSelected: "inactive",
            yellowSelected: "inactive",
             message: "Strict Mode Incorrect! Press start to begin a new game.",
            open: true,
            snackbarTimeout:3000
          });
          return;
        }
        let game = this;
         this.setState({
            isPlayerRecall: false,
            playerMoves: [],
            seqIndex: 0,
            message: "Incorrect! Try again.",
            open: true,
            snackbarTimeout:1000
          });
        setTimeout(function() {
          game.showSequence();
        }, 2000);
      }
    }
  }
  handleClick(event) {
    let classes = event.target.className;

    if (classes.indexOf("greenRecallBtn") !== -1) {
      this.handelPlayerInput("green");
    }
    if (classes.indexOf("blueRecallBtn") !== -1) {
      this.handelPlayerInput("blue");
    }
    if (classes.indexOf("redRecallBtn") !== -1) {
      this.handelPlayerInput("red");
    }

    if (classes.indexOf("yellowRecallBtn") !== -1) {
      this.handelPlayerInput("yellow");
    }
  }
  startClicked() {
    this.getNextMove();
    this.showSequence();
  }
  strictClicked() {
    let myMsg = "";
    if (this.state.isStrictMode) {
      myMsg = "Strict mode disabled.";
    } else {
      myMsg =
        "Strict mode enabled. Now if you get a swquence wron you have to start over.";
    }
    this.setState({
      isStrictMode: !this.state.isStrictMode,
      message: myMsg,
      open: true
    });
  }
  handleRequestClose() {
    console.log("request close " + this.state.open);
    this.setState({
      open: false
    });
  }
  render() {
    let yellowStyle = { backgroundColor: "yellow" };
    let blackStyle = { backgroundColor: "black" };
    return (
      <MuiThemeProvider>
        <div className="boardWrapper">
          <div
            className={"recallBtn greenRecallBtn " + this.state.greenSelected}
            onClick={this.handleClick}
          />
          <div
            className={"recallBtn redRecallBtn " + this.state.redSelected}
            onClick={this.handleClick}
          />
          <div
            className={"recallBtn blueRecallBtn " + this.state.blueSelected}
            onClick={this.handleClick}
          />
          <div
            className={"recallBtn yellowRecallBtn " + this.state.yellowSelected}
            onClick={this.handleClick}
          />
          <div className="recallCenter" >
            <div className="title">
              Recall
            </div>
            <div className="centerMenu">
            
            <div className="scoreBoard">
              {this.state.correctSequences}
            </div>
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
          <Snackbar
            open={this.state.open}
            message={this.state.message}
            autoHideDuration={this.state.snackbarTimeout}
            onRequestClose={this.handleRequestClose}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}
