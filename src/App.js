import "./App.css";
import React, { Fragment, useState } from "react";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GitHubState from "./context/github/GitHubState"

const App = () => {
  const [alert, setAlert] = useState(null);

  

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
                  <User />
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
