import React from "react";
import Square from "./Square";

export default class Board extends React.Component {
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
