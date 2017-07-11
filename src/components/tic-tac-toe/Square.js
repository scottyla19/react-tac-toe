import React from "react";

export default function Square(props) {
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
