import React from 'react'
import ReposItem from "./components/repos/ReposItem";
import PropTypes from "prop-types";



export const Repos = ({repos}) => {
  
  return repos.map(repo => <ReposItem repo={repo} key={repo.id}/>)
}

Repos.propTypes = {
  repos: PropTypes.array.isRequired,,
};