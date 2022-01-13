import "./App.css";
import React, { Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";

import Home from "./components/pages/Home";
import User from "./components/users/User";
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
                <Route exact path='/' element={<Home />}/>
                <Route exact path="/about" element={<About />}/>
                <Route path='user/:login' element={<User />}/>
                <Route path='*' element={<NotFound />}/>
              </Routes>
            </div>
          </div>
        </Router>
      </AlertState>
    </GitHubState>
  );

}

export default App;
