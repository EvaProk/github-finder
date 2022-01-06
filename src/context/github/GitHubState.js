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

  //Get user 

  //Get Repos 

  // Clear Users 

  //Set Loading 
  const setLoading = () => dispatch({SET_LOADING});

  return <GitHubContest.Provider
  value ={{
    user: state.user,
    users: state.users,
    repos: state.repos, 
    loading: state.loading,
    searchUsers
  }}
  >
    {props.children}
   
  </GitHubContest.Provider>
}

export default GitHubState