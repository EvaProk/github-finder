import "./App.css";
import React, { Fragment, useState } from "react";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import GitHubState from "./context/github/GitHubState"

const App = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);

  //Get users github users 
  const getUserRepos = (username) => {
    setLoading(true);
    axios
      .get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then((res) => {
        setRepos(res.data)
        setLoading(false)
      });
  };
  

  // Set alerts if there is no input
  const getAlert = (msg, type) => {
    setAlert({ msg: msg, type: type });
    // alert message will dissapeare in 4 sec
    setTimeout(() => {
      setAlert(null)
    }, 4000);
  };

  // const renderUsers = props =>  <User {...props}  getUser={getUser} user={user} loading={loading} />;

    return (
      <GitHubState> 
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Fragment>
                    <Search
                      setAlert={getAlert}
                    />
                    <Users  />
                  </Fragment>
                }
              />
              <Route exact path="/about" element={<About/>} />
              <Route
                path='user/:login'
                element={
                  <User  getUserRepos={getUserRepos} repos={repos}  loading={loading} />
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
      </GitHubState>
    );
  
}

export default App;
