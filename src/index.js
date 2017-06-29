import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import injectTapEventPlugin from "react-tap-event-plugin";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

function Square(props) {
  let myStyle;
  if (props.isWinner && props.isWinner.includes(props.squareNum)) {
    myStyle = {
      color: "#00d8ff"
    };
  } else {
    myStyle = { color: "black" };
  }
  return (
    <button className="square" onClick={props.onClick} style={myStyle}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isWinner={this.props.isWinner}
        squareNum={i}
      />
    );
  }

  render() {
    return (
      <div>
        {Array.apply(null, Array(3)).map(function(item, i) {
          return (
            <div className="board-row">
              {Array.apply(null, Array(3)).map(function(item, j) {
                return this.renderSquare(i * 3 + j);
              }, this)}
            </div>
          );
        }, this)}

      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      selectedMove: null,
      sortDesc: true
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 ? false : true,
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
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      selectedMove: history.length
    });
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
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
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
          </div>
          <div className="game-info">
            <div><h3>{status}</h3></div>
            <div>
              <RaisedButton
                label="Change Sort Order"
                labelColor="#00d8ff"
                backgroundColor="#222"
                onClick={() => this.changeSortOrder()}
              />

            </div>
            <ol>{moves}</ol>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
