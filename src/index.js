import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import StartMenu from "./components/tic-tac-toe/StartMenu";
import RecallGame from "./components/recall/RecallGame";

import injectTapEventPlugin from "react-tap-event-plugin";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Avatar from "material-ui/Avatar";
import { List, ListItem } from "material-ui/List";
import RightArrow from "material-ui/svg-icons/navigation/arrow-forward";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// ========================================
function Home() {
  return (
    <MuiThemeProvider>
      <div style={{ width: "40vw" }}>
        <List>
          <ListItem
            primaryText="React-Tac-Toe"
            leftAvatar={<Avatar src="/react-tac-toe-icon-64.png" />}
            rightIcon={<RightArrow />}
            href="/tic-tac-toe"
          />
          <ListItem
            primaryText="React Recall"
            leftAvatar={<Avatar src="/react-recall-icon-192.png" />}
            rightIcon={<RightArrow />}
            href="/recall"
          />
        </List>
      </div>
    </MuiThemeProvider>
  );
}

const App = () =>
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/tic-tac-toe" component={StartMenu} />
      <Route path="/recall" component={RecallGame} />
    </div>
  </Router>;

ReactDOM.render(<App />, document.getElementById("root"));
