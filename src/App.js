import "./App.css";
import React, { Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GitHubState from "./context/github/GitHubState"
import AlertState from "./context/alert/AlertState"


const App = () => {

  return (
    <GitHubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <Fragment>
                      <Search/>
                      <Users />
                    </Fragment>
                  }
                />
                <Route exact path="/about" element={<About />} />
                <Route
                  path='user/:login'
                  element={
                    <User />
                  }
                />
              </Routes>
            </div>
          </div>
        </Router>
      </AlertState>
    </GitHubState>
  );

}

export default App;
