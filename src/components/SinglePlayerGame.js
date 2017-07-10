import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import Board from "./Board";

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      playerOneIsNext: true,
      selectedMove: null,
      sortDesc: true
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      playerOneIsNext: step % 2 ? false : true,
      selectedMove: step
    });
  }
  changeSortOrder() {
    this.setState({
      sortDesc: !this.state.sortDesc
    });
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    console.log(this.props.playerTwoValue);
    squares[i] = this.state.playerOneIsNext
      ? this.props.playerOneValue
      : this.props.playerTwoValue;

    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      playerOneIsNext: !this.state.playerOneIsNext,
      selectedMove: history.length
    });

    if (this.props.isSinglePlayer && this.state.playerOneIsNext) {
      let move = this.chooseComputerMove(squares);
      squares[move] = this.props.playerTwoValue;
    }
  }

  chooseComputerMove(currentBoard) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // const current = history[history.length - 1];
    // const currentBoard = current.squares.slice();

    var move = this.winOrBlockChoice("win", currentBoard)[0];
    if (!move) {
      move = this.winOrBlockChoice("block", currentBoard)[0];
    }
    if (!move) {
      move = this.doubleThreatChoice("win", currentBoard);
    }
    if (!move) {
      move = this.doubleThreatChoice("block", currentBoard);
    }
    if (!move) {
      move = this.firstPlay();
    }
    if (!move) {
      move = this.playCenter();
    }
    if (!move) {
      move = this.emptyCorner();
    }
    if (!move) {
      move = this.emptySide();
    }

    // move = !currentBoard[move] ? move : false;
    // return move;
    if (this.calculateWinner(currentBoard) || currentBoard[move]) {
      return;
    }
    currentBoard[move] = this.props.playerTwoValue;

    this.setState({
      history: history.concat([
        {
          squares: currentBoard
        }
      ]),
      stepNumber: history.length,
      playerOneIsNext: true,
      selectedMove: history.length
    });
  }

  winOrBlockChoice(choiceType, board) {
    // var board = board;
    if (choiceType === "win") {
      var currentSymbol = this.props.playerTwoValue;
      var opponentSymbol = this.props.playerOneValue;
    } else if (choiceType === "block") {
      var currentSymbol = this.props.playerOneValue;
      var opponentSymbol = this.props.playerTwoValue;
    } else {
      return;
    }
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    var moves = [];
    lines.forEach(function(combo) {
      var notFound = [];
      var notPlayer = true;
      for (var i = 0; i < combo.length; i++) {
        if (board[combo[i]] !== currentSymbol) {
          if (board[combo[i]] === opponentSymbol) {
            notPlayer = false;
          } else {
            notFound.push(combo[i]);
          }
        }
      }
      if (notFound.length === 1 && notPlayer) {
        var move = notFound[0];
        moves.push(move);
      }
    });

    return moves;
  }

  doubleThreatChoice(choiceType, board) {
    // const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // const current = history[history.length - 1];
    // const currentBoard = current.squares.slice();
    // // use winChoice function to test a spot for double threat
    // var board = currentBoard;

    var move;

    if (choiceType === "win") {
      var currentSymbol = this.props.playerTwoValue;
      var opponentSymbol = this.props.playerOneValue;
    } else if (choiceType === "block") {
      var currentSymbol = this.props.playerOneValue;
      var opponentSymbol = this.props.playerTwoValue;
    }

    // forced diagonal win on 4th move prevention
    if (board[4] === currentSymbol && this.state.stepNumber === 3) {
      if (
        (board[0] === opponentSymbol && board[8] === opponentSymbol) ||
        (board[2] === opponentSymbol && board[6] === opponentSymbol)
      ) {
        // Play an edge to block double threat
        move = this.emptySide();
      }
    }

    if (!move && board[4] === opponentSymbol && this.state.stepNumber === 2) {
      move = this.diagonalSecondAttack();
    }

    if (!move) {
      // clone current board;
      var testBoard = board.slice();
      for (var i = 0; i < 9; i++) {
        testBoard = board.slice();
        if (testBoard[i] === "") {
          testBoard[i] = currentSymbol;
          if (this.winOrBlockChoice(choiceType, testBoard).length >= 2) {
            move = i;
          }
        }
      }
    }
    return move || false;
  }

  diagonalSecondAttack() {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const currentBoard = current.squares.slice();

    var board = currentBoard;
    var comp = this.props.playerTwoValue;
    var corners = [0, 2, 6, 8];
    for (var i = 0; i < corners.length; i++) {
      if (board[corners[i]] === comp) {
        return 9 - corners[i];
      }
    }
  }

  firstPlay() {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const currentBoard = current.squares.slice();

    var board = currentBoard;
    var corners = [0, 2, 6, 8];
    var move;
    if (this.state.stepNumber === 1) {
      // player plays center
      if (board[4] === this.props.playerOneValue) {
        var cornerNum = Math.floor(Math.random() * 4 + 1);
        move = [0, 2, 6, 8][cornerNum];
      } else {
        //player plays corner, play opposite corner
        for (var i = 0; i < corners.length; i++) {
          if (currentBoard[corners[i]] === this.props.playerOneValue) {
            move = 5;
          }
        }
      }
    } else if (this.state.stepNumber === 0) {
      var cornerNum = Math.floor(Math.random() * corners.length + 1);
      move = corners[cornerNum];
    }
    return move ? move : false;
  }

  playCenter() {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const currentBoard = current.squares.slice();
    if (!currentBoard[4]) {
      return 4;
    }
  }
  emptyCorner() {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const currentBoard = current.squares.slice();

    var board = currentBoard;
    var corners = [0, 2, 6, 8];
    var move;
    for (var i = 0; i < corners.length; i++) {
      if (!board[corners[i]]) {
        move = corners[i];
      }
    }
    return move || false;
  }

  emptySide() {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const currentBoard = current.squares.slice();

    var sides = [1, 3, 5, 7];
    for (var i = 0; i < sides.length; i++) {
      if (!currentBoard[sides[i]]) {
        return sides[i];
      }
    }
    return false;
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], winningMoves: lines[i] };
      }
    }
    return null;
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const getWinner = this.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Move #" + move : "Game start";
      var liStyle = {
        fontWeight: "normal"
      };
      if (this.state.selectedMove === move) {
        liStyle["fontWeight"] = "bold";
      }

      return (
        <li key={move}>
          <a href="#" style={liStyle} onClick={() => this.jumpTo(move)}>
            {desc}
          </a>
        </li>
      );
    });

    if (!this.state.sortDesc) {
      moves.reverse();
    }

    let status;
    let winningMoves;
    let winner;
    if (getWinner) {
      winningMoves = getWinner.winningMoves;
      winner = getWinner.winner;
      status = "Winner: " + winner;
    } else {
      status =
        "Next player: " +
        (this.state.playerOneIsNext
          ? this.props.playerOneValue
          : this.props.playerTwoValue);
    }

    return (
      <MuiThemeProvider>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              isWinner={winningMoves}
              onClick={i => this.handleClick(i)}
            />
            {winningMoves &&
              <RaisedButton
                label="Play Again"
                labelColor="#00d8ff"
                backgroundColor="#222"
              />}
          </div>
          <div className="game-info">
            <div>
              <h3>
                {status}
              </h3>
            </div>
            <div>
              <RaisedButton
                label="Change Sort Order"
                labelColor="#00d8ff"
                backgroundColor="#222"
                onClick={() => this.changeSortOrder()}
              />
            </div>
            <ol>
              {moves}
            </ol>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
