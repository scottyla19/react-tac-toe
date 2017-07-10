import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { List, ListItem } from "material-ui/List";
import emoji from "emoji-dictionary";
import Subheader from "material-ui/Subheader";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import RaisedButton from "material-ui/RaisedButton";
import Game from "./SinglePlayerGame";

export default class StartMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      isSinglePlayer: false,
      playerOne: "X",
      startClicked: false,
      playerTwo: "O"
    };
  }
  handleChange = (event, value) => {
    let numPlayer = false;
    if (value === "onePlayer") {
      numPlayer = true;
    }
    this.setState({
      isSinglePlayer: numPlayer
    });
  };

  handleOneChange = (event, key, value) => {
    let playerTwo = this.state.playerTwo;
    if (value === playerTwo) {
      playerTwo = value === "O" ? "X" : "O";
    }

    this.setState({
      playerOne: value,
      playerTwo: playerTwo
    });
  };
  handleTwoChange = (event, key, value) => {
    let playerOne = this.state.playerOne;
    if (value === playerOne) {
      playerOne = value === "X" ? "O" : "X";
    }
    this.setState({
      playerTwo: value,
      playerOne: playerOne
    });
  };

  startSelected = () => {
    this.setState({ startClicked: true });
  };
  render() {
    if (this.state.startClicked) {
      return (
        <div>
          <h1> React-Tac-Toe</h1>

          <Game
            playerOneValue={this.state.playerOne}
            playerTwoValue={this.state.playerTwo}
            isSinglePlayer={this.state.isSinglePlayer}
          />
        </div>
      );
    }
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <h1> React-Tac-Toe</h1>
            <form className="formContainer">
              <div className="formChild">
                <h3> Number of Players</h3>
                <RadioButtonGroup
                  name="numPlayers"
                  defaultSelected="twoPlayers"
                  onChange={this.handleChange}
                >
                  <RadioButton value="onePlayer" label="One Player" />
                  <RadioButton value="twoPlayers" label="Two Players" />
                </RadioButtonGroup>
              </div>

              <div className="formChild">
                <h3> Player One</h3>

                <SelectField
                  floatingLabelText="Player One Symbol"
                  value={this.state.playerOne}
                  onChange={this.handleOneChange}
                  maxHeight={300}
                >
                  <MenuItem value={"X"} primaryText="X" />
                  <MenuItem value={"O"} primaryText="O" />
                  {emoji.unicode.map(element =>
                    <MenuItem value={element} primaryText={element} />
                  )}
                </SelectField>
              </div>
              <div className="formChild">
                <h3> Player Two</h3>
                <SelectField
                  floatingLabelText="Player Two Symbol"
                  value={this.state.playerTwo}
                  onChange={this.handleTwoChange}
                  maxHeight={300}
                >
                  <MenuItem value={"X"} primaryText="X" />
                  <MenuItem value={"O"} primaryText="O" />
                  {emoji.unicode.map(element =>
                    <MenuItem value={element} primaryText={element} />
                  )}
                </SelectField>
              </div>

              <div className="formFullChild">
                <RaisedButton
                  className="button"
                  onClick={this.startSelected}
                  fullWidth={true}
                >
                  Start Game
                </RaisedButton>
              </div>
            </form>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
