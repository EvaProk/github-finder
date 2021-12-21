import "./App.css";
import React, { Fragment, Component } from "react";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import Users from "./components/users/Users";
import User from "./components/users/User";

import Search from "./components/users/Search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import axios from "axios";

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: []
  };

  //  componentDidMount(){
  //   this.setState({loading: true});
  //   axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //   .then(res =>
  //   this.setState({ users: res.data , loading: false }))

  // };

  //search GitHub users
  searchUsers = (text) => {
    this.setState({ loading: true });
    axios
      .get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then((res) => this.setState({ users: res.data.items, loading: false }));
  };
  // Get a selected GitHub user
  getUser = (username) => {
    this.setState({ loading: true });
    axios
      .get(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then((res) => this.setState({ user: res.data, loading: false }));
  };
  //Get users github users 
  getUserRepos = (username) => {
    this.setState({ loading: true });
    axios
      .get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then((res) => this.setState({ repos: res.data, loading: false }));
  };
  //clear user search results
  clearUsers = () => this.setState({ users: [], loading: false });

  // Set alerts if there is no input
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });
    // alert message will dissapeare in 4 sec
    setTimeout(() => {
      this.setState({ alert: null });
    }, 4000);
  };
  renderUsers = props =>  <User {...props}  getUser={this.getUser} user={this.state.user} loading={this.stateloading} />;


  render() {
    const { users, user, repos, loading } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                }
              />
              <Route exact path="/about" element={<About />} />
              <Route
                path='user/:login'
                element={
                  <User getUser={this.getUser} getUserRepos={this.getUserRepos} repos={repos}  user={user} loading={loading} />
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
