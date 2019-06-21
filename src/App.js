import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LoginPage from "./auth/LoginPage";
import Dashboard from "./views/Dashboard";


//===

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
        </Router>
      </div>
    );
  }
}

export default App;
