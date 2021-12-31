import { useReducer } from 'react'
import axios from "axios" 
import GitHubContest from "./gitHubContest"
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

  //Get user 

  //Get Repos 

  // Clear Users 

  //Set Loading 

  return <GitHubContest.Provider
  value ={{
    user: state.user,
    users: state.users,
    repos: state.repos, 
    loading: state.loading
  }}
  >
    {props.children}
   
  </GitHubContest.Provider>
}

export default GitHubState