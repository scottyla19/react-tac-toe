import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import StartMenu from "./components/StartMenu";
import TicTacGame from "./components/SinglePlayerGame";
import injectTapEventPlugin from "react-tap-event-plugin";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// ========================================
function Home() {
  return (
    <MuiThemeProvider>
      <RaisedButton
        label="React-Tac-Toe"
        labelColor="#00d8ff"
        backgroundColor="#222"
        href="/tic-tac-toe"
      />
    </MuiThemeProvider>
  );
}

const App = () =>
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/tic-tac-toe" component={StartMenu} />
    </div>
  </Router>;

ReactDOM.render(<App />, document.getElementById("root"));
