import { useReducer } from 'react'
import axios from "axios" 
import GitHubContest from "./gitHubContext"
import GitHubReducer from "./gitHubReducer"
import {
SEARCH_USERS,
SET_LOADING,
GET_REPOS,
GET_USER,
CLEAR_USERS
} from "../types"

const GitHubState = props => {
  const initialState = {
    users : [],
    user : {},
    repos : [],
    loading : false
  };

  const [state, dispatch ] = useReducer(GitHubReducer, initialState);

  //Search users 
  const searchUsers = (text) => {
    setLoading();
   
    axios
      .get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then((res) => {
        dispatch({
          type: SEARCH_USERS,
          payload: res.data.items
        })
      });
  };

  // Get a selected GitHub user
  const getUser = (username) => {
    setLoading();
    axios
      .get(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then((res) => {
        dispatch({
          type: GET_USER,
          payload: res.data
        })
      });
  };

  //Get Repos 
  //Get users github users 
  const getUserRepos = (username) => {
    setLoading();
    axios
      .get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then((res) => {
        dispatch({
          type: GET_REPOS,
          payload: res.data
        })
      });
  };
  

  //clear user search results
  const clearUsers = () => dispatch({
    type: CLEAR_USERS
  })
 ;

  //Set Loading 
  const setLoading = () => dispatch({SET_LOADING});

  return <GitHubContest.Provider
  value ={{
    user: state.user,
    users: state.users,
    repos: state.repos, 
    loading: state.loading,
    searchUsers,
    clearUsers,
    getUser,
    getUserRepos
  }}
  >
    {props.children}
   
  </GitHubContest.Provider>
}

export default GitHubState